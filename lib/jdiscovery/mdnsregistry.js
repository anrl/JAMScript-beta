var bonjour = require('bonjour')(),
    constants = require('../jamserver/constants'),
    Registry = require('./registry'),
    dgram = require('dgram');

function MDNSRegistry(app, type, id, port) {

    Registry.call(this, app, type, id, port);
    this.protocol = constants.globals.Protocol.MDNS;

    this.ads = {};
    this.attrsToAdvertise = {};

    this.browsers = {
        device: {},
        fog: {},
        cloud: {}
    };
    this.attrsToBrowse = {
        device: {},
        fog: {},
        cloud: {}
    }

    this.attrRemovalAd = null;
    this.attrRemovalBrowsers = {};

    /**
     * HeartBeat
     */
    this.hbPort = constants.mdns.heartBeatPort;
    this.hbMulticastAddress = constants.mdns.heartBeatMulticastAddress;
    this.hbTTL = constants.mdns.heartBeatTTL;
    this.hbSocket = null;
    this.upTable = {};

    this.started = false;
}

/* MDNSRegistry inherits from Registry */
MDNSRegistry.prototype = Object.create(Registry.prototype);
MDNSRegistry.prototype.constructor = MDNSRegistry;

/**
 * REGISTRY INTERFACE METHODS
 */

/**
 * Start mDNS registry
 */
MDNSRegistry.prototype.registerAndDiscover = function() {

    if(this.started)
        return;

    var self = this;

    // Setup socket to send own hb and receive hb from others
    this.hbSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
    // ...  handle incoming heartbeats: if entry in upTable, renew entry TTL
    this.hbSocket.on('message', function (message, remote) {
        let o = JSON.parse(message.toString());
        // check if the message is for the same app
        if(o.app !== self.app)
            return;
        let id = o.id;
        // remote has properties: address, port
        if(self.upTable.hasOwnProperty(id)) {
            clearTimeout(self.upTable[id].timer);
            self.upTable[id].timer = setTimeout(
                () => {
                    // remove node entry from upTable
                    let type = self.upTable[id].type;
                    delete self.upTable[id];
                    // propagate node down to jreg
                    self.emit('discovery', 'status',
                        self.attrsToBrowse[type]['status'].offline,
                        id, 'offline', undefined);
                },
                self.hbTTL
            );
        }
    });
    // ... bind and finalize socket setup
    this.hbSocket.bind(this.hbPort, function() {
        self.hbSocket.setBroadcast(true);
        self.hbSocket.setMulticastTTL(128);
        self.hbSocket.addMembership(self.hbMulticastAddress);
    });
    // ... start periodic hb emission for local node
    setInterval(
        () => {
            let m = new Buffer.from(JSON.stringify({app: self.app, id: self.id}));
            self.hbSocket.send(m, 0, m.length, self.hbPort, self.hbMulticastAddress);
        },
        Math.floor(self.hbTTL/3)
    );

    // Setup attribute removal browsers
    ['device', 'fog', 'cloud'].map(
        (x) => {
            this.attrRemovalBrowsers[x] =
                bonjour.find({type : this.app + '-' + (x) + '-attrrem'});
            this.attrRemovalBrowsers[x].on('up', function(service) {
                // DEBUG
                // console.log('DEBUG: MDNSRegistry.attrRemovalBrowser[' + x + ']');
                // console.log(JSON.stringify(service));
                // console.log(JSON.stringify(self.attrsToBrowse));

                // ignore our own services
                if (service.name === self.id) {
                    return;
                }
                // notify jregistrar of lost attributes/disconnections
                let attrs = JSON.parse(service.txt.data);
                let seqval = service.txt.seqval;
                attrs.filter(
                    (attr) => {
                        return self.attrsToBrowse[x][attr];
                    }
                ).map(
                    (attr) => {
                        // DEBUG
                        // console.log('TYPE: ' + x + ' ATTR: ' + attr);

                        // propagate advertised attribute removals
                        if(attr === 'status') {
                            // clear upTable entry to avoid extra notif
                            if(self.upTable.hasOwnProperty(service.name)) {
                                clearTimeout(self.upTable[service.name].timer);
                                delete self.upTable[service.name];
                            }
                            self.emit('discovery', attr,
                                self.attrsToBrowse[x][attr].offline,
                                service.name, 'offline', undefined);
                        } else {
                            self.emit('attr-removed', attr,
                                self.attrsToBrowse[x][attr].onRemove,
                                service.name, seqval);
                        }
                    }
                );
            });
            this.attrRemovalBrowsers[x].on('down', function(service) {
                // do nothing!
            });
            this.attrRemovalBrowsers[x].start();
        }
    );
    this.started = true;
}
/**
 * Sets attributes by starting ads or modifying them.
 * attrs - an object of attributes
 * seqval - the ID to publish with the attributes for deduplication purposes
 *          on the receiving node
 */
MDNSRegistry.prototype.setAttributes = function(attrs, seqval) {
    // DEBUG
    // console.log('DEBUG: MDNSRegistry.setAttributes');

    if (this.started) {
        this._createAdvertisements(attrs, seqval);
    } else {
        let self = this;
        setTimeout(self.setAttributes.bind(self), 
            constants.mdns.retryInterval,
            attrs, seqval);
    }
}
/**
 * Removes attributes by stopping the advertisements
 */
MDNSRegistry.prototype.removeAttributes = function(attrs, seqval) {
    // DEBUG
    // console.log('DEBUG: MDNSRegistry.removeAttributes');

    // clean & create attrrem advertisement
    if (this.attrRemovalAd) {
        this.attrRemovalAd.stop();
        this.attrRemovalAd = null;
    }
    this.attrRemovalAd = bonjour.publish(
        {
            name    :   this.id,
            port    :   this.port,
            type    :   this.app + '-' + this.type + '-attrrem',
            txt     :   {
                            data    :   JSON.stringify(Object.keys(attrs)),
                            seqval  :   seqval
                        }
        }
    );
    this.attrRemovalAd.start();

    setTimeout(
        () => {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    if (this.attrsToAdvertise[attr] && this.ads[attr]) {
                        this.ads[attr].stop();
                        delete this.attrsToAdvertise[attr];
                        delete this.ads[attr];
                    }
                }
            }
            if (this.attrRemovalAd) {
                this.attrRemovalAd.stop();
                this.attrRemovalAd = null;
            }
        },
        5000
    );
}
/**
 * Discovers attributes by starting browsers
 */
MDNSRegistry.prototype.discoverAttributes = function(dattrs) {
    if (this.started) {
        ['device', 'fog', 'cloud'].map(
            (x) => {
                for (var attr in dattrs[x]) {
                    if(dattrs[x].hasOwnProperty(attr)) {
                        if (!this.browsers[x][attr]) {
                            this.attrsToBrowse[x][attr] = dattrs[x][attr];
                            this._createBrowser(attr,
                                constants.globals.NodeType[x.toUpperCase()]);
                        }
                    }
                }
            }
        );
    } else {
        let self = this;
        setTimeout(self.discoverAttributes.bind(self), 
            constants.mdns.retryInterval,
            dattrs);
    }
}
/**
 * Stops making discoveries by stopping browsers
 */
MDNSRegistry.prototype.stopDiscoveringAttributes = function(dattrs) {
    ['device', 'fog', 'cloud'].map(
        x => {
            if (dattrs[x]) {
                for(var attr in dattrs[x]) {
                    if (dattrs[x].hasOwnProperty(attr)) {
                        if (this.attrsToBrowse[x][attr] && this.browsers[x][attr]) {
                            this.browsers[x][attr].stop();
                            delete this.attrsToBrowse[x][attr];
                            delete this.browsers[x][attr];
                        }
                    }
                }
            }
        }
    );
}
/**
 * mDNS cleanup
 * Stop all advertising and browsing
 */
MDNSRegistry.prototype.quit = function(seqval) {

    // stop advertising all attrs
    this.removeAttributes(this.attrsToAdvertise , seqval);
    // stop discovering all attrs
    this.stopDiscoveringAttributes(this.attrsToBrowse);
    // stop removal browsers
    ['device', 'fog', 'cloud'].map(
            (x) => {
                this.attrRemovalBrowsers[x].stop();
            }
    );
}

/**
 * _PRIVATE HELPERS
 */

/**
 * Creates advertisements for the provided attributes
 */
MDNSRegistry.prototype._createAdvertisements = function(attrs, seqval) {

    // DEBUG
    // console.log('DEBUG: MDNSRegistry._createAdvertisements');

    // stop old advertisements and create new ones for updated attrs
    for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) {
            // Update data structures
            this.attrsToAdvertise[attr] = attrs[attr];
            if (this.ads[attr]) {
                this.ads[attr].stop();
                delete this.ads[attr];
            }
            this.ads[attr] = bonjour.publish(
                {
                    name    :   this.id,
                    port    :   this.port,
                    type    :   this.app + '-' + this.type + '-' + attr,
                    txt     :   {
                                    data    :   JSON.stringify(attrs[attr]),
                                    seqval  :   seqval
                                }
                }
            );
            // if we get a service already on network error, wait a little, then retry
            // .. it seems like it takes a little time for the mdns server to clear its entry
            this.ads[attr].on('error',
                () => {
                    setTimeout(
                        () => { this.ads[attr].start(); },
                        2000
                    );
                }
            );
            // attempt start :)
            this.ads[attr].start();
        }
    }
}
/**
 * Prep a browser to browse for an attibute
 */
MDNSRegistry.prototype._createBrowser = function(attr, type) {

    let browser = bonjour.find({ type : this.app + '-' + type + '-' + attr });
    this.browsers[type][attr] = browser;

    var self = this;
    browser.on('up', function(service) {
        // DEBUG
        // console.log("DEBUG: MDNSRegistry: |" + type + "/" + attr + "| browser: service up");

        // ignore our own services
        if (service.name === self.id) {
            return;
        }

        // initiate heartbeat upon discovering a new node
        if(attr === 'status') {
            if(self.upTable.hasOwnProperty(service.name)) {
                clearTimeout(self.upTable[service.name].timer);
            }
            self.upTable[service.name] = {
                type    :   type,
                timer   :   setTimeout(
                                () => {
                                    // remove node entry from upTable
                                    delete self.upTable[service.name];
                                    // propagate node down to jreg
                                    self.emit('discovery', 'status',
                                        self.attrsToBrowse[type]['status'].offline,
                                        service.name, 'offline', undefined);
                                },
                                self.hbTTL
                            )
            }
        }

        // emit a discovery event!
        self.emit('discovery', attr,
            (attr === 'status')
                ? self.attrsToBrowse[type][attr].online
                : self.attrsToBrowse[type][attr].onAdd,
            service.name,
            JSON.parse(service.txt.data),
            service.txt.seqval
        );
    });
    browser.on('down', function(service) {
        // do nothing!
    });
    browser.start();
}

/* exports */
module.exports = MDNSRegistry;

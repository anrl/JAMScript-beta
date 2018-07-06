//===================================================================
// This is the main JAMLib module. It implements a generic set of
// functionality that makes it suitable for implementing the J nodes
// at the different levels: cloud, fog, and device.
//===================================================================

// Load the global modules
const mqtt = require('mqtt'),
      os = require('os'),
      globals = require('./constants').globals;

// Do command line processing...
var cmdopts = require('./cmdparser');

// Get or make device parameters like device_id
var deviceParams = require('./deviceparams');
deviceParams.init(cmdopts.port);

// initialize the error logger
var logger = require('./jerrlog');
logger.init(cmdopts.app, false);

// create the Registrar
var Registrar = require('jdiscovery');
var machType = getMachineType(cmdopts);
deviceParams.setItem('machType', machType);

var reggie = new Registrar(cmdopts.app, machType, deviceParams.getItem('deviceId'),
                            cmdopts.port, { protocols: { mqtt: true, mdns: true } });

var jamsys = require('./jamsys');
jamsys.init(reggie, machType, cmdopts.tags, cmdopts.iflow, cmdopts.oflow, deviceParams.getItem('deviceId'),
                                cmdopts.link, cmdopts.long, cmdopts.lat);
jamsys.setMQTT(getMachineAddr(), cmdopts.port);


var jnode = require('./jnode');
jnode.init(reggie, machType);


module.exports = new function() {
    this.registerFuncs = registerFuncs;
    this.run = run;
}

function run(callback) {

    // Check the presence of the MQTT server.
    // If not, report an error and quit

    checkMQTTServer(function(present) {
        if (!present) {
            console.log("ERROR! Cannot connect to MQTT server. Exiting.");
            process.exit(1);
        }

        if (machType === globals.NodeType.CLOUD) {
            reggie.registerAndDiscover();
            jnode.startService();
            jnode.startRunner();
        } else {
            jnode.doRegister();
            jnode.startService();
            jnode.startRunner();

        }

        if (callback !== undefined)
            callback();
    });

}

function registerFuncs(machbox) {

    // Register all callbacks in the machbox.
    // These are functions registered by the application
    fkeys = Object.keys(machbox.functions);
    for (i in fkeys) {
        tkey = fkeys[i];
        jnode.registerCallback(tkey, machbox.functions[tkey], machbox.signatures[tkey]);
    }
}

// Check whether the MQTT server is up and running..
function checkMQTTServer(callback) {
    var tserv = mqtt.connect("mqtt://localhost:" + cmdopts.port );
    tserv.on('connect', function() {
        tserv.end();
        callback(true);
    });
    tserv.on('offline', function() {
        tserv.end();
        callback(false);
    });
}


function getMachineType(copts) {

    if (copts.device) {
        machType = globals.NodeType.DEVICE;
    } else if (copts.fog) {
        machType = globals.NodeType.FOG;
    } else if (copts.cloud) {
        machType = globals.NodeType.CLOUD;
    } else {
        throw new Error('no machine type specified - must be one of \'device\', \'fog\', or \'cloud\'');
    }

    return machType;
}


function getMachineAddr() {
    var niaddrs = os.networkInterfaces();
    for (var ni in niaddrs) {
        nielm = niaddrs[ni];
        for (n in nielm) {
            if (nielm[n].family === 'IPv4' && nielm[n].internal === false)
                return nielm[n].address
        }
    }
    return globals.localhost;
}

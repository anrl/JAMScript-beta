var jamlib = require('/usr/local/share/jam/lib/jserver/jamlib');
var jnode = require('/usr/local/share/jam/lib/jserver/jnode');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var http = require('http');
var cbor = require('cbor');
var qs = require('querystring');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

var JAMLogger = require('/usr/local/share/jam/lib/jserver/jamlogger');
var JAMManager = require('/usr/local/share/jam/lib/jserver/jammanager');
var jcondition = new Map();

setInterval(function() {
    JAMManager.broadcastMessage("y", String(Number(Math.floor((Math.random() * 100) + 1))));
}, 1000);

var mbox = {
    "functions": {},
    "signatures": {}
}
jamlib.registerFuncs(mbox);
jamlib.run(function() {
    console.log("Running...");
});
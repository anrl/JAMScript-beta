const JAMIopad = require("./jamiopad.js"),
	  JAMLogger = require("./jamlogger.js"),
	  JAMManager = require("./jammanager.js");

// initialize datasources
var logger1 = new JAMLogger(JAMManager, "logger1", "fog"),
	logger2 = new JAMLogger(JAMManager, "logger2", "fog"),
	iopad   = new JAMIopad(JAMManager, "iopad");

var f1 = {
	showKey: function(ds){
		console.log(ds.key);
	}
},
	f2 = {
	showNumDatastream: function(ds){
		console.log(ds.num_datastreams);
},
	}
	f3 = {
	addStream: function(ds){
		ds.addDatastream("newDev");
		console.log(ds.size());
	}
};

iopad.getDatasource(logger1.key, f1);

iopad.getDatasource(logger2.key, f2);

iopad.getDatasource(logger2.key, f3);
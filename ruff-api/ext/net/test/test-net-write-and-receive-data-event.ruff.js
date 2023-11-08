'use strict';
var assert = require('assert');
var net = require('../src/index.js');

var clientReceivedData;

var server = net.createServer(function (socket) {
	socket.on('end', function () {
		//console.log('client disconnected');
        socket.end();
	});

	socket.on('data', function (data) {
		if (data) {
			//console.log('Server recevice data:' + data);
		}
	});
	socket.write('hello');
});

var port = 5643;
server.listen(port, function () {
});

var client = net.connect(port);
client.on('data', function (buf) {
	//console.log('Client receive data: ' + buf);
	clientReceivedData = buf;
	client.end();
});

client.on('close', function () {
	server.close();
});

exports['test should write and receive data event'] = function () {
	process.on('exit', function () {
		assert.equal(clientReceivedData, 'hello');
	});
};


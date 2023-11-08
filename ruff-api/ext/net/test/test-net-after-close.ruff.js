'use strict';

var assert = require('assert');
var net = require('../src/index.js');
var closed = false;

var expectedServerAddress = { family: 'INET6', port: 7914, address: '::' };
var serverAddress;

var server = net.createServer(function (s) {
    serverAddress = server.address();
    s.end();
});

var client;

server.listen(7914, function () {
    client = net.connect(7914, function () { });

    client.on('end', function () {
        closed = true;
        server.close();
    });
});

exports['test should close net server'] = function () {
    process.on('exit', function () {
        assert.deepEqual(serverAddress, expectedServerAddress);
        assert(closed);
    });
};

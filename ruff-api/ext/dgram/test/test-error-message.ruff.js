'use strict';
var assert = require('assert');
var dgram = require('../');
var mustCall = require('./test-util.js').mustCall;

exports['test should have useful error message'] = function() {
    var socket = dgram.createSocket();
    var port = 7914;

    socket.on('listening', assert.fail);

    socket.on('error', mustCall(function(e) {
        assert.equal(e.message, 'EADDRNOTAVAIL: address not available');
        assert.equal(e.address, '1.1.1.1');
        assert.equal(e.port, port);
        socket.close();
    }));

    socket.bind(port, '1.1.1.1');
}
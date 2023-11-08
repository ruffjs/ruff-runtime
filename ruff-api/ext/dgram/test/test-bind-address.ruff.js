'use strict';
var assert = require('assert');
var dgram = require('../');
var mustCall = require('./test-util.js').mustCall;

exports['test should bind address'] = function() {
    var socket = dgram.createSocket();

    socket.on('listening', mustCall(function() {
        var address = socket.address();
        assert.strictEqual(address.address, '127.0.0.1');
        assert.strictEqual(address.port, 7914);
        socket.close();
    }));

    socket.on('error', function(e) {
        assert.fail();
        socket.close();
    });

    socket.bind(7914, '127.0.0.1');

}

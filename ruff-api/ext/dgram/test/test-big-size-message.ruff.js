'use strict';
var assert = require('assert');
var dgram = require('../');
var mustCall = require('./test-util.js').mustCall;

exports['test should return error when send message too big'] = function() {
    var buf = Buffer(256 * 1024);
    var sock = dgram.createSocket();
    sock.send(buf, 0, buf.length, 12345, '127.0.0.1', mustCall(function(err) {
        assert(err instanceof Error);
        assert.equal(err.address, '127.0.0.1');
        assert.equal(err.port, 12345);
        assert.equal(err.message, 'EMSGSIZE: message too long');
        sock.close();
    }));
}
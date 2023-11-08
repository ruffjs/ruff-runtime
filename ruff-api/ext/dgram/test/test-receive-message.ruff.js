'use strict';
var assert = require('assert');
var dgram = require('../');

exports['test should receive message'] = function() {
    var server = dgram.createSocket();
    var server_port = 7915;
    var message_to_send = 'A message to send';
    var localhostIPv4 = '127.0.0.1';
    var timer;
    server.on('message', function(msg, rinfo) {
        assert.strictEqual(rinfo.address, localhostIPv4);
        assert.strictEqual(msg.toString(), message_to_send.toString());
        server.send(msg, 0, msg.length, rinfo.port, rinfo.address);
    });
    server.on('listening', function() {
        var address = server.address();
        var client = dgram.createSocket();
        client.on('message', function(msg, rinfo) {
            assert.strictEqual(rinfo.address, localhostIPv4);
            assert.strictEqual(rinfo.port, server_port);
            assert.strictEqual(msg.toString(), message_to_send.toString());
            client.close();
            server.close();
        });
        client.send(message_to_send, 0, message_to_send.length,
            server_port, localhostIPv4,
            function(err) {
                if (err) {
                    console.log('Caught error in client send.');
                    throw err;
                }
            });
        client.on('close', function() {
            clearTimeout(timer);
        });
    });
    server.on('close', function() {
        clearTimeout(timer);
    });
    server.bind(server_port);

    timer = setTimeout(function() {
        throw new Error('Timeout');
    }, 2000);
};

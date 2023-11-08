'use strict';

var net    = require('../src/index.js');
var assert = require('assert');

var port = 4444;

var server = net.createServer(function (stream) {
    // console.log('server received client connection');

    stream.on('data', function (data) {
        // console.log('server receive data: ', data);

        stream.write('pong');
    });

    stream.on('end', function () {
        // console.log('server side end');
        stream.end();
    });
    stream.on('close', function () {
        // console.log('server closed');
    });
});

server.listen(port, function () {
    // console.log('server ready for receiving client connection');

    var c = net.createConnection(port, function () {
        // console.log('client connected to server');
        c.write('ping');
    });

    c.on('data', function (data) {
        // console.log('client receive data: ', data);
        c.end();
    });

    c.on('end', function () {
        // console.log('client side end');
        server.close();
    });
    c.on('close', function () {
        // console.log('client side close');
    });
});
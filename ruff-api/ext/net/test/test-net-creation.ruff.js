'use strict';
var assert = require('assert');
var net    = require('../src/index.js');



exports['test client could open with different channel'] = function () {
    var server = net.createServer(function (socket) {
        console.log(socket);
        socket.on('data', function (data) {
            console.log(data);
            socket.write(data);
            socket.end();
        });

        socket.on('end', function () {
        });

        socket.on('close', function () {
            server.close();
        });
    });

    server.listen(8326);

    var client1 = net.connect(8326, '127.0.0.1');
    var client2 = net.connect(8326, '127.0.0.1');

    // var result = [];
    // client1.on('data', function(data) {
    //     result.push(data);
    // });

    // client2.on('data', function(data) {
    //     result.push(data);
    // });

    // client1.write('foo', function() {
    //     console.log('here');
    //     assert.equal(1, result.length);
    // });

    assert(client1._handle != client2._handle);

    client1.destroy();
    client2.destroy();

    server.close();
};
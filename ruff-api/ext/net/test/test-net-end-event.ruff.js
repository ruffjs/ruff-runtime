'use strict';
var net = require('../src/index.js');

var server = net.createServer(function (stream) {
    stream.write('WHAT.');

    stream.on('data', function (data) {
        //console.log('server receive data: ', data);
        //stream.write('data3 :');
        //stream.end();
    });

    stream.on('close', function () {
        //console.log('server closed');
        //stream.end();
    });

    stream.on('end', function () {
        //console.log('server end');
        stream.end();
    });
});

server.listen(4321, function () {

    var c = net.createConnection(4321, function () {
    });

    c.on('data', function (data) {
        //c.write('data2.');
        //console.log('client receive data: ', data);
        c.end();
    });

    c.on('end', function () {
        //console.log('client side end');
        server.close();
    });

    c.on('close', function () {
        //console.log('client side close');
        //server.close();
    });

    //c.write('heee');
});

exports['test should receive end event'] = function () {
    process.on('exit', function () {
        //server.close();
    });
};
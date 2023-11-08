'use strict';
var assert = require('assert');
var net = require('../src/index.js');

var binaryString = '';
exports['test should convert to binary'] = function() {
    for (var i = 255; i >= 0; i--) {
        var s = '\'\\x' + ('0' + i.toString(16)).substr(-2) + '\'';
        var S = eval(s);
        assert.ok(S.charCodeAt(0) == i);
        assert.ok(S == String.fromCharCode(i));
        binaryString += S;
    }
};

// safe constructor
var echoServer = net.Server({}, function(connection) {
    connection.on('data', function(chunk) {
        connection.write(chunk);
    });
    connection.on('end', function() {
        //console.log('end');
        connection.end();
    });
    connection.on('close', function() {
        //console.log('close');
    });
    connection.on('error', function(error) {
        // console.log('error', error);
    });

});

echoServer.listen(7654);

var recv = new Buffer(0);

echoServer.on('listening', function() {
    var c = net.createConnection({
        port: 7654
    });

    c.on('data', function(chunk) {
        recv = Buffer.concat([recv, chunk]);
        c.end();
    });

    c.on('connect', function() {
        c.write(binaryString, 'binary');
    });

    c.on('close', function() {
        echoServer.close();
    });
});

exports['test should receive correct data'] = function() {
    process.on('exit', function() {
        assert.equal(256, recv.length);
        assert.equal(binaryString, recv.toString('binary'));
    });
};

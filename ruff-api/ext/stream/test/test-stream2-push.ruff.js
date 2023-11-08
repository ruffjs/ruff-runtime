'use strict';
var stream = require('../src/index.js');
var Readable = stream.Readable;
var Writable = stream.Writable;
var assert = require('assert');

var EE = require('events').EventEmitter;


// a mock thing a bit like the net.Socket/tcp_wrap.handle interaction

stream = new Readable({
    highWaterMark: 16,
    encoding: 'utf8'
});

var source = new EE();

stream._read = function() {
    readStart();
};

var ended = false;
stream.on('end', function() {
    ended = true;
});

source.on('data', function(chunk) {
    var ret = stream.push(chunk);
    if (!ret)
        readStop();
});

source.on('end', function() {
    stream.push(null);
});

var reading = false;

function readStart() {
    reading = true;
}

function readStop() {
    reading = false;
    process.nextTick(function() {
        var r = stream.read();
        if (r !== null)
            writer.write(r);
    });
}

var writer = new Writable({
    decodeStrings: false
});

var written = [];

var expectWritten =
    [ 'asdfgasdfgasdfgasdfg',
        'asdfgasdfgasdfgasdfg',
        'asdfgasdfgasdfgasdfg',
        'asdfgasdfgasdfgasdfg',
        'asdfgasdfgasdfgasdfg',
        'asdfgasdfgasdfgasdfg' ];

writer._write = function(chunk, encoding, cb) {
    written.push(chunk);
    process.nextTick(cb);
};

writer.on('finish', finish);


// now emit some chunks.

var chunk = 'asdfg';

var set = 0;
readStart();
data();
function data() {
    assert(reading);
    source.emit('data', chunk);
    assert(reading);
    source.emit('data', chunk);
    assert(reading);
    source.emit('data', chunk);
    assert(reading);
    source.emit('data', chunk);
    assert(!reading);
    if (set++ < 5)
        setTimeout(data, 10);
    else
        end();
}

function finish() {
    assert.deepStrictEqual(written, expectWritten);
}

function end() {
    source.emit('end');
    assert(!reading);
    writer.end(stream.read());
    setTimeout(function() {
        assert(ended);
    });
}

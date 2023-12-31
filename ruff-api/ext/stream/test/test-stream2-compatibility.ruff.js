'use strict';
var R = require('../src/readable.js');
var W = require('../src/writable.js');
var assert = require('assert');

var util = require('util');

var ondataCalled = 0;

function TestReader() {
    R.apply(this);
    this._buffer = Buffer.alloc(100, 'x');

    this.on('data', function() {
        ondataCalled++;
    });
}

util.inherits(TestReader, R);

TestReader.prototype._read = function(n) {
    this.push(this._buffer);
    this._buffer = Buffer.alloc(0);
};

var reader = new TestReader();
setImmediate(function() {
    assert.equal(ondataCalled, 1);
    reader.push(null);
});

function TestWriter() {
    W.apply(this);
    this.write('foo');
    this.end();
}

util.inherits(TestWriter, W);

TestWriter.prototype._write = function(chunk, enc, cb) {
    cb();
};

var writer = new TestWriter();

process.on('exit', function() {
    assert.strictEqual(reader.readable, false);
    assert.strictEqual(writer.writable, false);
});

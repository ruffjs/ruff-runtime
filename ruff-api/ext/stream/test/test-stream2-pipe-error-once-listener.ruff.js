'use strict';

var util = require('util');
var stream = require('../src/index.js');


var Read = function() {
    stream.Readable.call(this);
};
util.inherits(Read, stream.Readable);

Read.prototype._read = function(size) {
    this.push('x');
    this.push(null);
};


var Write = function() {
    stream.Writable.call(this);
};
util.inherits(Write, stream.Writable);

Write.prototype._write = function(buffer, encoding, cb) {
    this.emit('error', new Error('boom'));
    this.emit('alldone');
};

var read = new Read();
var write = new Write();

write.once('error', function(err) {});
write.once('alldone', function(err) {
});

process.on('exit', function(c) {
});

read.pipe(write);


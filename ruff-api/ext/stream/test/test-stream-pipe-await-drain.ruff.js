'use strict';
var common = require('../common');
var stream = require('../src/index.js');

// This is very similar to test-stream-pipe-cleanup-pause.js.

var reader = new stream.Readable();
var writer1 = new stream.Writable();
var writer2 = new stream.Writable();

// 560000 is chosen here because it is larger than the (default) highWaterMark
// and will cause `.write()` to return false
// See: https://github.com/nodejs/node/issues/5820
var buffer = Buffer.allocUnsafe(560000);

reader._read = function(n) {};

writer1._write = common.mustCall(function(chunk, encoding, cb) {
    this.emit('chunk-received');
    cb();
}, 1);
writer1.once('chunk-received', function() {
    setImmediate(function() {
        // This one should *not* get through to writer1 because writer2 is not
        // "done" processing.
        reader.push(buffer);
    });
});

// A "slow" consumer:
writer2._write = common.mustCall(function(chunk, encoding, cb) {
    // Not calling cb here to "simulate" slow stream.

    // This should be called exactly once, since the first .write() call
    // will return false.
}, 1);

reader.pipe(writer1);
reader.pipe(writer2);
reader.push(buffer);

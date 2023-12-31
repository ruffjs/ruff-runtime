'use strict';
var assert = require('assert');
var Readable = require('../src/index.js').Readable;
var r = new Readable();
var N = 256 * 1024;

// Go ahead and allow the pathological case for this test.
// Yes, it's an infinite loop, that's the point.
process.maxTickDepth = N + 2;

var reads = 0;
r._read = function(n) {
    var chunk = reads++ === N ? null : Buffer.allocUnsafe(1);
    r.push(chunk);
};

r.on('readable', function onReadable() {
    r.read(N * 2);
});

var ended = false;
r.on('end', function onEnd() {
    ended = true;
});

r.read(0);

process.on('exit', function() {
    assert(ended);
});

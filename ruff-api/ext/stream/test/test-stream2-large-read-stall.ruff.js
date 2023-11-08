'use strict';
var assert = require('assert');

// If everything aligns so that you do a read(n) of exactly the
// remaining buffer, then make sure that 'end' still emits.

var READSIZE = 100;
var PUSHSIZE = 20;
var PUSHCOUNT = 1000;
var HWM = 50;

var Readable = require('../src/index.js').Readable;
var r = new Readable({
    highWaterMark: HWM
});
var rs = r._readableState;

r._read = push;

r.on('readable', function() {
    do {
        var ret = r.read(READSIZE);
    } while (ret && ret.length === READSIZE);
});

var endEmitted = false;
r.on('end', function() {
    endEmitted = true;
});

var pushes = 0;
function push() {
    if (pushes > PUSHCOUNT)
        return;

    if (pushes++ === PUSHCOUNT) {
        return r.push(null);
    }

    if (r.push(Buffer.allocUnsafe(PUSHSIZE)))
        setTimeout(push);
}

process.on('exit', function() {
    assert.equal(pushes, PUSHCOUNT + 1);
    assert(endEmitted);
});

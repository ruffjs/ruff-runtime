'use strict';
var assert = require('assert');

var Readable = require('../src/index.js').Readable;

(function first() {
    // First test, not reading when the readable is added.
    // make sure that on('readable', ...) triggers a readable event.
    var r = new Readable({
        highWaterMark: 3
    });

    var _readCalled = false;
    r._read = function(n) {
        _readCalled = true;
    };

    // This triggers a 'readable' event, which is lost.
    r.push(Buffer.from('blerg'));

    var caughtReadable = false;
    setTimeout(function() {
        // we're testing what we think we are
        assert(!r._readableState.reading);
        r.on('readable', function() {
            caughtReadable = true;
        });
    });

    process.on('exit', function() {
        // we're testing what we think we are
        assert(!_readCalled);

        assert(caughtReadable);
    });
})();

(function second() {
    // second test, make sure that readable is re-emitted if there's
    // already a length, while it IS reading.

    var r = new Readable({
        highWaterMark: 3
    });

    var _readCalled = false;
    r._read = function(n) {
        _readCalled = true;
    };

    // This triggers a 'readable' event, which is lost.
    r.push(Buffer.from('bl'));

    var caughtReadable = false;
    setTimeout(function() {
        // assert we're testing what we think we are
        assert(r._readableState.reading);
        r.on('readable', function() {
            caughtReadable = true;
        });
    });

    process.on('exit', function() {
        // we're testing what we think we are
        assert(_readCalled);

        assert(caughtReadable);
    });
})();

(function third() {
    // Third test, not reading when the stream has not passed
    // the highWaterMark but *has* reached EOF.
    var r = new Readable({
        highWaterMark: 30
    });

    var _readCalled = false;
    r._read = function(n) {
        _readCalled = true;
    };

    // This triggers a 'readable' event, which is lost.
    r.push(Buffer.from('blerg'));
    r.push(null);

    var caughtReadable = false;
    setTimeout(function() {
        // assert we're testing what we think we are
        assert(!r._readableState.reading);
        r.on('readable', function() {
            caughtReadable = true;
        });
    });

    process.on('exit', function() {
        // we're testing what we think we are
        assert(!_readCalled);

        assert(caughtReadable);
    });
})();

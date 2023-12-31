'use strict';
var assert = require('assert');

var Readable = require('../src/index.js').Readable;

var _readCalled = false;
function _read(n) {
    _readCalled = true;
    this.push(null);
}

var r = new Readable({ read: _read });
r.resume();

process.on('exit', function() {
    assert.equal(r._read, _read);
    assert(_readCalled);
});

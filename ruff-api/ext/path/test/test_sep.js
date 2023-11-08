var path = require('../');
var assert = require('assert');

exports['test should run sep'] = function () {
    // windows
    assert.equal(path.win32.sep, '\\');
    // posix
    assert.equal(path.posix.sep, '/');
};
var path = require('../');
var assert = require('assert');

exports['test should run delimiter'] = function () {
    // windows
    assert.equal(path.win32.delimiter, ';');

    // posix
    assert.equal(path.posix.delimiter, ':');
};
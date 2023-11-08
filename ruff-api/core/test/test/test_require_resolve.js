var assert = require('assert');
var path = require('path');
var test = require('../src/index.js');
var modResolve = Duktape.modResolve.bind(this);
var myId = this.id;

exports['test require resolve by resolved path'] = function() {
    var expectedPath = path.join(myId, '../../src/index.js');
    var resolvedPath = modResolve('../src/index.js');
    assert.equal(expectedPath, resolvedPath);
};

exports['test require resolve by absoluted path'] = function() {
    var expectedPath = myId;
    var resolvedPath = modResolve(myId);
    assert.equal(expectedPath, resolvedPath);
};
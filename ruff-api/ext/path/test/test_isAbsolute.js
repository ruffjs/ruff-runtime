var path = require('../');
var assert = require('assert');

exports['test should run isAbsolute'] = function () {
    assert.equal(path.win32.isAbsolute('//server/file'), true);
    assert.equal(path.win32.isAbsolute('\\\\server\\file'), true);
    assert.equal(path.win32.isAbsolute('C:/Users/'), true);
    assert.equal(path.win32.isAbsolute('C:\\Users\\'), true);
    assert.equal(path.win32.isAbsolute('C:cwd/another'), false);
    assert.equal(path.win32.isAbsolute('C:cwd\\another'), false);
    assert.equal(path.win32.isAbsolute('directory/directory'), false);
    assert.equal(path.win32.isAbsolute('directory\\directory'), false);

    assert.equal(path.posix.isAbsolute('/home/foo'), true);
    assert.equal(path.posix.isAbsolute('/home/foo/..'), true);
    assert.equal(path.posix.isAbsolute('bar/'), false);
    assert.equal(path.posix.isAbsolute('./baz'), false);
};
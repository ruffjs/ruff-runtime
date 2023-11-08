var path = require('../');
var assert = require('assert');

exports['test should run normalize'] = function () {
    assert.equal(path.win32.normalize('./fixtures///b/../b/c.js'),
        'fixtures\\b\\c.js');
    assert.equal(path.win32.normalize('/foo/../../../bar'), '\\bar');
    assert.equal(path.win32.normalize('a//b//../b'), 'a\\b');
    assert.equal(path.win32.normalize('a//b//./c'), 'a\\b\\c');
    assert.equal(path.win32.normalize('a//b//.'), 'a\\b');
    assert.equal(path.win32.normalize('//server/share/dir/file.ext'),
        '\\\\server\\share\\dir\\file.ext');
    assert.equal(path.win32.normalize('/a/b/c/../../../x/y/z'), '\\x\\y\\z');

    assert.equal(path.posix.normalize('./fixtures///b/../b/c.js'),
        'fixtures/b/c.js');
    assert.equal(path.posix.normalize('/foo/../../../bar'), '/bar');
    assert.equal(path.posix.normalize('a//b//../b'), 'a/b');
    assert.equal(path.posix.normalize('a//b//./c'), 'a/b/c');
    assert.equal(path.posix.normalize('a//b//.'), 'a/b');
    assert.equal(path.posix.normalize('/a/b/c/../../../x/y/z'), '/x/y/z');
    assert.equal(path.posix.normalize('///..//./foo/.//bar'), '/foo/bar');
};
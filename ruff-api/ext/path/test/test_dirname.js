var path = require('../');
var assert = require('assert');

exports['test should run dirname'] = function () {
    assert.equal(path.posix.dirname('/a/b/'), '/a');
    assert.equal(path.posix.dirname('/a/b'), '/a');
    assert.equal(path.posix.dirname('/a'), '/');
    assert.equal(path.posix.dirname(''), '.');
    assert.equal(path.posix.dirname('/'), '/');
    assert.equal(path.posix.dirname('////'), '/');
    assert.equal(path.posix.dirname('foo'), '.');

    assert.equal(path.win32.dirname('c:\\'), 'c:\\');
    assert.equal(path.win32.dirname('c:\\foo'), 'c:\\');
    assert.equal(path.win32.dirname('c:\\foo\\'), 'c:\\');
    assert.equal(path.win32.dirname('c:\\foo\\bar'), 'c:\\foo');
    assert.equal(path.win32.dirname('c:\\foo\\bar\\'), 'c:\\foo');
    assert.equal(path.win32.dirname('c:\\foo\\bar\\baz'), 'c:\\foo\\bar');
    assert.equal(path.win32.dirname('\\'), '\\');
    assert.equal(path.win32.dirname('\\foo'), '\\');
    assert.equal(path.win32.dirname('\\foo\\'), '\\');
    assert.equal(path.win32.dirname('\\foo\\bar'), '\\foo');
    assert.equal(path.win32.dirname('\\foo\\bar\\'), '\\foo');
    assert.equal(path.win32.dirname('\\foo\\bar\\baz'), '\\foo\\bar');
    assert.equal(path.win32.dirname('c:'), 'c:');
    assert.equal(path.win32.dirname('c:foo'), 'c:');
    assert.equal(path.win32.dirname('c:foo\\'), 'c:');
    assert.equal(path.win32.dirname('c:foo\\bar'), 'c:foo');
    assert.equal(path.win32.dirname('c:foo\\bar\\'), 'c:foo');
    assert.equal(path.win32.dirname('c:foo\\bar\\baz'), 'c:foo\\bar');
    assert.equal(path.win32.dirname('\\\\unc\\share'), '\\\\unc\\share');
    assert.equal(path.win32.dirname('\\\\unc\\share\\foo'), '\\\\unc\\share\\');
    assert.equal(path.win32.dirname('\\\\unc\\share\\foo\\'), '\\\\unc\\share\\');
    assert.equal(path.win32.dirname('\\\\unc\\share\\foo\\bar'),
                '\\\\unc\\share\\foo');
    assert.equal(path.win32.dirname('\\\\unc\\share\\foo\\bar\\'),
                '\\\\unc\\share\\foo');
    assert.equal(path.win32.dirname('\\\\unc\\share\\foo\\bar\\baz'),
                '\\\\unc\\share\\foo\\bar');
    assert.equal(path.win32.dirname('/a/b/'), '/a');
    assert.equal(path.win32.dirname('/a/b'), '/a');
    assert.equal(path.win32.dirname('/a'), '/');
    assert.equal(path.win32.dirname(''), '.');
    assert.equal(path.win32.dirname('/'), '/');
    assert.equal(path.win32.dirname('////'), '/');
    assert.equal(path.win32.dirname('foo'), '.');
};
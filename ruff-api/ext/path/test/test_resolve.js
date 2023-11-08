var path = require('../');
var assert = require('assert');

exports['test should run resolve'] = function () {// path.resolve tests
    var failures = [];

    [[['c:/blah\\blah', 'd:/games', 'c:../a'], 'c:\\blah\\a'],
        [['c:/ignore', 'd:\\a/b\\c/d', '\\e.exe'], 'd:\\e.exe'],
        [['c:/ignore', 'c:/some/file'], 'c:\\some\\file'],
        [['d:/ignore', 'd:some/dir//'], 'd:\\ignore\\some\\dir'],
        // [['.'], process.cwd()],
        [['//server/share', '..', 'relative\\'], '\\\\server\\share\\relative'],
        [['c:/', '//'], 'c:\\'],
        [['c:/', '//dir'], 'c:\\dir'],
        [['c:/', '//server/share'], '\\\\server\\share\\'],
        [['c:/', '//server//share'], '\\\\server\\share\\'],
        [['c:/', '///some//dir'], 'c:\\some\\dir'],
        [['C:\\foo\\tmp.3\\', '..\\tmp.3\\cycles\\root.js'],
        'C:\\foo\\tmp.3\\cycles\\root.js']
    ].forEach(function(oneCase) {
        var resolve = path.win32.resolve;
        var actual = resolve.apply(null, oneCase[0]);
        var actualAlt = actual.replace(/\//g, '\\');

        var expected = oneCase[1];
        var fn = 'path.win32.resolve(';
        var message = fn + oneCase[0].map(JSON.stringify).join(',') + ')' +
                        '\n  expect=' + JSON.stringify(expected) +
                        '\n  actual=' + JSON.stringify(actual);
        if (actual !== expected && actualAlt !== expected)
            failures.push('\n' + message);
    });
    assert.equal(failures.length, 0, failures.join(''));

    failures = [];
    [[['/var/lib', '../', 'file/'], '/var/file'],
        [['/var/lib', '/../', 'file/'], '/file'],
        [['a/b/c/', '../../..'], process.cwd()],
        [['.'], process.cwd()],
        [['/some/dir', '.', '/absolute/'], '/absolute'],
        [['/foo/tmp.3/', '../tmp.3/cycles/root.js'], '/foo/tmp.3/cycles/root.js']
    ].forEach(function(oneCase) {
        var resolve = path.posix.resolve;
        var actual = resolve.apply(null, oneCase[0]);
        var actualAlt = actual.replace(/\\/g, '/');

        var expected = oneCase[1];
        var fn = 'path.posix.resolve(';
        var message = fn + oneCase[0].map(JSON.stringify).join(',') + ')' +
                        '\n  expect=' + JSON.stringify(expected) +
                        '\n  actual=' + JSON.stringify(actual);
        if (actual !== expected && actualAlt !== expected)
            failures.push('\n' + message);
    });
    assert.equal(failures.length, 0, failures.join(''));
};
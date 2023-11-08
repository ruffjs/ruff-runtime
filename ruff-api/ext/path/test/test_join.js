var path = require('../');
var assert = require('assert');

exports['test should run join'] = function () {
    var failures = [];
    var joinTests =
        // arguments                     result
        [[['.', 'x/b', '..', '/b/c.js'], 'x/b/c.js'],
            [['/.', 'x/b', '..', '/b/c.js'], '/x/b/c.js'],
            [['/foo', '../../../bar'], '/bar'],
            [['foo', '../../../bar'], '../../bar'],
            [['foo/', '../../../bar'], '../../bar'],
            [['foo/x', '../../../bar'], '../bar'],
            [['foo/x', './bar'], 'foo/x/bar'],
            [['foo/x/', './bar'], 'foo/x/bar'],
            [['foo/x/', '.', 'bar'], 'foo/x/bar'],
            [['./'], './'],
            [['.', './'], './'],
            [['.', '.', '.'], '.'],
            [['.', './', '.'], '.'],
            [['.', '/./', '.'], '.'],
            [['.', '/////./', '.'], '.'],
            [['.'], '.'],
            [['', '.'], '.'],
            [['', 'foo'], 'foo'],
            [['foo', '/bar'], 'foo/bar'],
            [['', '/foo'], '/foo'],
            [['', '', '/foo'], '/foo'],
            [['', '', 'foo'], 'foo'],
            [['foo', ''], 'foo'],
            [['foo/', ''], 'foo/'],
            [['foo', '', '/bar'], 'foo/bar'],
            [['./', '..', '/foo'], '../foo'],
            [['./', '..', '..', '/foo'], '../../foo'],
            [['.', '..', '..', '/foo'], '../../foo'],
            [['', '..', '..', '/foo'], '../../foo'],
            [['/'], '/'],
            [['/', '.'], '/'],
            [['/', '..'], '/'],
            [['/', '..', '..'], '/'],
            [[''], '.'],
            [['', ''], '.'],
            [[' /foo'], ' /foo'],
            [[' ', 'foo'], ' /foo'],
            [[' ', '.'], ' '],
            [[' ', '/'], ' /'],
            [[' ', ''], ' '],
            [['/', 'foo'], '/foo'],
            [['/', '/foo'], '/foo'],
            [['/', '//foo'], '/foo'],
            [['/', '', '/foo'], '/foo'],
            [['', '/', 'foo'], '/foo'],
            [['', '/', '/foo'], '/foo']
        ];

    // Run the join tests.
    joinTests.forEach(function (test) {
        var actual = path.posix.join.apply(path, test[0]);
        var expected = test[1];
        var message = '[posix] path.join(' + test[0].map(JSON.stringify).join(',') + ')' +
            '\n  expect=' + JSON.stringify(expected) +
            '\n  actual=' + JSON.stringify(actual);
        if (actual !== expected) failures.push('\n' + message);
        // assert.equal(actual, expected, message);
    });
    assert.equal(failures.length, 0, failures.join(''));

    // Windows-specific join tests
    joinTests = joinTests.concat(
        [// UNC path expected
            [['//foo/bar'], '//foo/bar/'],
            [['\\/foo/bar'], '//foo/bar/'],
            [['\\\\foo/bar'], '//foo/bar/'],
            // UNC path expected - server and share separate
            [['//foo', 'bar'], '//foo/bar/'],
            [['//foo/', 'bar'], '//foo/bar/'],
            [['//foo', '/bar'], '//foo/bar/'],
            // UNC path expected - questionable
            [['//foo', '', 'bar'], '//foo/bar/'],
            [['//foo/', '', 'bar'], '//foo/bar/'],
            [['//foo/', '', '/bar'], '//foo/bar/'],
            // UNC path expected - even more questionable
            [['', '//foo', 'bar'], '//foo/bar/'],
            [['', '//foo/', 'bar'], '//foo/bar/'],
            [['', '//foo/', '/bar'], '//foo/bar/'],
            // No UNC path expected (no double slash in first component)
            [['\\', 'foo/bar'], '/foo/bar'],
            [['\\', '/foo/bar'], '/foo/bar'],
            [['', '/', '/foo/bar'], '/foo/bar'],
            // No UNC path expected (no non-slashes in first component - questionable)
            [['//', 'foo/bar'], '/foo/bar'],
            [['//', '/foo/bar'], '/foo/bar'],
            [['\\\\', '/', '/foo/bar'], '/foo/bar'],
            [['//'], '/'],
            // No UNC path expected (share name missing - questionable).
            [['//foo'], '/foo'],
            [['//foo/'], '/foo/'],
            [['//foo', '/'], '/foo/'],
            [['//foo', '', '/'], '/foo/'],
            // No UNC path expected (too many leading slashes - questionable)
            [['///foo/bar'], '/foo/bar'],
            [['////foo', 'bar'], '/foo/bar'],
            [['\\\\\\/foo/bar'], '/foo/bar'],
            // Drive-relative vs drive-absolute paths. This merely describes the
            // status quo, rather than being obviously right
            [['c:'], 'c:.'],
            [['c:.'], 'c:.'],
            [['c:', ''], 'c:.'],
            [['', 'c:'], 'c:.'],
            [['c:.', '/'], 'c:./'],
            [['c:.', 'file'], 'c:file'],
            [['c:', '/'], 'c:/'],
            [['c:', 'file'], 'c:/file']
        ]);
    // Run the join tests.
    joinTests.forEach(function (test) {
        var actual = path.win32.join.apply(path, test[0]);
        var expected = test[1].replace(/\//g, '\\');
        var message = '[win32] path.join(' + test[0].map(JSON.stringify).join(',') + ')' +
            '\n  expect=' + JSON.stringify(expected) +
            '\n  actual=' + JSON.stringify(actual);
        if (actual !== expected) failures.push('\n' + message);
        // assert.equal(actual, expected, message);
    });
    assert.equal(failures.length, 0, failures.join(''));

};
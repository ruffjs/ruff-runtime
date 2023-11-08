var path = require('../');
var assert = require('assert');

exports['test should run relative'] = function () {
    var failures = [];
    [['c:/blah\\blah', 'd:/games', 'd:\\games'],
        ['c:/aaaa/bbbb', 'c:/aaaa', '..'],
        ['c:/aaaa/bbbb', 'c:/cccc', '..\\..\\cccc'],
        ['c:/aaaa/bbbb', 'c:/aaaa/bbbb', ''],
        ['c:/aaaa/bbbb', 'c:/aaaa/cccc', '..\\cccc'],
        ['c:/aaaa/', 'c:/aaaa/cccc', 'cccc'],
        ['c:/', 'c:\\aaaa\\bbbb', 'aaaa\\bbbb'],
        ['c:/aaaa/bbbb', 'd:\\', 'd:\\']
    ].forEach(function(test) {
        var actual = path.win32.relative(test[0], test[1]);
        var expected = test[2];
        var message = 'path.relative(' +
            test.slice(0, 2).map(JSON.stringify).join(',') +
            ')' +
            '\n  expect=' + JSON.stringify(expected) +
            '\n  actual=' + JSON.stringify(actual);
        if (actual !== expected) failures.push('\n' + message);
    });

    assert.equal(failures.length, 0, failures.join(''));

    [['/var/lib', '/var', '..'],
        ['/var/lib', '/bin', '../../bin'],
        ['/var/lib', '/var/lib', ''],
        ['/var/lib', '/var/apache', '../apache'],
        ['/var/', '/var/lib', 'lib'],
        ['/', '/var/lib', 'var/lib']
    ].forEach(function(test) {
        var actual = path.posix.relative(test[0], test[1]);
        var expected = test[2];
        var message = 'path.relative(' +
            test.slice(0, 2).map(JSON.stringify).join(',') +
            ')' +
            '\n  expect=' + JSON.stringify(expected) +
            '\n  actual=' + JSON.stringify(actual);
        if (actual !== expected) failures.push('\n' + message);
    });

    assert.equal(failures.length, 0, failures.join(''));
};
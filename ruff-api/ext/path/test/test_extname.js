var path = require('../');
var assert = require('assert');

exports['test should run extname'] = function () {
    var failures = [];
    [
        [__filename, '.js'],
        ['', ''],
        ['/path/to/file', ''],
        ['/path/to/file.ext', '.ext'],
        ['/path.to/file.ext', '.ext'],
        ['/path.to/file', ''],
        ['/path.to/.file', ''],
        ['/path.to/.file.ext', '.ext'],
        ['/path/to/f.ext', '.ext'],
        ['/path/to/..ext', '.ext'],
        ['/path/to/..', ''],
        ['file', ''],
        ['file.ext', '.ext'],
        ['.file', ''],
        ['.file.ext', '.ext'],
        ['/file', ''],
        ['/file.ext', '.ext'],
        ['/.file', ''],
        ['/.file.ext', '.ext'],
        ['.path/file.ext', '.ext'],
        ['file.ext.ext', '.ext'],
        ['file.', '.'],
        ['.', ''],
        ['./', ''],
        ['.file.ext', '.ext'],
        ['.file', ''],
        ['.file.', '.'],
        ['.file..', '.'],
        ['..', ''],
        ['../', ''],
        ['..file.ext', '.ext'],
        ['..file', '.file'],
        ['..file.', '.'],
        ['..file..', '.'],
        ['...', '.'],
        ['...ext', '.ext'],
        ['....', '.'],
        ['file.ext/', '.ext'],
        ['file.ext//', '.ext'],
        ['file/', ''],
        ['file//', ''],
        ['file./', '.'],
        ['file.//', '.']
    ].forEach(function(test) {
        [path.posix.extname, path.win32.extname].forEach(function(extname) {
                var input = test[0];
                if (extname === path.win32.extname)
                    input = input.replace(/\//g, '\\');
                var actual = extname(input);
                var expected = test[1];
                var fn = 'path.' +
                        (extname === path.win32.extname ? 'win32' : 'posix') +
                        '.extname(';
                var message = fn + JSON.stringify(input) + ')' +
                                '\n  expect=' + JSON.stringify(expected) +
                                '\n  actual=' + JSON.stringify(actual);
                if (actual !== expected)
                failures.push('\n' + message);
            });
        }
    );
    assert.equal(failures.length, 0, failures.join(''));

    // On windows, backspace is a path separator.
    assert.equal(path.win32.extname('.\\'), '');
    assert.equal(path.win32.extname('..\\'), '');
    assert.equal(path.win32.extname('file.ext\\'), '.ext');
    assert.equal(path.win32.extname('file.ext\\\\'), '.ext');
    assert.equal(path.win32.extname('file\\'), '');
    assert.equal(path.win32.extname('file\\\\'), '');
    assert.equal(path.win32.extname('file.\\'), '.');
    assert.equal(path.win32.extname('file.\\\\'), '.');

    // On unix, backspace is a valid name component like any other character.
    assert.equal(path.posix.extname('.\\'), '');
    assert.equal(path.posix.extname('..\\'), '.\\');
    assert.equal(path.posix.extname('file.ext\\'), '.ext\\');
    assert.equal(path.posix.extname('file.ext\\\\'), '.ext\\\\');
    assert.equal(path.posix.extname('file\\'), '');
    assert.equal(path.posix.extname('file\\\\'), '');
    assert.equal(path.posix.extname('file.\\'), '.\\');
    assert.equal(path.posix.extname('file.\\\\'), '.\\\\');
};
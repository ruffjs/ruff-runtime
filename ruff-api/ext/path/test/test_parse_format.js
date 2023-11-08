var path = require('../');
var assert = require('assert');
/*
var errors = [
  {method: 'parse', input: [null],
   message: /Path must be a string. Received null/},
  {method: 'parse', input: [{}],
   message: /Path must be a string. Received {}/},
  {method: 'parse', input: [true],
   message: /Path must be a string. Received true/},
  {method: 'parse', input: [1],
   message: /Path must be a string. Received 1/},
  {method: 'parse', input: [],
   message: /Path must be a string. Received undefined/},
  {method: 'format', input: [null],
   message: /Parameter "pathObject" must be an object, not/},
  {method: 'format', input: [''],
   message: /Parameter "pathObject" must be an object, not string/},
  {method: 'format', input: [true],
   message: /Parameter "pathObject" must be an object, not boolean/},
  {method: 'format', input: [1],
   message: /Parameter "pathObject" must be an object, not number/},
];
*/

function checkParseFormat(path, paths) {
  paths.forEach(function(element) {
    var output = path.parse(element);

    assert.strictEqual(typeof output.root, 'string');
    assert.strictEqual(typeof output.dir, 'string');
    assert.strictEqual(typeof output.base, 'string');
    assert.strictEqual(typeof output.ext, 'string');
    assert.strictEqual(typeof output.name, 'string');
    // assert.strictEqual(path.format(output), path.normalize(element));
    assert.strictEqual(output.dir, output.dir ? path.dirname(element) : '');
    assert.strictEqual(output.base, path.basename(element));
    assert.strictEqual(output.ext, path.extname(element));
  });
}

function checkSpecialCaseParseFormat(path, testCases) {
  testCases.forEach(function(testCase) {
    var element = testCase[0];
    var expect = testCase[1];
    var output = path.parse(element);
    Object.keys(expect).forEach(function(key) {
      assert.strictEqual(output[key], expect[key]);
    });
  });
}

function checkFormat(path, testCases) {
  testCases.forEach(function(testCase) {
    assert.strictEqual(path.format(testCase[0]), testCase[1]);
  });
}

exports['test win32 parse format'] = function () {
    var winPaths = [
        'C:\\path\\dir\\index.html',
        'C:\\another_path\\DIR\\1\\2\\33\\\\index',
        'another_path\\DIR with spaces\\1\\2\\33\\index',
        '\\foo\\C:',
        'file',
        '.\\file',
        'C:\\',
        '',

        // unc
        '\\\\server\\share\\file_path',
        '\\\\server two\\shared folder\\file path.zip',
        '\\\\teela\\admin$\\system32',
        '\\\\?\\UNC\\server\\share'
    ];
    checkParseFormat(path.win32, winPaths);
};

exports['test posix parse format'] = function () {
    var unixPaths = [
    '/home/user/dir/file.txt',
    '/home/user/a dir/another File.zip',
    '/home/user/a dir//another&File.',
    '/home/user/a$$$dir//another File.zip',
    'user/dir/another File.zip',
    'file',
    '.\\file',
    './file',
    'C:\\foo',
    '/',
    '',
    '.',
    '..',
    '/foo',
    '/foo.',
    '/foo.bar',
    '/.',
    '/.foo',
    '/.foo.bar',
    '/foo/bar.baz',
    ];
    checkParseFormat(path.posix, unixPaths);
};

exports['test win32 special case parse format'] = function () {
    var winSpecialCaseParseTests = [
    ['/foo/bar', {root: '/'}]
    ];
    checkSpecialCaseParseFormat(path.win32, winSpecialCaseParseTests);
};

exports['test win32 check format'] = function () {
    var winSpecialCaseFormatTests = [
        [{dir: 'some\\dir'}, 'some\\dir\\'],
        [{base: 'index.html'}, 'index.html'],
        [{root: 'C:\\'}, 'C:\\'],
        [{name: 'index', ext: '.html'}, 'index.html'],
        [{dir: 'some\\dir', name: 'index', ext: '.html'}, 'some\\dir\\index.html'],
        [{root: 'C:\\', name: 'index', ext: '.html'}, 'C:\\index.html'],
        [{}, '']
    ];
    checkFormat(path.win32, winSpecialCaseFormatTests);
};

exports['test posix check format'] = function () {
    var unixSpecialCaseFormatTests = [
        [{dir: 'some/dir'}, 'some/dir/'],
        [{base: 'index.html'}, 'index.html'],
        [{root: '/'}, '/'],
        [{name: 'index', ext: '.html'}, 'index.html'],
        [{dir: 'some/dir', name: 'index', ext: '.html'}, 'some/dir/index.html'],
        [{root: '/', name: 'index', ext: '.html'}, '/index.html'],
        [{}, '']
    ];
    checkFormat(path.posix, unixSpecialCaseFormatTests);
};

exports['test win32 trailing'] = function () {
    var failures = [];
    var parse = path.win32.parse;
    [['.\\', { root: '', dir: '', base: '.', ext: '', name: '.' }],
     ['\\\\', { root: '\\', dir: '\\', base: '', ext: '', name: '' }],
     ['\\\\', { root: '\\', dir: '\\', base: '', ext: '', name: '' }],
     ['c:\\foo\\\\\\',
      { root: 'c:\\', dir: 'c:\\', base: 'foo', ext: '', name: 'foo' }],
     ['D:\\foo\\\\\\bar.baz',
      { root: 'D:\\',
        dir: 'D:\\foo\\\\',
        base: 'bar.baz',
        ext: '.baz',
        name: 'bar'
      }
     ]
    ].forEach(function (test) {
        var actual = parse(test[0]);
        var expected = test[1];
        var fn = 'path.win32.parse(';
        var message = fn +
                JSON.stringify(test[0]) +
                ')' +
                '\n  expect=' + JSON.stringify(expected) +
                '\n  actual=' + JSON.stringify(actual);
        var actualKeys = Object.keys(actual);
        var expectedKeys = Object.keys(expected);
        var failed = (actualKeys.length !== expectedKeys.length);
        if (!failed) {
            for (var i = 0; i < actualKeys.length; ++i) {
                var key = actualKeys[i];
                if (expectedKeys.indexOf(key) === -1 || actual[key] !== expected[key]) {
                failed = true;
                break;
                }
            }
        }
        if (failed)
        failures.push('\n' + message);
    });
    assert.equal(failures.length, 0, failures.join(''));
};

exports['test posix trailing'] = function () {
    var failures = [];
    var parse = path.posix.parse;
    [['./', { root: '', dir: '', base: '.', ext: '', name: '.' }],
     ['//', { root: '/', dir: '/', base: '', ext: '', name: '' }],
     ['///', { root: '/', dir: '/', base: '', ext: '', name: '' }],
     ['/foo///', { root: '/', dir: '/', base: 'foo', ext: '', name: 'foo' }],
     ['/foo///bar.baz',
      { root: '/', dir: '/foo//', base: 'bar.baz', ext: '.baz', name: 'bar' }
     ]
    ].forEach(function (test) {
        var actual = parse(test[0]);
        var expected = test[1];
        var fn = 'path.posix.parse(';
        var message = fn +
                        JSON.stringify(test[0]) +
                        ')' +
                        '\n  expect=' + JSON.stringify(expected) +
                        '\n  actual=' + JSON.stringify(actual);
        var actualKeys = Object.keys(actual);
        var expectedKeys = Object.keys(expected);
        var failed = (actualKeys.length !== expectedKeys.length);
        if (!failed) {
            for (var i = 0; i < actualKeys.length; ++i) {
                var key = actualKeys[i];
                if (expectedKeys.indexOf(key) === -1 || actual[key] !== expected[key]) {
                failed = true;
                break;
                }
            }
        }
        if (failed)
            failures.push('\n' + message);
    })
};
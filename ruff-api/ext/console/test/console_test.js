var console = require('../').console;
var assert = require('assert');

var original_print;
var strings = [];

exports.beforeEach = function () {
    original_print = print;
    print = function (string) {
        strings.push(string+'\n');
    };
};

exports.afterEach = function () {
    print = original_print;
};

exports['test should run console log'] = function () {
    console.log('foo');
    console.log('foo', 'bar');

    assert.equal('foo\n', strings.shift());
    assert.equal('foo bar\n', strings.shift());
    assert.equal(strings.length, 0);
};

exports['test should console log with empty'] = function () {
    console.log();
    assert.equal('\n', strings.shift());
};

exports['test should console log with null'] = function () {
    console.log(null);
    assert.equal('null\n', strings.shift());
};

exports['test should format string when log'] = function () {
    console.log('%s %s', 'foo', 'bar', 'hop');

    assert.equal('foo bar hop\n', strings.shift());
    assert.equal(strings.length, 0);
};

exports['test should escape special char when log'] = function () {
    console.log({slashes: '\\\\'});

    assert.equal("{ slashes: '\\\\\\\\' }\n", strings.shift());
    assert.equal(strings.length, 0);
};

exports['test should run console error'] = function () {
    console.error('foo');

    assert.equal('foo\n', strings.shift());
    assert.equal(strings.length, 0);
};

exports['test should run console dir'] = function () {
    console.dir({foo: {bar: {baz: true}}}, {depth: 0});
    console.dir({foo: {bar: {baz: true}}}, {depth: 1});

    assert.notEqual(-1, strings.shift().indexOf('foo: [Object]'));
    assert.equal(-1, strings.shift().indexOf('baz'));
    assert.equal(strings.length, 0);
};

exports['test should use custom inspect method when dir'] = function () {
    // an Object with a custom .inspect() function
    var custom_inspect = {
        foo: 'bar',
        inspect: function () {
            return 'inspect';
        }
    };
    console.dir(custom_inspect);

    assert.equal("{ foo: 'bar', inspect: [Function] }\n", strings.shift());
    assert.equal(strings.length, 0);
};

exports['test should run console time and timeEnd'] = function () {
    console.time('label');
    console.timeEnd('label');

    assert.ok(/^label: [.\d]+ms$/.test(strings.shift().trim()));
    assert.equal(strings.length, 0);
};

exports['test should run console time and timeEnd when use Object.prototype properties as labels'] = function () {
    console.time('__proto__');
    console.timeEnd('__proto__');
    console.time('constructor');
    console.timeEnd('constructor');
    console.time('hasOwnProperty');
    console.timeEnd('hasOwnProperty');

    assert.ok(/^__proto__: [.\d]+ms$/.test(strings.shift().trim()));
    assert.ok(/^constructor: [.\d]+ms$/.test(strings.shift().trim()));
    assert.ok(/^hasOwnProperty: [.\d]+ms$/.test(strings.shift().trim()));
    assert.equal(strings.length, 0);
};


exports['test should run console error'] = function () {
    console.trace('This is a %j %d', {formatted: 'trace'}, 10, 'foo');

    assert.equal('Trace: This is a {"formatted":"trace"} 10 foo',
        strings.shift().split('\n').shift());
};

exports['test should run console assert with true value'] = function () {
    console.assert(true);
};

exports['test should throw Error when run console assert with false value'] = function () {
    assert.throws(
        function () {
            console.assert(false);
        }, Error);
};

exports['test should run console buffer'] = function () {
    console.log(new Buffer([1, 2, 3]));
    console.log(Buffer.from([1, 2, 3]), 123);
    console.log(Buffer.from([1, 2, 3]), 123, [1, 2, 3]);

    assert.equal('<Buffer 01 02 03>\n', strings.shift());
    assert.equal('<Buffer 01 02 03> 123\n', strings.shift());
    // NOTE: the result of node is <Buffer 01 02 03> '123' [ 1, 2, 3 ]
    assert.equal('<Buffer 01 02 03> 123 [ 1, 2, 3 ]\n', strings.shift());
};

require('test').run(exports);

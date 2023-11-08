var assert = require('assert');
var qs = require('../src/index.js');

// [ wonkyQS, canonicalQS, obj ]
var qsTestCases = [
    ['foo=918854443121279438895193',
        'foo=918854443121279438895193',
        { 'foo': '918854443121279438895193' }],
    ['foo=bar', 'foo=bar', { 'foo': 'bar' }],
    ['foo=bar&foo=quux', 'foo=bar&foo=quux', { 'foo': ['bar', 'quux'] }],
    ['foo=1&bar=2', 'foo=1&bar=2', { 'foo': '1', 'bar': '2' }],
    ['my+weird+field=q1%212%22%27w%245%267%2Fz8%29%3F',
        'my%20weird%20field=q1!2%22\'w%245%267%2Fz8)%3F',
        { 'my weird field': 'q1!2"\'w$5&7/z8)?' }],
    ['foo%3Dbaz=bar', 'foo%3Dbaz=bar', { 'foo=baz': 'bar' }],
    ['foo=baz=bar', 'foo=baz%3Dbar', { 'foo': 'baz=bar' }],
    ['str=foo&arr=1&arr=2&arr=3&somenull=&undef=',
        'str=foo&arr=1&arr=2&arr=3&somenull=&undef=',
        {
            'str': 'foo',
            'arr': ['1', '2', '3'],
            'somenull': '',
            'undef': ''
        }],
    [' foo = bar ', '%20foo%20=%20bar%20', { ' foo ': ' bar ' }],
    //['foo=%zx', 'foo=%25zx', {'foo': '%zx'}],
    ['foo=%EF%BF%BD', 'foo=%EF%BF%BD', { 'foo': '\ufffd' }],
    // See: https://github.com/joyent/node/issues/1707
    ['hasOwnProperty=x&toString=foo&valueOf=bar&__defineGetter__=baz',
        'hasOwnProperty=x&toString=foo&valueOf=bar&__defineGetter__=baz',
        {
            hasOwnProperty: 'x',
            toString: 'foo',
            valueOf: 'bar',
            __defineGetter__: 'baz'
        }],
    // See: https://github.com/joyent/node/issues/3058
    ['foo&bar=baz', 'foo=&bar=baz', { foo: '', bar: 'baz' }],
    [null, '', {}],
    [undefined, '', {}]
];

// [ wonkyQS, canonicalQS, obj ]
var qsColonTestCases = [
    ['foo:bar', 'foo:bar', { 'foo': 'bar' }],
    ['foo:bar;foo:quux', 'foo:bar;foo:quux', { 'foo': ['bar', 'quux'] }],
    ['foo:1&bar:2;baz:quux',
        'foo:1%26bar%3A2;baz:quux',
        { 'foo': '1&bar:2', 'baz': 'quux' }],
    ['foo%3Abaz:bar', 'foo%3Abaz:bar', { 'foo:baz': 'bar' }],
    ['foo:baz:bar', 'foo:baz%3Abar', { 'foo': 'baz:bar' }]
];

// [wonkyObj, qs, canonicalObj]
var extendedFunction = function() {
};
extendedFunction.prototype = { a: 'b' };
var qsWeirdObjects = [
    [{ regexp: /./g }, 'regexp=', { 'regexp': '' }],
    [{ regexp: new RegExp('.', 'g') }, 'regexp=', { 'regexp': '' }],
    [{
        fn: function() {
        }
    }, 'fn=', { 'fn': '' }],
    [{ fn: new Function('') }, 'fn=', { 'fn': '' }],
    [{ math: Math }, 'math=', { 'math': '' }],
    [{ e: extendedFunction }, 'e=', { 'e': '' }],
    [{ d: new Date() }, 'd=', { 'd': '' }],
    [{ d: Date }, 'd=', { 'd': '' }],
    [{ f: new Boolean(false), t: new Boolean(true) }, 'f=&t=', { 'f': '', 't': '' }],
    [{ f: false, t: true }, 'f=false&t=true', { 'f': 'false', 't': 'true' }],
    [{ n: null }, 'n=', { 'n': '' }],
    [{ nan: NaN }, 'nan=', { 'nan': '' }],
    [{ inf: Infinity }, 'inf=', { 'inf': '' }],
    [{ a: [], b: [] }, '', {}]
];

exports['test should run stringify on normal cases'] = function() {
    qsTestCases.forEach(function(testCase) {
        assert.equal(testCase[1], qs.stringify(testCase[2]));
    });
};

exports['test should override default separator when run stringify'] = function() {
    qsColonTestCases.forEach(function(testCase) {
        assert.equal(testCase[1], qs.stringify(testCase[2], ';', ':'));
    });
};

exports['test should stringify weired objects'] = function() {
    qsWeirdObjects.forEach(function(testCase) {
        assert.equal(testCase[1], qs.stringify(testCase[0]));
    });
};

exports['test should coerce numbers to string when run stringify'] = function() {
    assert.strictEqual('foo=0', qs.stringify({ foo: 0 }));
    assert.strictEqual('foo=0', qs.stringify({ foo: -0 }));
    assert.strictEqual('foo=3', qs.stringify({ foo: 3 }));
    assert.strictEqual('foo=-72.42', qs.stringify({ foo: -72.42 }));
    assert.strictEqual('foo=', qs.stringify({ foo: NaN }));
    assert.strictEqual('foo=', qs.stringify({ foo: Infinity }));
};

exports['test should stringify nested objects'] = function() {
    var f = qs.stringify({
        a: 'b',
        q: qs.stringify({
            x: 'y',
            y: 'z'
        })
    });
    assert.equal(f, 'a=b&q=x%3Dy%26y%3Dz');
};

exports['test should stringify nested in colon objects'] = function() {
    var f = qs.stringify({
        a: 'b',
        q: qs.stringify({
            x: 'y',
            y: 'z'
        }, ';', ':')
    }, ';', ':');
    assert.equal(f, 'a:b;q:x%3Ay%3By%3Az');
};

exports['test limiting'] = function() {
    assert.equal(
        Object.keys(qs.parse('a=1&b=1&c=1', null, null, { maxKeys: 1 })).length,
        1);
};

exports['test removing limiting'] = function() {
    var query = {};
    for (var i = 0; i < 2000; i++) query[i] = i;
    var url = qs.stringify(query);
    assert.equal(
        Object.keys(qs.parse(url, null, null, { maxKeys: 0 })).length,
        2000);
};

exports['test unescape buffer'] = function() {
    var b = qs.unescapeBuffer('%d3%f2Ug%1f6v%24%5e%98%cb' +
        '%0d%ac%a2%2f%9d%eb%d8%a2%e6');
    // <Buffer d3 f2 55 67 1f 36 76 24 5e 98 cb 0d ac a2 2f 9d eb d8 a2 e6>
    assert.equal(0xd3, b[0]);
    assert.equal(0xf2, b[1]);
    assert.equal(0x55, b[2]);
    assert.equal(0x67, b[3]);
    assert.equal(0x1f, b[4]);
    assert.equal(0x36, b[5]);
    assert.equal(0x76, b[6]);
    assert.equal(0x24, b[7]);
    assert.equal(0x5e, b[8]);
    assert.equal(0x98, b[9]);
    assert.equal(0xcb, b[10]);
    assert.equal(0x0d, b[11]);
    assert.equal(0xac, b[12]);
    assert.equal(0xa2, b[13]);
    assert.equal(0x2f, b[14]);
    assert.equal(0x9d, b[15]);
    assert.equal(0xeb, b[16]);
    assert.equal(0xd8, b[17]);
    assert.equal(0xa2, b[18]);
    assert.equal(0xe6, b[19]);
};

exports['test should run parse on normal cases'] = function() {
    qsTestCases.forEach(function(testCase) {
        assert.deepEqual(testCase[2], qs.parse(testCase[0]));
    });
};

exports['test should override default separator when run parse'] = function() {
    qsColonTestCases.forEach(function(testCase) {
        assert.deepEqual(testCase[2], qs.parse(testCase[0], ';', ':'));
    });
};

exports['test should parse weired objects'] = function() {
    qsWeirdObjects.forEach(function(testCase) {
        assert.deepEqual(testCase[2], qs.parse(testCase[1]));
    });
};

exports['test should parse nested objects'] = function() {
    (function() {
        var f = qs.parse('a=b&q=x%3Dy%26y%3Dz');
        f.q = qs.parse(f.q);
        assert.deepEqual(f, { a: 'b', q: { x: 'y', y: 'z' } });
    })();
};

exports['test should parse nested in colon objects'] = function() {
    (function() {
        var f = qs.parse('a:b;q:x%3Ay%3By%3Az', ';', ':');
        f.q = qs.parse(f.q, ';', ':');
        assert.deepEqual(f, { a: 'b', q: { x: 'y', y: 'z' } });
    })();
};

exports['test should use custom decode in parse'] = function() {
    function demoDecode(str) {
        return str + str;
    }
    assert.deepEqual(
        qs.parse('a=a&b=b&c=c', null, null, { decodeURIComponent: demoDecode }),
        { aa: 'aa', bb: 'bb', cc: 'cc' });
};

exports['test should use custom encode in  stringify'] = function() {
    function demoEncode(str) {
        return str[0];
    }
    var obj = { aa: 'aa', bb: 'bb', cc: 'cc' };
    assert.equal(
        qs.stringify(obj, null, null, { encodeURIComponent: demoEncode }),
        'a=a&b=b&c=c');
};

exports['test should override unescape'] = function() {
    var prevUnescape = qs.unescape;
    qs.unescape = function(str) {
        return str.replace(/o/g, '_');
    };
    assert.deepEqual(qs.parse('foo=bor'), { f__: 'b_r' });
    qs.unescape = prevUnescape;
};

exports['test separator and "equals" parsing order'] = function() {
    assert.deepEqual(qs.parse('foo&bar', '&', '&'), { foo: '', bar: '' });
};

exports['test parse with sep && eq'] = function() {
    assert.deepEqual(
        qs.parse('foo=>bar&&bar=>baz', '&&', '=>'),
        { foo: 'bar', bar: 'baz' }
    );

    assert.deepEqual(
        qs.parse('foo==>bar, bar==>baz', ', ', '==>'),
        { foo: 'bar', bar: 'baz' }
    );
};

exports['test stringify with sep && eq'] = function() {
    assert.strictEqual(
        qs.stringify({ foo: 'bar', bar: 'baz' }, '&&', '=>'),
        'foo=>bar&&bar=>baz'
    );

    assert.strictEqual(
        qs.stringify({ foo: 'bar', bar: 'baz' }, ', ', '==>'),
        'foo==>bar, bar==>baz'
    );
};

require('test').run(exports);


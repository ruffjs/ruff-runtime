var assert = require('assert');
var util = require('../src/index.js');

var pid = uv.getpid();

process.env.RUFF_DEBUG = 'label1,label2,label3';

exports['test should run util format'] = function() {
    assert.equal(util.format(), '');
    assert.equal(util.format(''), '');
    assert.equal(util.format([]), '[]');
    assert.equal(util.format({}), '{}');
    assert.equal(util.format(null), 'null');
    assert.equal(util.format(true), 'true');
    assert.equal(util.format(false), 'false');
    assert.equal(util.format('test'), 'test');

    // CHECKME this is for console.log() compatibility - but is it *right*?
    assert.equal(util.format('foo', 'bar', 'baz'), 'foo bar baz');

    assert.equal(util.format('%d', 42.0), '42');
    assert.equal(util.format('%d', 42), '42');
    assert.equal(util.format('%s', 42), '42');
    assert.equal(util.format('%j', 42), '42');

    assert.equal(util.format('%d', '42.0'), '42');
    assert.equal(util.format('%d', '42'), '42');
    assert.equal(util.format('%s', '42'), '42');
    assert.equal(util.format('%j', '42'), '"42"');

    assert.equal(util.format('%%s%s', 'foo'), '%sfoo');

    assert.equal(util.format('%s'), '%s');
    assert.equal(util.format('%s', undefined), 'undefined');
    assert.equal(util.format('%s', 'foo'), 'foo');
    assert.equal(util.format('%s:%s'), '%s:%s');
    assert.equal(util.format('%s:%s', undefined), 'undefined:%s');
    assert.equal(util.format('%s:%s', 'foo'), 'foo:%s');
    assert.equal(util.format('%s:%s', 'foo', 'bar'), 'foo:bar');
    assert.equal(util.format('%s:%s', 'foo', 'bar', 'baz'), 'foo:bar baz');
    assert.equal(util.format('%%%s%%', 'hi'), '%hi%');
    assert.equal(util.format('%%%s%%%%', 'hi'), '%hi%%');

    (function() {
        var o = {};
        o.o = o;
        assert.equal(util.format('%j', o), '[Circular]');
    })();

    // Errors
    assert.equal(util.format(new Error('foo')).substr(0, 11), 'Error: foo\n');
};

exports['test should run util inspect'] = function() {
    assert.equal(util.inspect(1), '1');
    assert.equal(util.inspect(false), 'false');
    assert.equal(util.inspect(''), '\'\'');
    assert.equal(util.inspect('hello'), '\'hello\'');
    assert.equal(util.inspect(function() {}), '[Function]');
    assert.equal(util.inspect(undefined), 'undefined');
    assert.equal(util.inspect(null), 'null');
    assert.equal(util.inspect(/foo(bar\n)?/gi), '/foo(bar\\n)?/gi');
    assert.equal(util.inspect(new Date('2010-02-14T12:48:40+01:00')),
        '2010-02-14T11:48:40.000Z');

    assert.equal(util.inspect('\n\u0001'), '\'\\n\\u0001\'');

    assert.equal(util.inspect([]), '[]');
    assert.equal(util.inspect(Object.create([])), 'Array {}');
    assert.equal(util.inspect([1, 2]), '[ 1, 2 ]');
    assert.equal(util.inspect([1, [2, 3]]), '[ 1, [ 2, 3 ] ]');

    assert.equal(util.inspect({}), '{}');
    assert.equal(util.inspect({
        a: 1
    }), '{ a: 1 }');
    assert.equal(util.inspect({
        a: function() {}
    }), '{ a: [Function] }');
    assert.equal(util.inspect({
        a: 1,
        b: 2
    }), '{ a: 1, b: 2 }');
    assert.equal(util.inspect({
        'a': {}
    }), '{ a: {} }');
    assert.equal(util.inspect({
        'a': {
            'b': 2
        }
    }), '{ a: { b: 2 } }');
    assert.equal(util.inspect({
        'a': {
            'b': {
                'c': {
                    'd': 2
                }
            }
        }
    }),
        '{ a: { b: { c: [Object] } } }');
    assert.equal(util.inspect({
        'a': {
            'b': {
                'c': {
                    'd': 2
                }
            }
        }
    }, false, null),
        '{ a: { b: { c: { d: 2 } } } }');
    assert.equal(util.inspect([1, 2, 3], true), '[ 1, 2, 3, [length]: 3 ]');
    assert.equal(util.inspect({
        'a': {
            'b': {
                'c': 2
            }
        }
    }, false, 0),
        '{ a: [Object] }');
    assert.equal(util.inspect({
        'a': {
            'b': {
                'c': 2
            }
        }
    }, false, 1),
        '{ a: { b: [Object] } }');
    assert.equal(util.inspect(Object.create({}, {
        visible: {
            value: 1,
            enumerable: true
        },
        hidden: {
            value: 2
        }
    })),
        '{ visible: 1 }'
    );
};

exports['test should run util inherits'] = function() {
    var ctor = function() {};
    assert.throws(function() {
        util.inherits(ctor, {});
    }, TypeError);
    assert.throws(function() {
        util.inherits(ctor, null);
    }, TypeError);
    assert.throws(function() {
        util.inherits(null, ctor);
    }, TypeError);
    util.inherits(ctor, ctor);
};

exports['test should run util deprecate'] = function() {
    var strings = [];
    var orgPrint = print;
    print = function(string) {
        strings.push(string);
    };
    var deprecateFunc = util.deprecate(function() {
        return 'deprecate';
    }, 'this func deprecate');
    assert.equal(deprecateFunc(), 'deprecate');
    assert.equal(strings.shift().trim(), 'this func deprecate');
    print = orgPrint;
};

exports['test should run util log'] = function() {
    var strings = [];
    var orgPrint = print;
    print = function(string) {
        strings.push(string);
    };
    var tests = [{
        input: 'foo',
        output: 'foo'
    }, {
        input: undefined,
        output: 'undefined'
    }, {
        input: null,
        output: 'null'
    }, {
        input: false,
        output: 'false'
    }, {
        input: 42,
        output: '42'
    }, {
        input: function() {},
        output: '[Function]'
    }, {
        input: parseInt('not a number', 10),
        output: 'NaN'
    }, {
        input: {
            answer: 42
        },
        output: '{ answer: 42 }'
    }, {
        input: [1, 2, 3],
        output: '[ 1, 2, 3 ]'
    }];
    tests.forEach(function(test) {
        util.log(test.input);
        var result = strings.shift().trim();
        var re = (/[0-9]{1,2} [A-Z][a-z]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} - (.+)$/);
        var match = re.exec(result);
        assert.ok(match);
        assert.equal(match[1], test.output);
    });
    print = orgPrint;
};

exports['test should run debug'] = function() {
    var debuglog = util.debuglog('label1');
    var strings = [];
    var orgPrint = print;
    print = function(string) {
        strings.push(string);
    };

    debuglog('hello from foo [%d]', 123);

    assert.equal(strings.shift().trim(), 'LABEL1 ' + pid + ': hello from foo [123]');
    print = orgPrint;
};

exports['test should do not run debug'] = function() {
    var debuglog = util.debuglog('label');
    var strings = [];
    var orgPrint = print;
    print = function(string) {
        strings.push(string);
    };
    debuglog('hello from foo [%d]', 123);
    assert(strings.length === 0);
    print = orgPrint;
};

exports['test should run all custom debug'] = function() {
    var formatString = 'hello [%s]';
    var l0log = util.debuglog('label');
    var l1log = util.debuglog('label3');
    var l2log = util.debuglog('label2');
    var l3log = util.debuglog('label1');
    var strings = [];
    var orgPrint = print;
    print = function(string) {
        strings.push(string);
    };
    l0log(formatString, 'label');
    l3log(formatString, 'label1');
    l2log(formatString, 'label2');
    l1log(formatString, 'label3');
    assert(strings.length === 3);
    assert.equal(strings.shift().trim(), 'LABEL1 ' + pid + ': hello [label1]');
    assert.equal(strings.shift().trim(), 'LABEL2 ' + pid + ': hello [label2]');
    assert.equal(strings.shift().trim(), 'LABEL3 ' + pid + ': hello [label3]');

    print = orgPrint;
};

//exports['test should format native object not throw exception'] = function(){
//    var timer = uv.new_timer();
//    assert.equal(util.format(timer),'native object');
//    uv.close(timer,function(){});
//};

require('test').run(exports);

'use strict';
var assert = require('assert');
var fromList = require('../src/readable.js')._fromList;

// tiny node-tap lookalike.
var tests = [];
var count = 0;

function test(name, fn) {
    count++;
    tests.push([name, fn]);
}

function run() {
    var next = tests.shift();
    if (!next)
        return;

    var name = next[0];
    var fn = next[1];
    fn({
        same: assert.deepEqual,
        equal: assert.equal,
        end: function() {
            count--;
            run();
        }
    });
}

// ensure all tests have run
process.on('exit', function() {
    assert.equal(count, 0);
});

process.nextTick(run);


test('buffers', function(t) {
    var list = [ Buffer.from('foog'),
                             Buffer.from('bark'),
                             Buffer.from('bazy'),
                             Buffer.from('kuel') ];

    // read more than the first element.
    var ret = fromList(6, { buffer: list, length: 16 });
    t.equal(ret.toString(), 'foogba');

    // read exactly the first element.
    ret = fromList(2, { buffer: list, length: 10 });
    t.equal(ret.toString(), 'rk');

    // read less than the first element.
    ret = fromList(2, { buffer: list, length: 8 });
    t.equal(ret.toString(), 'ba');

    // read more than we have.
    ret = fromList(100, { buffer: list, length: 6 });
    t.equal(ret.toString(), 'zykuel');

    // all consumed.
    t.same(list, []);

    t.end();
});

test('strings', function(t) {
    var list = [ 'foog',
                             'bark',
                             'bazy',
                             'kuel' ];

    // read more than the first element.
    var ret = fromList(6, { buffer: list, length: 16, decoder: true });
    t.equal(ret, 'foogba');

    // read exactly the first element.
    ret = fromList(2, { buffer: list, length: 10, decoder: true });
    t.equal(ret, 'rk');

    // read less than the first element.
    ret = fromList(2, { buffer: list, length: 8, decoder: true });
    t.equal(ret, 'ba');

    // read more than we have.
    ret = fromList(100, { buffer: list, length: 6, decoder: true });
    t.equal(ret, 'zykuel');

    // all consumed.
    t.same(list, []);

    t.end();
});

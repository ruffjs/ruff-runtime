'use strict';

var assert = require('assert');

var ruffAsync = require('../');
var Queue = ruffAsync.Queue;

require('t');

describe('Queue', function () {
    it('should execute task and callback', function (done) {
        var thisArg = {};

        var queue = new Queue(function (foo, bar, callback) {
            assert.equal(this, thisArg);
            assert.equal(foo, 'foo');
            assert.equal(bar, 'bar');
            setTimeout(callback, 0, undefined, 'result');
        });

        queue.push(thisArg, ['foo', 'bar'], function (error, value) {
            assert.ifError(error);
            assert.equal(value, 'result');
            done();
        });
    });

    it('should execute synchronous task and callback', function (done) {
        var thisArg = {};

        var queue = new Queue(function (foo, bar, callback) {
            assert.equal(this, thisArg);
            assert.equal(foo, 'foo');
            assert.equal(bar, 'bar');
            callback(undefined, 'result');
        });

        queue.push(thisArg, ['foo', 'bar'], function (error, value) {
            assert.ifError(error);
            assert.equal(value, 'result');
            done();
        });
    });

    it('should execute task and callback with error', function (done) {
        var thisArg = {};

        var queue = new Queue(function (foo, bar, callback) {
            setTimeout(callback, 0, new Error('test error'));
        });

        queue.push(thisArg, ['foo', 'bar'], function (error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    it('should execute synchronous task and callback with error', function (done) {
        var thisArg = {};

        var queue = new Queue(function (foo, bar, callback) {
            callback(new Error('test error'));
        });

        queue.push(thisArg, ['foo', 'bar'], function (error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    it('should execute multiple tasks and callback', function (done) {
        var thisArg = {};
        var values = [1, 2, 3];

        var queue = new Queue(function (foo, callback) {
            assert.equal(this, thisArg);
            assert.equal(foo, values.shift());
            setTimeout(callback, 0);
        });

        queue.push(thisArg, [1]);
        queue.push(thisArg, [2]);
        queue.push(thisArg, [3], done);
    });

    it('should execute multiple tasks and callback with error', function (done) {
        var thisArg = {};
        var expectedError = new Error();

        var count = 0;

        var queue = new Queue(function (foo, callback) {
            assert.equal(this, thisArg);
            setTimeout(callback, 0, ++count === 1 ? expectedError : undefined);
        });

        queue.push(thisArg, [1]);
        queue.push(thisArg, [2]);
        queue.push(thisArg, [3], function (error) {
            assert(error === expectedError);
            done();
        });
    });

    it('should execute multiple tasks and multiple callbacks', function (done) {
        var thisArg = {};
        var values = [1, 2, 3, 4, 5];

        var queue = new Queue(function (foo, callback) {
            assert.equal(this, thisArg);
            assert.equal(foo, values.shift());
            setTimeout(callback, 0);
        });

        var firstCallbackCalled = false;

        queue.push(thisArg, [1]);
        queue.push(thisArg, [2]);
        queue.push(thisArg, [3], function (error) {
            assert.ifError(error);
            firstCallbackCalled = true;
        });

        queue.push(thisArg, [4]);
        queue.push(thisArg, [5], function (error) {
            assert.ifError(error);
            assert(firstCallbackCalled);
            done();
        });
    });

    it('should have callback fall through event loops', function (done) {
        var thisArg = {};
        var expectedError = new Error();

        var queue = new Queue(function (foo, callback) {
            assert.equal(this, thisArg);
            setTimeout(callback, 10, foo === 2 ? expectedError : undefined);
        });

        queue.push(thisArg, [1]);
        queue.push(thisArg, [2]);
        queue.push(thisArg, [3]);

        queue.on('error', function (error) {
            assert(error === expectedError);
            done();
        });

        setTimeout(function () {
            queue.push(thisArg, [4], function (error) {
                if (error) {
                    done('Should not fall through');
                }
            });
        }, 0);
    });
});

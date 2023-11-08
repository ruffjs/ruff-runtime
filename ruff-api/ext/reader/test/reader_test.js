'use strict';

var assert = require('assert');
var path = require('path');
var test = require('test');
var trait = require('trait');
var util = require('util');
var EventEmitter = require('events');

var reader = require(path.join(__dirname, '..'));

module.exports = {
    'test should emit events': function () {
        var sources = [new Buffer('abc'), new Buffer('def'), new Error()];
        var sourcesCopy = sources.concat();

        var results = [];

        function Foo() {
            EventEmitter.call(this);
        }

        util.inherits(Foo, EventEmitter);

        Foo.prototype.read = function (callback) {
            var source = sources.shift();

            setTimeout(function () {
                if (source instanceof Error) {
                    callback(source);
                } else {
                    callback(undefined, source);
                }
            }, 0);
        };

        trait.include(Foo, reader);

        var foo = new Foo();

        foo.stream();

        foo.on('data', function (data) {
            assert(!(data instanceof Error), 'data received');
            results.push(data);
        });

        foo.on('error', function (error) {
            assert(error instanceof Error, 'error occurs');
            results.push(error);
        });

        process.on('exit', function () {
            results.forEach(function (result, index) {
                var source = sourcesCopy[index];
                assert.equal(result, source);
            });
        });
    }
};

test.run(module.exports);
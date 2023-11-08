'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var test = require('test');

var Storage = require('../src/storage');

module.exports = {
    'test should get expected value': function () {
        var filePath = path.join(__dirname, './tmp.json');
        var storage = new Storage(filePath);

        storage.set('foo', 'bar');
        assert.equal(storage.get('foo'), 'bar');
        fs.unlinkSync(filePath);
    },

    'test should get default value when query unknown keys': function () {
        var filePath = path.join(__dirname, './tmp.json');
        var storage = new Storage(filePath);

        var defaultValue = 'this is defaule value';
        var value = storage.get('test', defaultValue);

        assert(value, defaultValue);
    },

    'test should delete expected key-value': function () {
        var filePath = path.join(__dirname, './tmp.json');
        var storage = new Storage(filePath);

        storage.set('foo', 1);
        storage.set('bar', 2);

        storage.delete('foo');

        assert(storage.get('foo') === undefined);
        fs.unlinkSync(filePath);
    }
};

test.run(module.exports);

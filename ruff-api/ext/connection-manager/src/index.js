'use strict';

var assert = require('assert');

function checkType(obj, type) {
    assert.ifError(typeof obj !== type && new TypeError('Option `' + obj + '` is expected to be a ' + type));
    return obj;
}

function buildConnectionManager(options) {
    function Constructor() {
        if (arguments[0]) {
            this.addProfile.apply(this, arguments);
        }
    }

    var prototype = Constructor.prototype;

    prototype.addProfile = checkType(options.addProfile, 'function');
    prototype.removeProfile = checkType(options.removeProfile, 'function');
    prototype.getProfile = checkType(options.getProfile, 'function');
    prototype.getNames = checkType(options.getNames, 'function');

    prototype.connect = checkType(options.connect, 'function');
    prototype.disconnect = checkType(options.disconnect, 'function');

    prototype.getStatus = checkType(options.getStatus, 'function');

    var extentions = options.extentions;

    if (extentions) {
        var keys = Object.getOwnPropertyNames(extentions);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var descriptor = Object.getOwnPropertyDescriptor(extentions, key);
            Object.defineProperty(prototype, key, descriptor);
        }
    }

    return Constructor;
}

module.exports = buildConnectionManager;

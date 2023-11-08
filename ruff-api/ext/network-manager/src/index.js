'use strict';

var assert = require('assert');

function checkType(obj, type) {
    assert.ifError(typeof obj !== type && new TypeError('Option `' + obj + '` is expected to be a ' + type));
    return obj;
}

function noOp() { }

function networkManager(options) {
    var init = options.init || noOp;

    function Constructor() {
        init.apply(this, arguments);
    }

    var prototype = Constructor.prototype;

    prototype.init = checkType(init, 'function');
    prototype.addNetwork = checkType(options.addNetwork, 'function');

    prototype.setDefaultNetwork = function (type, name) {
        if (type === undefined) {
            type = 'default';
        } else if (typeof type !== 'string') {
            throw new Error('network type should be a string.');
        }
        var newGateway = this[type].getStatus(name).gateway;
        var oldGateway = this.getDefaultGatewayIp();
        if (newGateway === oldGateway) {
            return;
        }
        if (oldGateway) {
            this.deleteDefaultGatewayIp(oldGateway);
        }
        this.setDefaultGatewayIp(newGateway);
    };

    prototype.setDefaultGatewayIp = checkType(options.setDefaultGatewayIp, 'function');
    prototype.getDefaultGatewayIp = checkType(options.getDefaultGatewayIp, 'function');
    prototype.deleteDefaultGatewayIp = checkType(options.deleteDefaultGatewayIp, 'function');

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

module.exports = networkManager;

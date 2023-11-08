'use strict';

var assert = require('assert');
var test = require('test');

var connectionManager = require('../src/index');

module.exports = {
    'test should create connection': function () {
        var ConnectionManagerConstructor = connectionManager({
            addProfile: Function,
            removeProfile: Function,
            getProfile: Function,
            getNames: Function,
            connect: Function,
            disconnect: Function,
            getStatus: Function
        });

        new ConnectionManagerConstructor();
    },

    'test should invoke expected function': function () {
        var message = {
            addProfile: 'this is addProfile function',
            removeProfile: 'this is removeProfile function',
            getProfile: 'this is getProfile function',
            getNames: 'this is getNames function',
            connect: 'this is connect function',
            disconnect: 'this is disconnect function',
            getStatus: 'this is getStatus function'
        };
        var ConnectionManagerConstructor = connectionManager({
            addProfile: function () {
                return message.addProfile;
            },
            removeProfile: function () {
                return message.removeProfile;
            },
            getProfile: function () {
                return message.getProfile;
            },
            getNames: function () {
                return message.getNames;
            },
            connect: function () {
                return message.connect;
            },
            disconnect: function () {
                return message.disconnect;
            },
            getStatus: function () {
                return message.getStatus;
            }
        });

        var concreteConnection = new ConnectionManagerConstructor();
        assert.equal(concreteConnection.addProfile(), message.addProfile);
        assert.equal(concreteConnection.removeProfile(), message.removeProfile);
        assert.equal(concreteConnection.getProfile(), message.getProfile);
        assert.equal(concreteConnection.getNames(), message.getNames);
        assert.equal(concreteConnection.connect(), message.connect);
        assert.equal(concreteConnection.disconnect(), message.disconnect);
        assert.equal(concreteConnection.getStatus(), message.getStatus);
    }
};

test.run(module.exports);

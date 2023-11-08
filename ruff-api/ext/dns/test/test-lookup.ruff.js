var assert = require('assert');
var dns = require('dns');
var utils = require('./utils');
var test = require('test');

exports['test lookup for single ip'] = function () {
    function fn() {
        var hostname = 'nanchao.org', lookupTimerObject;
        dns.lookup(hostname, null, function (error, address, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(typeof address === 'string');
            assert.ok(address.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test lookup for single ip and hostname be filtered'] = function () {
    function fn() {
        var hostname = 'zhidao.baidu.com', lookupTimerObject;
        dns.lookup(hostname, null, function (error, address, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(typeof address === 'string');
            assert.ok(address.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test addresses.length should > 0 when options.all = true and hostname be filtered'] = function () {
    function fn() {
        var hostname = 'zhidao.baidu.com', lookupTimerObject;
        dns.lookup(hostname, {all: true},function (error, addresses, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(addresses.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test addresses.length should > 0 when options.all = true'] = function () {
    function fn() {
        var hostname = 'baidu.com', lookupTimerObject;
        dns.lookup(hostname, {all: true},function (error, addresses, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(addresses.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test lookup ignore "options" argument'] = function () {
    function fn() {
        var hostname = 'nanchao.org', lookupTimerObject;
        dns.lookup(hostname, function (error, address, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(typeof address === 'string');
            assert.ok(address.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test lookup with family = 4'] = function () {
    function fn() {
        var hostname = 'nanchao.org', lookupTimerObject;
        dns.lookup(hostname, {
            family: 4
        }, function (error, address, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(typeof address === 'string');
            assert.ok(address.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test lookup with options = 4'] = function () {
    function fn() {
        var hostname = 'nanchao.org', lookupTimerObject;
        dns.lookup(hostname, 4, function (error, address, family) {
            clearTimeout(lookupTimerObject);

            assert.equal(error, null);
            assert.ok(typeof address === 'string');
            assert.ok(address.length > 0);
        });

        lookupTimerObject = setTimeout(function () {
            throw new Error('lookup ' + hostname + ' failure.');
        }, 10 * 1000);
    }
    utils.doTest(fn);
};

exports['test should error when lookup with family = 6'] = function () {
    function fn() {
        var hostname = 'nanchao.org';
        assert.throws(function (params) {
            dns.lookup(hostname, {
                family: 6
            }, function (error, address, family) {

            });
        });
    }
    utils.doTest(fn);
};

exports['test should error when lookup with options = 6'] = function () {
    function fn() {
        var hostname = 'nanchao.org';
        assert.throws(function (params) {
            dns.lookup(hostname, 6, function (error, address, family) {

            });
        });
    }
    utils.doTest(fn);
};

test.run(module.exports);
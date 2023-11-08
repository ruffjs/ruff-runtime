var assert = require('assert');
var timers = require('../src/index.js');

module.exports = {
    'test should call nextTick first': function() {
        var callTimes = 0;
        timers.setTimeout(function() {
            assert.equal(callTimes, 1);
            callTimes++;
        }, 0);
        process.nextTick(function() {
            assert.equal(callTimes, 0);
            callTimes++;
        });
        process.on('exit', function() {
            assert.equal(callTimes, 2);
        });
    },
    'test should call nextTick first while complicated situation': function() {
        var callStr = '';
        timers.setTimeout(function() {
            callStr += 'g';
        }, 10);
        timers.setTimeout(function() {
            callStr += 'a';
        }, 0);
        timers.setTimeout(function() {
            callStr += 'b';
        }, 30);
        process.nextTick(function() {
            callStr += 'c';
        });
        timers.setTimeout(function() {
            callStr += 'd';
        }, 10);
        process.nextTick(function() {
            callStr += 'e';
        });
        timers.setTimeout(function() {
            callStr += 'f';
        }, 20);
        process.on('exit', function() {
            assert.equal(callStr, 'ceagdfb');
        });
    }
};

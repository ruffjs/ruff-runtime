/* global $ */

'use strict';

var assert = require('assert');
var mock = require('ruff-mock');

var verify = mock.verify;
var when = mock.when;

var runner = require('../src/index.js');

var appPath = require('path').join(__dirname, 'app');
var syntaxErrorAppPath = require('path').join(__dirname, 'syntax-error-app');
var appjsonErrorAppPath = require('path').join(__dirname, 'appjson-error-app');
var boardErrorAppPath = require('path').join(__dirname, 'board-error-app');
var withoutEndAppPath = require('path').join(__dirname, 'without-end-app');
var withoutReadyAppPath = require('path').join(__dirname, 'without-ready-app');

exports['test should call test function'] = function () {
    var called = false;
    runner.run(appPath, function () {
        when($('#led-r')).turnOff().return();
        called = true;
    });
    assert(called);
};

exports['test should call end'] = function () {
    var called = false;
    runner.run(appPath, function () {
        when($('#led-r')).turnOn().return();
        when($('#led-r')).turnOff().return();
    }).end(function () {
        called = true;
    });
    setTimeout(function () {
        assert(called);
    }, 700);
};

exports['test should pass paramter to run function'] = function () {
    runner.run(appPath, function (a, b, c, d) {
        when($('#led-r')).turnOn().return();
        when($('#led-r')).turnOff().return();

        assert.equal(arguments.length, 6);
        assert.equal(a, 'a');
        assert.equal(b, 'r');
        assert.equal(c, 'g');
        assert.equal(d, 'u');
        assert.equal(arguments[4], 'm');
        assert.equal(arguments[5], 'e');
    }, 'a', 'r', 'g', 'u', 'm', 'e');
};

exports['test should run application'] = function () {
    runner.run(appPath, function () {
        when($('#led-r')).turnOn().return();

        $('#sr501').emit('nearby');
        verify($('#led-r'));

        when($('#led-r')).turnOff().return();
    }).end(function () {
        verify($('#led-r'));
    });
};

exports['test should throw error when driver is not defined'] = function () {
    runner.run(appPath, function () {
        when($('#led-r')).turnOn().return();
        when($('#led-r')).turnOff().return();

        assert.throws(function () {
            $('#sr502').emit('nearby');
        });
    });
};

exports['test should throw error when driver id has no leading #'] = function () {
    runner.run(appPath, function () {
        when($('#led-r')).turnOn().return();
        when($('#led-r')).turnOff().return();

        assert.throws(function () {
            $('sr501');
        });
    });
};

exports['test should throw error when there is syntax error in source'] = function () {
    assert.throws(function () {
        runner.run(syntaxErrorAppPath, function () {
        });
    }, SyntaxError);
};

exports['test should throw error when there is syntax error in app.json'] = function () {
    assert.throws(function () {
        runner.run(appjsonErrorAppPath, function () {
        });
    }, SyntaxError);
};

exports['test should throw error when there is syntax error in board.json'] = function () {
    assert.throws(function () {
        runner.run(boardErrorAppPath, function () {
        });
    }, SyntaxError);
};

exports['test should work without end'] = function () {
    var called = false;
    runner.run(withoutEndAppPath, function () {
        called = true;
    });
    assert(called);
};

exports['test should work without ready'] = function () {
    var called = false;
    runner.run(withoutReadyAppPath, function () {
        called = true;
    });
    assert(called);
};

require('test').run(exports);

var assert = require('assert');

exports['test should throw error'] = function() {
    assert.throws(function() {
        throw new Error('throw error!');
    }, Error);
}

exports['test should have correct error message'] = function() {
    var error = new Error("errorMessage");
    assert.equal(error.message, 'errorMessage');
}

exports['test should have error stack'] = function() {
    var error = new Error("errorMessage");
    assert(error.stack.length > 100);
}

exports['test should call Error.captureStackTrace'] = function() {
    //TODO
    //console.log(Error.captureStackTrace);
}

exports['test should call Error.stackTraceLimit'] = function() {
    //TODO
}

exports['test should have correct rangeError'] = function() {
    assert.throws(function() {
        throw new RangeError('value too large');
    }, RangeError);
}

exports['test should have correct typeError'] = function() {
    assert.throws(function() {
        throw new TypeError('type error');
    }, TypeError);
}

exports['test should have correct referenceError'] = function() {
    assert.throws(function(){
        throw new ReferenceError('reference error');
    }, ReferenceError);
}

exports['test should have correct syntaxError'] = function() {
    assert.throws(function(){
        throw new SyntaxError('syntax error');
    }, SyntaxError);
}

require('test').run(exports);

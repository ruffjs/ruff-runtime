var assert = require('../../assert/src/index.js');

var done = false;
var doneForTest = false;

var beforeEachDone = false;
var afterEachDone = true;

exports.beforeEach = function () {
    beforeEachDone = true;
};

exports.afterEach = function () {
    afterEachDone = true;
};

exports.testRun = function () {
    assert.ok(true, "false");
    // assert.assert(assert.AssertionError instanceof Error);
    assert.equal(true, true, "message");
    assert.notEqual(true, false, "message");
    assert.deepEqual(true, true, "message");
    assert.notDeepEqual(true, false, "message");
    assert.strictEqual(true, true, "message");
    assert.notStrictEqual(true, false, "message");
    assert.throws(function () {
        throw new Error("message");
    }, Error, "message");
    done = true;
}

exports.test = function () {
    doneForTest = true;
};

function isRuffLite() {
    if (global.ruff && ruff.versions && ruff.versions.jerryscript) {
        return true;
    } else {
        return false;
    }
}

if (!isRuffLite()) {
    exports.testSub = require('./test_sub');
    exports.testRequireResolve = require('./test_require_resolve');
}
require('../src/index.js').run(exports);

assert.ok(done, "Normal test should be run");
assert.ok(!doneForTest, "test method should not be run");
if (!isRuffLite()) {
    assert.ok(exports.testSub.done, "sub test method should be run");
}
assert.ok(beforeEachDone, "Before each should be run");
assert.ok(afterEachDone, "After each should be run");

var assert = require('assert');

var callTimes = 0;

process.on('uncaughtException', function() {
    callTimes++;
    process.exit(0);
});

process.on('exit', function(code) {
    assert.equal(code, 0);
    assert.equal(callTimes, 1);
    console.dir('test should catch uncaughtException and do exit with specific code: pass',
                {'colors': true});
});

a.b; //trigger execpion



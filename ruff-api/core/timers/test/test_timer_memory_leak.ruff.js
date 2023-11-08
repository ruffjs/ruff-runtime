var assert = require('assert');
var os = require('os');
var timers = require('timers');

function readablizeBytes(bytes) {
    var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + "" + s[e];
}

exports['_test should print memory use resident_set_memory with uv.run'] = function() {
    console.log('pre mem:' + readablizeBytes(uv.resident_set_memory())); //3.24MB
    console.log('start time:' + Date.now());
    var timer;
    for (var i = 0; i < 10000; i++) {
        var timer = uv.new_timer();
        uv.close(timer);
        uv.run();
    }
    console.log('end time:' + Date.now());
    console.log('post mem:' + readablizeBytes(uv.resident_set_memory())); //3.29MB
    Duktape.gc();
    console.log('after gc mem:' + readablizeBytes(uv.resident_set_memory())); //3.30MB
}

function holdMemory() {
    console.log('pre mem:' + readablizeBytes(uv.resident_set_memory()));
    // console.log('start time:' + Date.now());
    var timer;
    for (var i = 0; i < 10000; i++) {
        var timer = uv.new_timer();
        uv.close(timer);
    }
    // console.log('end time:' + Date.now());
    console.log('post mem:' + readablizeBytes(uv.resident_set_memory()));
}

exports['test should print memory use resident_set_memory'] = function() {
    for (var i = 0; i < 100; i++) {
        timers.setTimeout(holdMemory, 100 * i);
    }
    // console.log('all post mem:' + readablizeBytes(uv.resident_set_memory()));
}

require('test').run(exports);
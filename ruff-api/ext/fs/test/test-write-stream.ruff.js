'use strict';
var assert = require('assert');

var path = require('path');
var fs = require('../src/index.js');
var testDir = path.dirname(this.id);
var file = path.join(testDir, 'file-write.file');

exports['test should call fs.close'] = function () {
    var stream = new fs.WriteStream(file);
    var close = fs.close;

    fs.close = function (fd) {
        assert.ok(fd, 'fs.close must not be called without an undefined fd.');
        fs.close = close;
    };
    stream.destroy();
};

exports['test should not emit drain'] = function () {
    var stream = fs.createWriteStream(file);

    stream.on('drain', function () {
        assert.fail('\'drain\' event must not be emitted before ' +
            'stream.write() has been called at least once.');
    });
    stream.destroy();
};

exports['test should write empty'] = function () {
    var file = path.join(testDir, 'file-write-end-test0.file');
    var stream = fs.createWriteStream(file);
    stream.end();
    stream.on('close', function () {});
};

exports['test should write data'] = function () {
    var file = path.join(testDir, 'file-write-end-test1.file');
    var stream = fs.createWriteStream(file);
    stream.end('a\n', 'utf8');
    stream.on('close', function () {
        var content = fs.readFileSync(file, 'utf8');
        assert.equal(content, 'a\n');
    });
};

exports['test should write data many times'] = function () {
    var file = path.join(testDir, 'file-write-end-test2.file');
    var stream = fs.createWriteStream(file);
    stream.write('first ');
    stream.write('second ');
    stream.end('a\n', 'utf8');
    stream.on('close', function () {
        var content = fs.readFileSync(file, 'utf8');
        assert.equal(content, 'first second a\n');
    });
};

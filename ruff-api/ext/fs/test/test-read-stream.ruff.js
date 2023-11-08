'use strict';
var assert = require('assert');

var path = require('path');
var fs = require('../src/index.js');
var testDir = path.dirname(this.id);
var fn = path.join(testDir, 'file-read.file');
var rangeFile = path.join(testDir, 'file-read-range.file');

var callbacks = {
    open: 0,
    end: 0,
    close: 0
};
var file;
var file3;
exports['test should read data'] = function () {
    var paused = false;

    file = new fs.ReadStream(fn);

    file.on('open', function (fd) {
        file.length = 0;
        callbacks.open++;
        assert.equal('number', typeof fd);
        assert.ok(file.readable);

        // GH-535
        file.pause();
        file.resume();
        file.pause();
        file.resume();
    });

    file.on('data', function (data) {
        assert.ok(data instanceof Buffer);
        assert.ok(!paused);
        file.length += data.length;
        paused = true;
        file.pause();
        setTimeout(function () {
            paused = false;
            file.resume();
        }, 100);
    });

    file.on('end', function (chunk) {
        callbacks.end++;
    });

    file.on('close', function () {
        callbacks.close++;
    });
};

exports['test should read file for string'] = function () {
    file3 = fs.createReadStream(fn, {
        encoding: 'utf8'
    });
    file3.length = 0;
    file3.on('data', function (data) {
        assert.equal('string', typeof data);
        file3.length += data.length;

        for (var i = 0; i < data.length; i++) {
            // http://www.fileformat.info/info/unicode/char/2026/index.htm
            // assert.equal('\u2026', data[i]);
        }
    });

    file3.on('close', function () {
        callbacks.close++;
    });
};

exports['test should run callback already'] = function () {
    process.on('exit', function () {
        assert.equal(1, callbacks.open);
        assert.equal(1, callbacks.end);
        assert.equal(2, callbacks.close);
        assert.equal(12, file.length);
        assert.equal(12, file3.length);
    });
};

exports['test should read prescript data'] = function () {
    var file4 = fs.createReadStream(rangeFile, {
        bufferSize: 1,
        start: 1,
        end: 2
    });
    var contentRead = '';
    file4.on('data', function (data) {
        contentRead += data.toString('utf-8');
    });
    file4.on('end', function () {
        assert.equal(contentRead, 'yz');
    });
};

exports['test should read from prescript position'] = function () {
    var file5 = fs.createReadStream(rangeFile, {
        bufferSize: 1,
        start: 1
    });
    file5.data = '';
    file5.on('data', function (data) {
        file5.data += data.toString('utf-8');
    });
    file5.on('end', function () {
        assert.equal(file5.data, 'yz\n');
    });
};

exports['test should can read float bufferSize'] = function () {
    var file6 = fs.createReadStream(rangeFile, {
        bufferSize: 1.23,
        start: 1
    });
    file6.data = '';
    file6.on('data', function (data) {
        file6.data += data.toString('utf-8');
    });
    file6.on('end', function () {
        assert.equal(file6.data, 'yz\n');
    });
};

exports['test should throw error when read start bigger than end'] = function () {
    assert.throws(function () {
        fs.createReadStream(rangeFile, {
            start: 10,
            end: 2
        });
    }, /must be <=/);
};

exports['test should read one data when start equal end'] = function () {
    var stream = fs.createReadStream(rangeFile, {
        start: 0,
        end: 0
    });
    stream.data = '';

    stream.on('data', function (chunk) {
        stream.data += chunk;
    });

    stream.on('end', function () {
        assert.equal('x', stream.data);
    });
};

exports['test should can resume immediately when pause'] = function () {
    // pause and then resume immediately.
    var pauseRes = fs.createReadStream(rangeFile);
    pauseRes.pause();
    pauseRes.resume();
};

var file7;
var file8;
var file9;

function file7Next() {
    // This will tell us if the fd is usable again or not.
    file7 = fs.createReadStream(null, {
        fd: file7.fd,
        start: 0
    });
    file7.data = '';
    file7.on('data', function (data) {
        file7.data += data;
    });
    file7.on('end', function (err) {
        assert.equal(file7.data, 'xyz\n');
    });
}
exports['test should control close stream'] = function () {
    file7 = fs.createReadStream(rangeFile, {
        autoClose: false
    });
    file7.on('data', function () {});
    file7.on('end', function () {
        process.nextTick(function () {
            assert(!file7.closed);
            assert(!file7.destroyed);
            file7Next();
        });
    });
};

exports['test should emit error when createReadStream fail'] = function () {
    // Just to make sure autoClose won't close the stream because of error.
    file8 = fs.createReadStream(null, {
        fd: 13337,
        autoClose: false
    });
    file8.on('data', function () {});
    file8.on('error', function () {
        // console.log('error : fd is wrong');
    });

    // Make sure stream is destroyed when file does not exist.
    file9 = fs.createReadStream('/path/to/file/that/does/not/exist');
    file9.on('data', function () {});
    file9.on('error', function () {
        // console.log('error : file not exist!');
    });
};

exports['test should have the right state'] = function () {
    process.on('exit', function () {
        assert(file7.closed);
        assert(file7.destroyed);

        assert(!file8.closed);
        assert(!file8.destroyed);
        assert(file8.fd);

        assert(!file9.closed);
        assert(file9.destroyed);
    });
};

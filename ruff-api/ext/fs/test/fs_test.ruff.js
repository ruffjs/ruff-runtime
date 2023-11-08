var fs = require('../src/index.js');
var assert = require('assert');
var path = require('path');
var thisPath = this.id;
var testDir = path.dirname(thisPath);
var fixturesAbsDir = path.join(testDir, 'fixtures');
var writeFile = 'fs_write.test';
var writeSyncFile = 'fs_write_sync.test';
var appendFile = 'fs_append.test';
var appendSyncFile = 'fs_append_sync.test';
var newFile = 'fs_new.test';
var stampFile = 'fs_stamp.test';
var renameFile = 'fs_rename.test';
var renameSyncFile = 'fs_rename_sync.test';
var createDir = 'new_directory';
var rmDir = 'rm_directory';

exports['test should be directory'] = function () {
    var stat = fs.statSync('.');
    assert(stat.isDirectory());
    assert(!stat.isFile());
    assert(!stat.isBlockDevice());
    assert(!stat.isCharacterDevice());
    assert(!stat.isSymbolicLink());
    assert(!stat.isFIFO());
    assert(!stat.isSocket());
};

exports['test should return stat for callback'] = function () {
    fs.stat('.', function (err, stat) {
        assert(stat.isDirectory());
    });
};

exports['test should be directory when call lstatSync'] = function () {
    var stat = fs.lstatSync('.');
    assert(stat.isDirectory());
};

exports['test should return stat for lstat callback'] = function () {
    fs.lstat('.', function (err, stat) {
        assert(stat.isDirectory);
    });
};

exports['test should not throw error when access directory'] = function () {
    fs.access('.', function (err) {});
    fs.accessSync('.');
};

exports['test should return true for callback when file exist'] = function () {
    fs.exists('.', function (isExist) {
        assert(isExist);
    });
};

exports['test should return false for callback when file do not exist'] = function () {
    fs.exists('aaaa', function (isExist) {
        assert(!isExist);
    });
};

exports['test should return true when file exist'] = function () {
    var isExist = fs.existsSync('.');
    assert(isExist);
};

exports['test should return false when file do not exist'] = function () {
    var isExist = fs.existsSync('aaaa');
    assert(!isExist);
};

exports['test should read buffer'] = function () {
    fs.readFile(thisPath, function (err, buffer) {
        assert(!err);
        assert(buffer.length > 0);
    });
};

exports['test should read buffer with sync'] = function () {
    var buffer = fs.readFileSync(thisPath);
    assert(buffer.length > 0);
};

exports['test should write buffer to file'] = function (done) {
    fs.writeFile(writeFile, 'first simple test', function () {
        var buffer = fs.readFileSync(writeFile);
        assert.equal(buffer, 'first simple test');
        fs.unlinkSync(writeFile);
        done();
    });
};

exports['test should write buffer to file with sync'] = function () {
    fs.writeFileSync(writeSyncFile, 'test sync write!');
    var buffer = fs.readFileSync(writeSyncFile);
    assert.equal(buffer, 'test sync write!');
    fs.unlinkSync(writeSyncFile);
};

exports['test should close file after invoke `fs.writeFileSync`'] = function () {
    function next(m) {
        if (!m) {
            return;
        }
        fs.writeFileSync(writeSyncFile, 'test sync write!\n');
        next(m - 1);
    }
    next(1000);
    fs.unlinkSync(writeSyncFile);
};

exports['test should append buffer to file'] = function (done) {
    fs.writeFileSync(appendFile, 'init test');
    fs.appendFile(appendFile, ' append text', function () {
        var buffer = fs.readFileSync(appendFile);
        assert.equal(buffer.toString(), 'init test append text');
        fs.unlinkSync(appendFile);
        done();
    });
};

exports['test should append buffer to file with sync'] = function () {
    fs.writeFileSync(appendSyncFile, 'init test');
    fs.appendFileSync(appendSyncFile, ' append text');
    var buffer = fs.readFileSync(appendSyncFile);
    assert.equal(buffer.toString(), 'init test append text');
    fs.unlinkSync(appendSyncFile);
};

exports['test should close file after invoke `fs.appendFileSync`'] = function () {
    function next(m) {
        if (!m) {
            return;
        }
        fs.appendFileSync(appendSyncFile, 'test sync write!\n');
        next(m - 1);
    }
    next(1000);
    fs.unlinkSync(appendSyncFile);
};

// exports['test should rename file name'] = function() {
//    fs.writeFileSync(newFile, 'test rename');
//    fs.rename(newFile, renameFile, function() {
//        fs.existsSync(renameFile);
//        fs.unlinkSync(renameFile);
//    });
// };

exports['test should rename file with sync'] = function () {
    fs.writeFileSync(newFile, 'test rename');
    fs.renameSync(newFile, renameSyncFile);
    fs.existsSync(renameSyncFile);
    fs.unlinkSync(renameSyncFile);
};

exports['test should create directory'] = function () {
    fs.mkdir(createDir, function () {
        assert(fs.lstatSync(createDir).isDirectory());
        fs.rmdirSync(createDir);
    });
};

exports['test should delete file'] = function () {
    fs.mkdirSync(rmDir);
    fs.rmdir(rmDir, function () {
        assert(!fs.existsSync(rmDir));
    });
};

exports['test should get file real path'] = function () {
    var realPath = fs.realpathSync(thisPath);
    assert.equal(realPath, thisPath);
};

exports['test should open file when mode is null'] = function () {
    var fd = fs.openSync(thisPath, 'r');
    assert.equal(typeof fd, 'number');
};

exports['test should truncateSync'] = function () {
    fs.writeFileSync(newFile, 'test truncateSync');
    fs.truncateSync(newFile, 2);
    var buffer = fs.readFileSync(newFile);
    assert.equal(buffer.toString(), 'te');
    fs.unlinkSync(newFile);
};

exports['test should change file utime and atime'] = function () {
    var atime = new Date(2015, 11, 29, 23, 55, 40);
    var mtime = new Date(2015, 11, 29, 19, 40, 33);
    fs.writeFileSync(stampFile, 'test utime');
    fs.utimesSync(stampFile, atime, mtime);
    assert.equal(fs.lstatSync(stampFile).atime.toString().slice(0, 19), '2015-12-29 23:55:40');
    assert.equal(fs.lstatSync(stampFile).mtime.toString().slice(0, 19), '2015-12-29 19:40:33');
    fs.unlinkSync(stampFile);
};

exports.testReadStream = require('./test-read-stream.js');
exports.testWriteStream = require('./test-write-stream.js');

require('test').run(exports);

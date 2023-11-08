'use strict';

var fs = require('fs');
var path = require('path');

var preCompile = require('./pre-compile');

var EMBEDDED_PREFIX = '~embedded~/';

var ruffModuleDir = process.argv[2];
var targetFileName = process.argv[3];

var fileList = {
    'duktapeExtension.js': 'ruffjs/duktapeExtension.js',
    'module.js': 'ruffjs/module.js',
    'ruffEnvironment.js': 'ruffjs/ruffEnvironment.js',
    'startup.js': 'ruffjs/startup.js',
    'console': 'console/src/index.js',
    'timers': 'timers/src/index.js',
    'interval.js': 'timers/src/interval.js',
    'timer.js': 'timers/src/timer.js',
    'events': 'events/src/index.js',
    'maxListenerHandle.js': 'events/src/maxListenerHandle.js',
    'buffer': 'buffer/src/index.js',
    'util': 'util/src/index.js',
    'path': 'path/src/index.js'
};

function buildContents(fileList) {
    var result = [];
    var fileCount = 0;

    var NAME_LENGTH_BYTES = 1;
    var CONTENT_LENGTH_BYTES = 4;

    function getModuleSourceCode(filename) {
        var relFileName = path.join(ruffModuleDir, filename);
        return fs.readFileSync(relFileName, 'utf-8');
    }

    for (var moduleName in fileList) {
        var filePath = fileList[moduleName];
        var code = getModuleSourceCode(filePath);
        var compressedBytecode = preCompile(code, EMBEDDED_PREFIX + moduleName);

        /*
            filePath length 1 byte
            filePath // Todo: add module-name prefix
            bytecode length 4 byte
            bytecode
        */
        var buffer = new Buffer(NAME_LENGTH_BYTES + moduleName.length + CONTENT_LENGTH_BYTES + compressedBytecode.length);
        var pos = 0;

        buffer.writeUInt8(moduleName.length, pos);

        pos += NAME_LENGTH_BYTES;
        buffer.write(moduleName, pos);

        pos += moduleName.length;
        buffer.writeUInt32BE(compressedBytecode.length, pos);

        pos += CONTENT_LENGTH_BYTES;
        compressedBytecode.copy(buffer, pos);

        result.push(buffer);
        fileCount++;
    }

    return { buffer: Buffer.concat(result), fileCount: fileCount };
}

function writeContents(fileName, buffer) {
    var ret = fs.writeFileSync(fileName, buffer);
    return ret;
}

(function () {
    var contents = buildContents(fileList);

    var fileCountBuf = new Buffer(4);
    fileCountBuf.writeInt32BE(contents.fileCount);

    var contentsLengthBuf = new Buffer(4);
    contentsLengthBuf.writeInt32BE(contents.buffer.length);

    writeContents(targetFileName, contents.buffer);
})();

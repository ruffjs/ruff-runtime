'use strict';

var path = require('path');
var spawnSync = require('child_process').spawnSync;
var zlib = require('zlib');

var compilerFileName = process.platform === 'win32' ? 'ruff-compiler.exe' : 'ruff-compiler';
var compilerPath = path.join(__dirname, '../build/ruff-compiler/bin', compilerFileName);

function compile(code, filename) {
    code = 'function (__filename, __dirname, module, exports, require) {' + code + '\n}';

    var result = spawnSync(compilerPath, [filename], {
        input: code
    });

    if (result.error) {
        throw result.error;
    }

    if (result.status) {
        throw new Error('Invalid exit code ' + result.status);
    }

    return zlib.deflateRawSync(result.stdout);
}

module.exports = compile;

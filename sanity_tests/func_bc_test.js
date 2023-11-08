'use strict';
const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const assert = require('assert');
const compile = require('../tools/pre-compile.js');

let code =
'function hello(a, b, c, d) {' +
'console.log(\'hello lengh in hello\', hello.length);' +
'}' +
'console.log(\'hello.lengh\', hello.length);' +
'hello();';

let bcCode = compile(code, 'test_func_length');
let targetName = path.join(__dirname, 'test_bc.bin');
let bcRunner = path.join(__dirname, 'run_byte.js');
fs.writeFileSync(targetName, bcCode);

let ruffPath = process.argv[2];
let result = spawnSync(ruffPath, [bcRunner, targetName]);

let bcResultStr = result.stdout.toString().trim().replace(/(\r)+/, '');

let expectedStr = 'hello.lengh 4\nhello lengh in hello 4';

process.on('exit', () => fs.unlink(targetName, ()=>{}));
assert.equal(bcResultStr, expectedStr, 'function length not as expected');

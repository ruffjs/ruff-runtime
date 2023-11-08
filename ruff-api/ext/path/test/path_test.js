var path = require('../');
var assert = require('assert');

exports.testBasename = require('./test_basename');
exports.testDirname = require('./test_dirname');
exports.testExtname = require('./test_extname');
exports.testJoin = require('./test_join');
exports.testNormalize = require('./test_normalize');
exports.testResolve = require('./test_resolve');
exports.testIsAbsolute = require('./test_isAbsolute');
exports.testRelative = require('./test_relative');
exports.testSep = require('./test_sep');
exports.testDelimiter = require('./test_delimiter');
exports.testParseFormat = require('./test_parse_format');

require('test').run(exports);

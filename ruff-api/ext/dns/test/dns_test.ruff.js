var test = require('test');

exports.testLookup = require('./test-lookup');
exports.testIpCases = require('./test-ip');
exports.testPacketCase = require('./test-packet');

require('test').run(exports);

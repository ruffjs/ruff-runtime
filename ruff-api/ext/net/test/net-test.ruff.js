exports.testNetAfterClose = require('./test-net-after-close.js');
exports.testNetWriteSlow = require('./test-net-write-and-receive-data-event.js');
exports.testBetterErrorMessagePortHostName = require('./test-net-better-error-messages-port-hostname.js');
exports.testNetBinary = require('./test-net-binary.js');
exports.testNetEndEvent = require('./test-net-end-event.js');
exports.testNetCreation = require('./test-net-creation.js');
exports.testDNSLookup = require('./test-dns-lookup.js');
exports.testServerCanListenConnection = require('./test-server-can-listen-connection.js');

require('test').run(exports);

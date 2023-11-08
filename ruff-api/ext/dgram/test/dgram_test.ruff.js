exports.testBigSizeMessage = require('./test-big-size-message.js');
exports.testBindAddress = require('./test-bind-address.js');
exports.testBindDefaultAddress = require('./test-bind-default-address.js');
exports.testByteLength = require('./test-bytes-length.js');
exports.testNotCallbackWhenClose = require('./test-close-not-callback.js');
exports.testClose = require('./test-close.js');
exports.testEmptyPacket = require('./test-empty-packet.js');
exports.testErrorMessage = require('./test-error-message.js');
exports.testReceiveMessage = require('./test-receive-message.js');
exports.testSendBadArgument = require('./test-send-bad-argument.js');
exports.testSendMessageSize = require('./test-send-message-size.js');

require('test').run(exports);
var testNames = [
    'test-stream-big-packet',
    'test-stream-big-push',
    'test-stream-duplex',
    'test-stream-end-paused',
    'test-stream-ispaused',
    'test-stream-pipe-after-end',
    // 'test-stream-pipe-await-drain',
    // 'test-stream-pipe-cleanup-pause',
    'test-stream-pipe-cleanup',
    'test-stream-pipe-error-handling',
    'test-stream-pipe-event',
    // 'test-stream-pipe-without-listenerCount',
    'test-stream-push-order',
    'test-stream-push-strings',
    'test-stream-readable-constructor-set-methods',
    'test-stream-readable-event',
    'test-stream-readable-flow-recursion',
    'test-stream-transform-constructor-set-methods',
    'test-stream-transform-objectmode-falsey-value',
    'test-stream-transform-split-objectmode',
    'test-stream-unshift-empty-chunk',
    'test-stream-unshift-read-race',
    // 'test-stream-wrap-encoding',
    // 'test-stream-wrap',
    'test-stream-writable-change-default-encoding',
    'test-stream-writable-constructor-set-methods',
    'test-stream-writable-decoded-encoding',
    'test-stream-writable-null',
    'test-stream-writev',
    'test-stream2-base64-single-char-read-end',
    'test-stream2-compatibility',
    'test-stream2-decode-partial',
    'test-stream2-finish-pipe',
    // 'test-stream2-httpclient-response-end',
    'test-stream2-large-read-stall',
    'test-stream2-objects',
    'test-stream2-pipe-error-handling',
    'test-stream2-pipe-error-once-listener',
    'test-stream2-push',
    'test-stream2-read-sync-stack',
    // 'test-stream2-readable-empty-buffer-no-eof',
    'test-stream2-readable-from-list',
    'test-stream2-readable-legacy-drain',
    'test-stream2-readable-non-empty-end',
    'test-stream2-readable-wrap-empty',
    'test-stream2-readable-wrap',
    'test-stream2-set-encoding',
    'test-stream2-transform',
    // 'test-stream2-unpipe-drain',
    'test-stream2-unpipe-leak',
    'test-stream2-writable',
    'test-stream3-pause-then-read'
];

module.exports = testNames.reduce(function (map, name) {
    map[name] = function () {
        require('./' + name + '.js');
    };

    return map;
}, {});

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

require('test').run(module.exports);

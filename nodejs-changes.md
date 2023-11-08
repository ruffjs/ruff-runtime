# Node.js Changes Synchronization

<!-- since-version: 12.9.0 -->

The latest synchronized version is 12.9.0.

## Changes List

<!-- changes-list -->

### Version 12.9.0

- [ ] **- version** crypto.privateDecrypt(privateKey, buffer) [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/crypto.md#cryptoprivatedecryptprivatekey-buffer)
- [ ] **- version** crypto.publicEncrypt(key, buffer) [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/crypto.md#cryptopublicencryptkey-buffer)
- [ ] **added** fs.writev(fd, buffers[, position], callback) [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/fs.md#fswritevfd-buffers-position-callback)
- [ ] **added** fs.writevSync(fd, buffers[, position]) [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/fs.md#fswritevsyncfd-buffers-position)
- [ ] **added** filehandle.writev(buffers[, position]) [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/fs.md#filehandlewritevbuffers-position)
- [ ] **added** request.writableEnded [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/http.md#requestwritableended)
- [ ] **added** response.writableEnded [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/http.md#responsewritableended)
- [ ] **added** response.writableEnded [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/http2.md#responsewritableended)
- [ ] **added** writable.writableEnded [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/stream.md#writablewritableended)
- [ ] **added** readable.readableEnded [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/stream.md#readablereadableended)
- [ ] **- version** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.9.0/doc/api/tls.md#tlsconnectoptions-callback)

### Version 12.8.0

- [ ] **- version** crypto.createHash(algorithm[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatehashalgorithm-options)
- [ ] **- version** crypto.scrypt(password, salt, keylen[, options], callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptoscryptpassword-salt-keylen-options-callback)
- [ ] **- version** crypto.scryptSync(password, salt, keylen[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptoscryptsyncpassword-salt-keylen-options)
- [ ] **- version** DEP0089: require('assert') [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0089-requireassert)
- [ ] **added** napi_set_instance_data [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/n-api.md#napi_set_instance_data)
- [ ] **added** napi_get_instance_data [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/n-api.md#napi_get_instance_data)
- [ ] **added** v8.getHeapCodeStatistics() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/v8.md#v8getheapcodestatistics)

### Version 12.7.0

- [ ] **added** `--experimental-exports` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--experimental-exports)
- [ ] **added** `--policy-integrity=sri` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--policy-integritysri)
- [ ] **added** response.writableFinished [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http.md#responsewritablefinished)
- [ ] **added** inspector.waitForDebugger() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/inspector.md#inspectorwaitfordebugger)
- [ ] **- version** readline.clearLine(stream, dir[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/readline.md#readlineclearlinestream-dir-callback)
- [ ] **- version** readline.clearScreenDown(stream[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/readline.md#readlineclearscreendownstream-callback)
- [ ] **- version** readline.cursorTo(stream, x, y[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/readline.md#readlinecursortostream-x-y-callback)
- [ ] **- version** readline.moveCursor(stream, dx, dy[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/readline.md#readlinemovecursorstream-dx-dy-callback)
- [ ] **added** readable.readableEncoding [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#readablereadableencoding)
- [ ] **- version** writeStream.clearLine(dir[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tty.md#writestreamclearlinedir-callback)
- [ ] **- version** writeStream.clearScreenDown([callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tty.md#writestreamclearscreendowncallback)
- [ ] **- version** writeStream.cursorTo(x, y[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tty.md#writestreamcursortox-y-callback)
- [ ] **- version** writeStream.moveCursor(dx, dy[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tty.md#writestreammovecursordx-dy-callback)

### Version 12.6.0

- [ ] **- version** napi_create_threadsafe_function [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/n-api.md#napi_create_threadsafe_function)
- [ ] **added** process.resourceUsage() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processresourceusage)
- [ ] **added** writable.writableFinished [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#writablewritablefinished)

### Version 12.5.0

- [ ] **- version** DEP0132: worker.terminate() with callback [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0132-workerterminate-with-callback)
- [ ] **- version** new Agent([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/https.md#new-agentoptions)
- [ ] **- version** worker.terminate() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/worker_threads.md#workerterminate)

### Version 12.4.0

- [ ] **added** `--heap-prof` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--heap-prof)
- [ ] **added** `--heap-prof-dir` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--heap-prof-dir)
- [ ] **added** `--heap-prof-interval` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--heap-prof-interval)
- [ ] **added** `--heap-prof-name` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--heap-prof-name)
- [ ] **added** `--http-server-default-timeout=milliseconds` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--http-server-default-timeoutmilliseconds)
- [ ] **- version** http2.createServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http2.md#http2createserveroptions-onrequesthandler)
- [ ] **- version** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlsconnectoptions-callback)

### Version 12.3.0

- [ ] **added** `--experimental-wasm-modules` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--experimental-wasm-modules)
- [ ] **- version** DEP0131: Legacy HTTP parser [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0131-legacy-http-parser)
- [ ] **- version** Global Uncaught Exceptions [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/repl.md#global-uncaught-exceptions)
- [ ] **added** writable.writableObjectMode [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#writablewritableobjectmode)
- [ ] **added** readable.readableObjectMode [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#readablereadableobjectmode)
- [ ] **added** stream.Readable.from(iterable, [options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#streamreadablefromiterable-options)
- [ ] **added** Event: 'keylog' [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#event-keylog)
- [ ] **added** Event: 'keylog' [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#event-keylog-1)
- [ ] **- version** tls.createServer([options][, secureConnectionListener]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlscreateserveroptions-secureconnectionlistener)
- [ ] **added** tls.rootCertificates [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlsrootcertificates)
- [ ] **added** worker.receiveMessageOnPort(port) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/worker_threads.md#workerreceivemessageonportport)

### Version 12.2.0

- [ ] **added** `--cpu-prof-interval` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--cpu-prof-interval)
- [ ] **added** `--tls-min-v1.2` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--tls-min-v12)
- [ ] **added** `--trace-tls` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--trace-tls)
- [ ] **- version** DEP0130: Module.createRequireFromPath() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0130-modulecreaterequirefrompath)
- [ ] **added** module.createRequire(filename) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/modules.md#modulecreaterequirefilename)
- [ ] **deprecated** module.createRequireFromPath(filename) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/modules.md#modulecreaterequirefrompathfilename)
- [ ] **- version** new tls.TLSSocket(socket[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#new-tlstlssocketsocket-options)
- [ ] **added** tlsSocket.enableTrace() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlssocketenabletrace)
- [ ] **- version** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlsconnectoptions-callback-1)

### Version 12.0.0

- [ ] **- version** assert.deepEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/assert.md#assertdeepequalactual-expected-message)
- [ ] **added** buf.readBigInt64LE([offset]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/buffer.md#bufreadbigint64leoffset)
- [ ] **added** buf.readBigUInt64LE([offset]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/buffer.md#bufreadbiguint64leoffset)
- [ ] **added** buf.writeBigInt64LE(value[, offset]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/buffer.md#bufwritebigint64levalue-offset)
- [ ] **added** buf.writeBigUInt64LE(value[, offset]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/buffer.md#bufwritebiguint64levalue-offset)
- [ ] **added** `--cpu-prof` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--cpu-prof)
- [ ] **added** `--cpu-prof-dir` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--cpu-prof-dir)
- [ ] **added** `--cpu-prof-name` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--cpu-prof-name)
- [ ] **added** `--es-module-specifier-resolution=mode` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--es-module-specifier-resolutionmode)
- [ ] **added** `--heapsnapshot-signal=signal` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--heapsnapshot-signalsignal)
- [ ] **added** `--input-type=type` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--input-typetype)
- [ ] **- version** `--report-directory=directory` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-directorydirectory-1)
- [ ] **- version** `--report-filename=filename` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-filenamefilename-1)
- [ ] **- version** `--report-on-fatalerror` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-on-fatalerror-1)
- [ ] **- version** `--report-on-signal` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-on-signal-1)
- [ ] **- version** `--report-signal=signal` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-signalsignal-1)
- [ ] **- version** `--report-uncaught-exception` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-uncaught-exception-1)
- [ ] **added** `--tls-max-v1.2` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--tls-max-v12)
- [ ] **added** `--tls-max-v1.3` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--tls-max-v13)
- [ ] **added** `--tls-min-v1.0` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--tls-min-v10)
- [ ] **added** `--tls-min-v1.1` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--tls-min-v11)
- [ ] **added** `--tls-min-v1.3` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--tls-min-v13)
- [ ] **added** `--unhandled-rejections=mode` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--unhandled-rejectionsmode)
- [ ] **- version** keyObject.asymmetricKeyType [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectasymmetrickeytype-1)
- [ ] **- version** keyObject.asymmetricKeyType [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectasymmetrickeytype-2)
- [ ] **- version** keyObject.asymmetricKeyType [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectasymmetrickeytype-3)
- [ ] **- version** keyObject.asymmetricKeyType [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectasymmetrickeytype-4)
- [ ] **- version** sign.sign(privateKey[, outputEncoding]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#signsignprivatekey-outputencoding)
- [ ] **- version** verify.verify(object, signature[, signatureEncoding]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#verifyverifyobject-signature-signatureencoding)
- [ ] **- version** crypto.generateKeyPair(type, options, callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptogeneratekeypairtype-options-callback)
- [ ] **- version** crypto.generateKeyPair(type, options, callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptogeneratekeypairtype-options-callback-1)
- [ ] **- version** crypto.generateKeyPairSync(type, options) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptogeneratekeypairsynctype-options)
- [ ] **added** crypto.sign(algorithm, data, key) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptosignalgorithm-data-key)
- [ ] **added** crypto.verify(algorithm, data, key, signature) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptoverifyalgorithm-data-key-signature)
- [ ] **- version** DEP0006: child\_process options.customFds [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0006-child_process-optionscustomfds)
- [ ] **- version** DEP0019: require('.') resolved outside directory [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0019-require-resolved-outside-directory)
- [ ] **- version** DEP0021: Server.listenFD [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0021-serverlistenfd)
- [ ] **- version** DEP0023: os.getNetworkInterfaces() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0023-osgetnetworkinterfaces)
- [ ] **- version** DEP0026: util.print() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0026-utilprint)
- [ ] **- version** DEP0027: util.puts() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0027-utilputs)
- [ ] **- version** DEP0028: util.debug() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0028-utildebug)
- [ ] **- version** DEP0029: util.error() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0029-utilerror)
- [ ] **- version** DEP0062: node --debug [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0062-node---debug)
- [ ] **- version** DEP0066: OutgoingMessage.prototype.\_headers, OutgoingMessage.prototype.\_headerNames [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0066-outgoingmessageprototype_headers-outgoingmessageprototype_headernames)
- [ ] **- version** DEP0084: requiring bundled internal dependencies [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0084-requiring-bundled-internal-dependencies)
- [ ] **- version** DEP0098: AsyncHooks Embedder AsyncResource.emitBefore and AsyncResource.emitAfter APIs [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0098-asynchooks-embedder-asyncresourceemitbefore-and-asyncresourceemitafter-apis)
- [ ] **- version** DEP0113: Cipher.setAuthTag(), Decipher.getAuthTag() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0113-ciphersetauthtag-deciphergetauthtag)
- [ ] **- version** DEP0114: crypto._toBuf() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0114-crypto_tobuf)
- [ ] **- version** DEP0117: Native crypto handles [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0117-native-crypto-handles)
- [ ] **- version** DEP0120: Windows Performance Counter Support [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0120-windows-performance-counter-support)
- [ ] **- version** DEP0121: net._setSimultaneousAccepts() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0121-net_setsimultaneousaccepts)
- [ ] **- version** DEP0122: tls Server.prototype.setOptions() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0122-tls-serverprototypesetoptions)
- [ ] **- version** DEP0123: setting the TLS ServerName to an IP address [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0123-setting-the-tls-servername-to-an-ip-address)
- [ ] **- version** DEP0124: using REPLServer.rli [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0124-using-replserverrli)
- [ ] **- version** DEP0125: require('\_stream\_wrap') [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0125-require_stream_wrap)
- [ ] **- version** DEP0128: modules with an invalid `main` entry and an `index.js` file [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0128-modules-with-an-invalid-main-entry-and-an-indexjs-file)
- [ ] **added** Event: 'connect' [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/dgram.md#event-connect)
- [ ] **added** socket.connect(port[, address][, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/dgram.md#socketconnectport-address-callback)
- [ ] **added** socket.disconnect() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/dgram.md#socketdisconnect)
- [ ] **added** socket.remoteAddress() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/dgram.md#socketremoteaddress)
- [ ] **- version** socket.send(msg[, offset, length][, port][, address][, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/dgram.md#socketsendmsg-offset-length-port-address-callback)
- [ ] **- version** MODULE_NOT_FOUND [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/errors.md#module_not_found)
- [ ] **- version** fs.symlink(target, path[, type], callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#fssymlinktarget-path-type-callback)
- [ ] **- version** fs.symlinkSync(target, path[, type]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#fssymlinksynctarget-path-type)
- [ ] **- version** Event: 'clientError' [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http.md#event-clienterror)
- [ ] **- version** Event: 'uncaughtException' [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#event-uncaughtexception)
- [ ] **- version** repl.start([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/repl.md#replstartoptions)
- [ ] **- version** tlsSocket.getCipher() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlssocketgetcipher)
- [ ] **- version** tls.createSecureContext([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlscreatesecurecontextoptions)
- [ ] **- version** util.format(format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilformatformat-args-1)
- [ ] **- version** util.format(format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilformatformat-args-2)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-2)

### Version 11.14.0

- [ ] **- version** DEP0126: timers.active() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0126-timersactive)
- [ ] **- version** DEP0127: timers._unrefActive() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0127-timers_unrefactive)
- [ ] **- version** DEP0129: ChildProcess._channel [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0129-childprocess_channel)
- [ ] **- version** process.env [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processenv)
- [ ] **- version** rl\[Symbol.asyncIterator\]() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/readline.md#rlsymbolasynciterator-1)
- [ ] **- version** readable\[Symbol.asyncIterator\]() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#readablesymbolasynciterator)
- [ ] **added** worker.SHARE_ENV [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/worker_threads.md#workershare_env)

### Version 11.13.0

- [ ] **- version** Class: KeyObject [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#class-keyobject-1)
- [ ] **- version** crypto.createPublicKey(key) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatepublickeykey-1)
- [ ] **added** events.once(emitter, name) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/events.md#eventsonceemitter-name)
- [ ] **added** writeStream.hasColors([count][, env]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tty.md#writestreamhascolorscount-env)
- [ ] **added** v8.getHeapSnapshot() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/v8.md#v8getheapsnapshot)
- [ ] **added** v8.writeHeapSnapshot([filename]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/v8.md#v8writeheapsnapshotfilename)
- [ ] **added** worker.moveMessagePortToContext(port, contextifiedSandbox) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/worker_threads.md#workermovemessageporttocontextport-contextifiedsandbox)

### Version 11.12.0

- [ ] **added** `--frozen-intrinsics` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--frozen-intrinsics)
- [ ] **- version** DEP0111: process.binding() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0111-processbinding)
- [ ] **removed** ERR_CLOSED_MESSAGE_PORT [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/errors.md#err_closed_message_port)
- [ ] **added** process.report.directory [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportdirectory)
- [ ] **added** process.report.filename [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportfilename)
- [ ] **added** process.report.reportOnFatalError [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportreportonfatalerror)
- [ ] **added** process.report.reportOnSignal [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportreportonsignal)
- [ ] **added** process.report.reportOnUncaughtException [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportreportonuncaughtexception)
- [ ] **added** process.report.signal [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportsignal)

### Version 11.11.0

- [ ] **added** napi_create_date [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/n-api.md#napi_create_date)
- [ ] **added** napi_get_date_value [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/n-api.md#napi_get_date_value)
- [ ] **added** napi_is_date [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/n-api.md#napi_is_date)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-1)

### Version 11.10.0

- [ ] **- version** response.writeHead(statusCode[, statusMessage][, headers]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http.md#responsewriteheadstatuscode-statusmessage-headers)
- [ ] **- version** response.writeHead(statusCode[, statusMessage][, headers]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http2.md#responsewriteheadstatuscode-statusmessage-headers)
- [ ] **added** perf_hooks.monitorEventLoopDelay([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#perf_hooksmonitoreventloopdelayoptions)
- [ ] **added** Class: Histogram [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#class-histogram)
- [ ] **added** histogram.disable() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogramdisable)
- [ ] **added** histogram.enable() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogramenable)
- [ ] **added** histogram.exceeds [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogramexceeds)
- [ ] **added** histogram.max [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogrammax)
- [ ] **added** histogram.mean [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogrammean)
- [ ] **added** histogram.min [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogrammin)
- [ ] **added** histogram.percentile(percentile) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogrampercentilepercentile)
- [ ] **added** histogram.percentiles [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogrampercentiles)
- [ ] **added** histogram.reset() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogramreset)
- [ ] **added** histogram.stddev [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/perf_hooks.md#histogramstddev)
- [ ] **added** replServer.setupHistory(historyPath, callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/repl.md#replserversetuphistoryhistorypath-callback)
- [ ] **added** Event: 'session' [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#event-session)

### Version 11.8.0

- [ ] **added** `--experimental-policy` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--experimental-policy)
- [ ] **added** `--experimental-report` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--experimental-report)
- [ ] **added** `--report-directory=directory` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-directorydirectory)
- [ ] **added** `--report-filename=filename` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-filenamefilename)
- [ ] **added** `--report-on-fatalerror` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-on-fatalerror)
- [ ] **added** `--report-on-signal` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-on-signal)
- [ ] **added** `--report-signal=signal` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-signalsignal)
- [ ] **added** `--report-uncaught-exception` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--report-uncaught-exception)
- [ ] **added** process.report [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreport)
- [ ] **added** process.report.getReport([err]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportgetreporterr)
- [ ] **added** process.report.writeReport([filename][, err]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/process.md#processreportwritereportfilename-err)
- [ ] **- version** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlsconnectoptions-callback-2)

### Version 11.7.0

- [ ] **- version** new Console(options) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/console.md#new-consoleoptions)
- [ ] **- version** verify.verify(object, signature[, signatureEncoding]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#verifyverifyobject-signature-signatureencoding-1)
- [ ] **- version** crypto.createPublicKey(key) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatepublickeykey-2)
- [ ] **removed** ERR_UNKNOWN_STDIN_TYPE [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/errors.md#err_unknown_stdin_type)
- [ ] **removed** ERR_UNKNOWN_STREAM_TYPE [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/errors.md#err_unknown_stream_type)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-3)
- [ ] **added** Brotli constants [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#brotli-constants)
- [ ] **added** Class: BrotliOptions [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#class-brotlioptions)
- [ ] **added** Class: zlib.BrotliCompress [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#class-zlibbrotlicompress)
- [ ] **added** Class: zlib.BrotliDecompress [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#class-zlibbrotlidecompress)
- [ ] **- version** Class: zlib.ZlibBase [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#class-zlibzlibbase)
- [ ] **added** zlib.createBrotliCompress([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#zlibcreatebrotlicompressoptions)
- [ ] **added** zlib.createBrotliDecompress([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#zlibcreatebrotlidecompressoptions)
- [ ] **added** zlib.brotliCompress(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#zlibbrotlicompressbuffer-options-callback)
- [ ] **added** zlib.brotliCompressSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#zlibbrotlicompresssyncbuffer-options)
- [ ] **added** zlib.brotliDecompress(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#zlibbrotlidecompressbuffer-options-callback)
- [ ] **added** zlib.brotliDecompressSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/zlib.md#zlibbrotlidecompresssyncbuffer-options)

### Version 11.6.0

- [ ] **added** `--max-http-header-size=size` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--max-http-header-sizesize)
- [ ] **added** Class: KeyObject [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#class-keyobject)
- [ ] **added** keyObject.asymmetricKeyType [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectasymmetrickeytype)
- [ ] **added** keyObject.export([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectexportoptions)
- [ ] **added** keyObject.symmetricKeySize [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjectsymmetrickeysize)
- [ ] **added** keyObject.type [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#keyobjecttype)
- [ ] **- version** sign.sign(privateKey[, outputEncoding]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#signsignprivatekey-outputencoding-1)
- [ ] **- version** crypto.createCipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatecipherivalgorithm-key-iv-options)
- [ ] **- version** crypto.createDecipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatedecipherivalgorithm-key-iv-options)
- [ ] **- version** crypto.createHmac(algorithm, key[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatehmacalgorithm-key-options)
- [ ] **added** crypto.createPrivateKey(key) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreateprivatekeykey)
- [ ] **added** crypto.createPublicKey(key) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatepublickeykey)
- [ ] **added** crypto.createSecretKey(key) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatesecretkeykey)
- [ ] **- version** crypto.generateKeyPair(type, options, callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptogeneratekeypairtype-options-callback-2)
- [ ] **- version** crypto.generateKeyPairSync(type, options) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptogeneratekeypairsynctype-options-1)
- [ ] **- version** crypto.privateDecrypt(privateKey, buffer) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptoprivatedecryptprivatekey-buffer)
- [ ] **- version** crypto.privateEncrypt(privateKey, buffer) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptoprivateencryptprivatekey-buffer)
- [ ] **- version** crypto.publicDecrypt(key, buffer) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptopublicdecryptkey-buffer)
- [ ] **- version** crypto.publicEncrypt(key, buffer) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptopublicencryptkey-buffer)
- [ ] **added** http.maxHeaderSize [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http.md#httpmaxheadersize)

### Version 11.5.0

- [ ] **- version** tls.createSecureContext([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlscreatesecurecontextoptions-1)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-4)

### Version 11.4.0

- [ ] **added** `--http-parser=library` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/cli.md#--http-parserlibrary)
- [ ] **- version** dgram.createSocket(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/dgram.md#dgramcreatesocketoptions-callback)
- [ ] **- version** HPE_HEADER_OVERFLOW [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/errors.md#hpe_header_overflow)
- [ ] **- version** server.listen(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/net.md#serverlistenoptions-callback)
- [ ] **added** rl\[Symbol.asyncIterator\]() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/readline.md#rlsymbolasynciterator)
- [ ] **added** writable.writable [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#writablewritable)
- [ ] **added** readable.readable [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#readablereadable)
- [ ] **- version** Certificate Object [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#certificate-object)
- [ ] **- version** tls.createSecureContext([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlscreatesecurecontextoptions-2)
- [ ] **added** tls.DEFAULT_MAX_VERSION [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlsdefault_max_version)
- [ ] **added** tls.DEFAULT_MIN_VERSION [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlsdefault_min_version)
- [ ] **- version** util.format(format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilformatformat-args)
- [ ] **- version** util.format(format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilformatformat-args-3)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-5)

### Version 11.3.0

- [ ] **added** server.headersTimeout [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http.md#serverheaderstimeout)
- [ ] **added** server.headersTimeout [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/https.md#serverheaderstimeout)

### Version 11.2.0

- [ ] **- version** crypto.createCipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatecipherivalgorithm-key-iv-options-1)
- [ ] **- version** crypto.createDecipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#cryptocreatedecipherivalgorithm-key-iv-options-1)
- [ ] **added** readStream.pending [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#readstreampending)
- [ ] **added** writeStream.pending [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#writestreampending)
- [ ] **added** http2stream.bufferSize [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http2.md#http2streambuffersize)
- [ ] **added** socket.pending [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/net.md#socketpending)
- [ ] **- version** Constructor: new stream.Writable([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#constructor-new-streamwritableoptions)
- [ ] **- version** new stream.Readable([options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/stream.md#new-streamreadableoptions)
- [ ] **added** tlsSocket.getCertificate() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#tlssocketgetcertificate)

### Version 11.1.0

- [ ] **- version** fs.open(path[, flags[, mode]], callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#fsopenpath-flags-mode-callback)
- [ ] **- version** fs.openSync(path[, flags, mode]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#fsopensyncpath-flags-mode)
- [ ] **- version** fsPromises.open(path, flags[, mode]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#fspromisesopenpath-flags-mode)

### Version 11.0.0

- [ ] **- version** buf.fill(value[, offset[, end]][, encoding]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/buffer.md#buffillvalue-offset-end-encoding)
- [ ] **- version** decipher.setAuthTag(buffer) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/crypto.md#deciphersetauthtagbuffer)
- [ ] **- version** DEP0009: crypto.pbkdf2 without digest [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0009-cryptopbkdf2-without-digest)
- [ ] **- version** DEP0010: crypto.createCredentials [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0010-cryptocreatecredentials)
- [ ] **- version** DEP0011: crypto.Credentials [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0011-cryptocredentials)
- [ ] **- version** DEP0061: fs.SyncWriteStream [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0061-fssyncwritestream)
- [ ] **- version** DEP0079: Custom inspection function on Objects via .inspect() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0079-custom-inspection-function-on-objects-via-inspect)
- [ ] **- version** DEP0090: Invalid GCM authentication tag lengths [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0090-invalid-gcm-authentication-tag-lengths)
- [ ] **- version** DEP0105: decipher.finaltol [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0105-decipherfinaltol)
- [ ] **- version** DEP0106: crypto.createCipher and crypto.createDecipher [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0106-cryptocreatecipher-and-cryptocreatedecipher)
- [ ] **- version** DEP0107: tls.convertNPNProtocols() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0107-tlsconvertnpnprotocols)
- [ ] **- version** DEP0108: zlib.bytesRead [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0108-zlibbytesread)
- [ ] **- version** DEP0109: http, https, and tls support for invalid URLs [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0109-http-https-and-tls-support-for-invalid-urls)
- [ ] **- version** DEP0112: dgram private APIs [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0112-dgram-private-apis)
- [ ] **- version** DEP0113: Cipher.setAuthTag(), Decipher.getAuthTag() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0113-ciphersetauthtag-deciphergetauthtag-1)
- [ ] **- version** DEP0114: crypto._toBuf() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0114-crypto_tobuf-1)
- [ ] **- version** DEP0115: crypto.prng(), crypto.pseudoRandomBytes(), crypto.rng() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0115-cryptoprng-cryptopseudorandombytes-cryptorng)
- [ ] **- version** DEP0116: Legacy URL API [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0116-legacy-url-api)
- [ ] **- version** DEP0117: Native crypto handles [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0117-native-crypto-handles-1)
- [ ] **- version** DEP0118: dns.lookup() support for a falsy hostname [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0118-dnslookup-support-for-a-falsy-hostname)
- [ ] **- version** DEP0119: process.binding('uv').errname() private API [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0119-processbindinguverrname-private-api)
- [ ] **- version** DEP0120: Windows Performance Counter Support [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/deprecations.md#dep0120-windows-performance-counter-support-1)
- [ ] **removed** ERR_INDEX_OUT_OF_RANGE [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/errors.md#err_index_out_of_range)
- [ ] **- version** fs.createReadStream(path[, options]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/fs.md#fscreatereadstreampath-options)
- [ ] **added** queueMicrotask(callback) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/globals.md#queuemicrotaskcallback)
- [ ] **added** TextDecoder [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/globals.md#textdecoder)
- [ ] **added** TextEncoder [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/globals.md#textencoder)
- [ ] **- version** request.aborted [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/http.md#requestaborted)
- [ ] **added** immediate.hasRef() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/timers.md#immediatehasref)
- [ ] **added** timeout.hasRef() [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/timers.md#timeouthasref)
- [ ] **added** server.setSecureContext(options) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/tls.md#serversetsecurecontextoptions)
- [ ] **- version** Legacy `urlObject` [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/url.md#legacy-urlobject)
- [ ] **- version** url.format(urlObject) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/url.md#urlformaturlobject)
- [ ] **- version** url.parse(urlString[, parseQueryString[, slashesDenoteHost]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/url.md#urlparseurlstring-parsequerystring-slashesdenotehost)
- [ ] **- version** url.resolve(from, to) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/url.md#urlresolvefrom-to)
- [ ] **- version** util.format(format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilformatformat-args-4)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-6)
- [ ] **- version** util.inspect(object[, showHidden[, depth[, colors]]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#utilinspectobject-showhidden-depth-colors-7)
- [ ] **- version** new TextDecoder([encoding[, options]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#new-textdecoderencoding-options)
- [ ] **pr-url** new TextDecoder([encoding[, options]]) [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#new-textdecoderencoding-options-1)
- [ ] **- version** Class: util.TextEncoder [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#class-utiltextencoder)
- [ ] **pr-url** Class: util.TextEncoder [[+]](https://github.com/nodejs/node/blob/v12.8.0/doc/api/util.md#class-utiltextencoder-1)

### Version 10.5.0

- [ ] **added** crypto.scrypt(password, salt, keylen[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptoscryptpassword-salt-keylen-options-callback)
- [ ] **added** crypto.scryptSync(password, salt, keylen[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptoscryptsyncpassword-salt-keylen-options)
- [ ] **- version** fs.fstat(fd[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfstatfd-options-callback-1)
- [ ] **- version** fs.fstatSync(fd[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfstatsyncfd-options)
- [ ] **- version** fs.lstat(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fslstatpath-options-callback-1)
- [ ] **- version** fs.lstatSync(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fslstatsyncpath-options)
- [ ] **- version** fs.stat(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsstatpath-options-callback-1)
- [ ] **- version** fs.statSync(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsstatsyncpath-options)
- [ ] **- version** filehandle.stat([options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlestatoptions-1)
- [ ] **- version** fsPromises.lstat(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseslstatpath-options-1)
- [ ] **- version** fsPromises.stat(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesstatpath-options-1)
- [ ] **added** worker.isMainThread [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerismainthread)
- [ ] **added** worker.parentPort [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerparentport)
- [ ] **added** worker.threadId [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerthreadid)
- [ ] **added** worker.workerData [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerworkerdata)
- [ ] **added** Class: MessageChannel [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#class-messagechannel)
- [ ] **added** Class: MessagePort [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#class-messageport)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#event-close)
- [ ] **added** Event: 'message' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#event-message)
- [ ] **added** port.close() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#portclose)
- [ ] **added** port.postMessage(value[, transferList]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#portpostmessagevalue-transferlist)
- [ ] **added** port.ref() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#portref)
- [ ] **added** port.start() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#portstart)
- [ ] **added** port.unref() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#portunref)
- [ ] **added** Class: Worker [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#class-worker)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#event-error)
- [ ] **added** Event: 'exit' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#event-exit)
- [ ] **added** Event: 'message' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#event-message-1)
- [ ] **added** Event: 'online' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#event-online)
- [ ] **added** worker.postMessage(value[, transferList]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerpostmessagevalue-transferlist)
- [ ] **added** worker.ref() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerref)
- [ ] **added** worker.stderr [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerstderr)
- [ ] **added** worker.stdin [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerstdin)
- [ ] **added** worker.stdout [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerstdout)
- [ ] **added** worker.terminate([callback]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerterminatecallback)
- [ ] **added** worker.threadId [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerthreadid-1)
- [ ] **added** worker.unref() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/worker_threads.md#workerunref)

### Version 10.2.0

- [ ] **- version** assert.throws(block[, error][, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertthrowsblock-error-message)
- [ ] **added** `--preserve-symlinks-main` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/cli.md#--preserve-symlinks-main)
- [ ] **- version** crypto.createCipher(algorithm, password[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatecipheralgorithm-password-options-1)
- [ ] **- version** crypto.createCipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatecipherivalgorithm-key-iv-options)
- [ ] **- version** crypto.createDecipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatedecipherivalgorithm-key-iv-options)
- [ ] **added** napi_add_env_cleanup_hook [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/n-api.md#napi_add_env_cleanup_hook)
- [ ] **added** napi_remove_env_cleanup_hook [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/n-api.md#napi_remove_env_cleanup_hook)
- [ ] **added** timeout.refresh() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/timers.md#timeoutrefresh)

### Version 10.1.0

- [ ] **added** message.aborted [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#messageaborted)
- [ ] **added** request.aborted [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#requestaborted)

### Version 10.0.0

- [ ] **added** assert.doesNotReject(block[, error][, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertdoesnotrejectblock-error-message)
- [ ] **- version** assert.fail(actual, expected[, message[, operator[, stackStartFunction]]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertfailactual-expected-message-operator-stackstartfunction)
- [ ] **- version** assert.ifError(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertiferrorvalue)
- [ ] **- version** assert.ifError(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertiferrorvalue-1)
- [ ] **- version** assert.notStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertnotstrictequalactual-expected-message)
- [ ] **- version** assert.ok(value[, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertokvalue-message)
- [ ] **added** assert.rejects(block[, error][, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertrejectsblock-error-message)
- [ ] **- version** assert.strictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertstrictequalactual-expected-message)
- [ ] **- version** new Buffer(array) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#new-bufferarray)
- [ ] **- version** new Buffer(arrayBuffer[, byteOffset[, length]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#new-bufferarraybuffer-byteoffset-length)
- [ ] **- version** new Buffer(buffer) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#new-bufferbuffer)
- [ ] **- version** new Buffer(size) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#new-buffersize)
- [ ] **- version** new Buffer(string[, encoding]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#new-bufferstring-encoding)
- [ ] **- version** Class Method: Buffer.alloc(size[, fill[, encoding]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#class-method-bufferallocsize-fill-encoding)
- [ ] **- version** Class Method: Buffer.alloc(size[, fill[, encoding]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#class-method-bufferallocsize-fill-encoding-1)
- [ ] **- version** buf.fill(value[, offset[, end]][, encoding]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#buffillvalue-offset-end-encoding)
- [ ] **- version** buf.fill(value[, offset[, end]][, encoding]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#buffillvalue-offset-end-encoding-1)
- [ ] **- version** buf.fill(value[, offset[, end]][, encoding]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#buffillvalue-offset-end-encoding-2)
- [ ] **- version** buf.readDoubleLE(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreaddoubleleoffset)
- [ ] **- version** buf.readFloatLE(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreadfloatleoffset)
- [ ] **- version** buf.readInt8(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreadint8offset)
- [ ] **- version** buf.readInt16LE(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreadint16leoffset)
- [ ] **- version** buf.readInt32LE(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreadint32leoffset)
- [ ] **- version** buf.readIntLE(offset, byteLength) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreadintleoffset-bytelength)
- [ ] **- version** buf.readUInt8(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreaduint8offset)
- [ ] **- version** buf.readUInt16LE(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreaduint16leoffset)
- [ ] **- version** buf.readUInt32LE(offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreaduint32leoffset)
- [ ] **- version** buf.readUIntLE(offset, byteLength) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufreaduintleoffset-bytelength)
- [ ] **- version** buf.writeDoubleLE(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwritedoublelevalue-offset)
- [ ] **- version** buf.writeFloatLE(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwritefloatlevalue-offset)
- [ ] **- version** buf.writeInt8(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteint8value-offset)
- [ ] **- version** buf.writeInt16LE(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteint16levalue-offset)
- [ ] **- version** buf.writeInt32LE(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteint32levalue-offset)
- [ ] **- version** buf.writeIntLE(value, offset, byteLength) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteintlevalue-offset-bytelength)
- [ ] **- version** buf.writeUInt8(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteuint8value-offset)
- [ ] **- version** buf.writeUInt16LE(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteuint16levalue-offset)
- [ ] **- version** buf.writeUInt32LE(value, offset) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteuint32levalue-offset)
- [ ] **- version** buf.writeUIntLE(value, offset, byteLength) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/buffer.md#bufwriteuintlevalue-offset-bytelength)
- [ ] **added** `--experimental-repl-await` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/cli.md#--experimental-repl-await)
- [ ] **- version** `-c`, `--check` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/cli.md#-c---check)
- [ ] **- version** new Console(options) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/console.md#new-consoleoptions)
- [ ] **- version** console.assert(value[, ...message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/console.md#consoleassertvalue-message)
- [ ] **added** console.table(tabularData[, properties]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/console.md#consoletabletabulardata-properties)
- [ ] **added** Class Method: ECDH.convertKey(key, curve[, inputEncoding[, outputEncoding[, format]]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#class-method-ecdhconvertkeykey-curve-inputencoding-outputencoding-format)
- [ ] **- version** ecdh.computeSecret(otherPublicKey[, inputEncoding][, outputEncoding]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#ecdhcomputesecretotherpublickey-inputencoding-outputencoding)
- [ ] **deprecated** crypto.DEFAULT_ENCODING [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptodefault_encoding)
- [ ] **deprecated** crypto.fips [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptofips)
- [ ] **deprecated** crypto.createCipher(algorithm, password[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatecipheralgorithm-password-options)
- [ ] **deprecated** crypto.createDecipher(algorithm, password[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatedecipheralgorithm-password-options)
- [ ] **added** crypto.getFips() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptogetfips)
- [ ] **added** crypto.setFips(bool) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptosetfipsbool)
- [ ] **added** emitter.off(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/events.md#emitteroffeventname-listener)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#event-close)
- [ ] **- version** fs.appendFile(path, data[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsappendfilepath-data-options-callback)
- [ ] **- version** fs.chmod(path, mode, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fschmodpath-mode-callback)
- [ ] **- version** fs.chown(path, uid, gid, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fschownpath-uid-gid-callback)
- [ ] **- version** fs.close(fd, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsclosefd-callback)
- [ ] **- version** fs.fchmod(fd, mode, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfchmodfd-mode-callback)
- [ ] **- version** fs.fchown(fd, uid, gid, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfchownfd-uid-gid-callback)
- [ ] **- version** fs.fdatasync(fd, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfdatasyncfd-callback)
- [ ] **- version** fs.fstat(fd[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfstatfd-options-callback)
- [ ] **- version** fs.fsync(fd, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfsyncfd-callback)
- [ ] **- version** fs.ftruncate(fd[, len], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsftruncatefd-len-callback)
- [ ] **- version** fs.futimes(fd, atime, mtime, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsfutimesfd-atime-mtime-callback)
- [ ] **- version** fs.lchmod(path, mode, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fslchmodpath-mode-callback)
- [ ] **- version** fs.lchown(path, uid, gid, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fslchownpath-uid-gid-callback)
- [ ] **- version** fs.link(existingPath, newPath, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fslinkexistingpath-newpath-callback)
- [ ] **- version** fs.lstat(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fslstatpath-options-callback)
- [ ] **- version** fs.mkdir(path[, mode], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsmkdirpath-mode-callback)
- [ ] **- version** fs.mkdtemp(prefix[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsmkdtempprefix-options-callback)
- [ ] **- version** fs.readdir(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsreaddirpath-options-callback)
- [ ] **- version** fs.readFile(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsreadfilepath-options-callback)
- [ ] **- version** fs.readlink(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsreadlinkpath-options-callback)
- [ ] **- version** fs.realpath(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsrealpathpath-options-callback)
- [ ] **- version** fs.rename(oldPath, newPath, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsrenameoldpath-newpath-callback)
- [ ] **- version** fs.rmdir(path, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsrmdirpath-callback)
- [ ] **- version** fs.stat(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsstatpath-options-callback)
- [ ] **- version** fs.truncate(path[, len], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fstruncatepath-len-callback)
- [ ] **- version** fs.unlink(path, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsunlinkpath-callback)
- [ ] **- version** fs.utimes(path, atime, mtime, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsutimespath-atime-mtime-callback)
- [ ] **- version** fs.write(fd, buffer[, offset[, length[, position]]], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fswritefd-buffer-offset-length-position-callback)
- [ ] **- version** fs.write(fd, string[, position[, encoding]], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fswritefd-string-position-encoding-callback)
- [ ] **- version** fs.writeFile(file, data[, options], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fswritefilefile-data-options-callback)
- [ ] **added** class: FileHandle [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#class-filehandle)
- [ ] **added** filehandle.appendFile(data, options) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandleappendfiledata-options)
- [ ] **added** filehandle.chmod(mode) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlechmodmode)
- [ ] **added** filehandle.chown(uid, gid) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlechownuid-gid)
- [ ] **added** filehandle.close() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandleclose)
- [ ] **added** filehandle.datasync() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandledatasync)
- [ ] **added** filehandle.fd [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlefd)
- [ ] **added** filehandle.read(buffer, offset, length, position) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlereadbuffer-offset-length-position)
- [ ] **added** filehandle.readFile(options) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlereadfileoptions)
- [ ] **added** filehandle.stat([options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlestatoptions)
- [ ] **added** filehandle.sync() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlesync)
- [ ] **added** filehandle.truncate(len) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandletruncatelen)
- [ ] **added** filehandle.utimes(atime, mtime) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandleutimesatime-mtime)
- [ ] **added** filehandle.write(buffer, offset, length, position) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlewritebuffer-offset-length-position)
- [ ] **added** filehandle.writeFile(data, options) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#filehandlewritefiledata-options)
- [ ] **added** fsPromises.access(path[, mode]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesaccesspath-mode)
- [ ] **added** fsPromises.appendFile(path, data[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesappendfilepath-data-options)
- [ ] **added** fsPromises.chmod(path, mode) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseschmodpath-mode)
- [ ] **added** fsPromises.chown(path, uid, gid) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseschownpath-uid-gid)
- [ ] **added** fsPromises.copyFile(src, dest[, flags]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisescopyfilesrc-dest-flags)
- [ ] **deprecated** fsPromises.lchmod(path, mode) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseslchmodpath-mode)
- [ ] **deprecated** fsPromises.lchown(path, uid, gid) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseslchownpath-uid-gid)
- [ ] **added** fsPromises.link(existingPath, newPath) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseslinkexistingpath-newpath)
- [ ] **added** fsPromises.lstat(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseslstatpath-options)
- [ ] **added** fsPromises.mkdir(path[, mode]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesmkdirpath-mode)
- [ ] **added** fsPromises.mkdtemp(prefix[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesmkdtempprefix-options)
- [ ] **added** fsPromises.open(path, flags[, mode]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesopenpath-flags-mode)
- [ ] **added** fsPromises.readdir(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesreaddirpath-options)
- [ ] **added** fsPromises.readFile(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesreadfilepath-options)
- [ ] **added** fsPromises.readlink(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesreadlinkpath-options)
- [ ] **added** fsPromises.realpath(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesrealpathpath-options)
- [ ] **added** fsPromises.rename(oldPath, newPath) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesrenameoldpath-newpath)
- [ ] **added** fsPromises.rmdir(path) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesrmdirpath)
- [ ] **added** fsPromises.stat(path[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesstatpath-options)
- [ ] **added** fsPromises.symlink(target, path[, type]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisessymlinktarget-path-type)
- [ ] **added** fsPromises.truncate(path[, len]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisestruncatepath-len)
- [ ] **added** fsPromises.unlink(path) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesunlinkpath)
- [ ] **added** fsPromises.utimes(path, atime, mtime) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromisesutimespath-atime-mtime)
- [ ] **added** fsPromises.writeFile(file, data[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fspromiseswritefilefile-data-options)
- [ ] **added** URL [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/globals.md#url)
- [ ] **added** URLSearchParams [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/globals.md#urlsearchparams)
- [ ] **added** Event: 'information' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#event-information)
- [ ] **- version** request.end([data[, encoding]][, callback]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#requestenddata-encoding-callback)
- [ ] **- version** Event: 'upgrade' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#event-upgrade)
- [ ] **pr-url** Event: 'upgrade' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#event-upgrade-1)
- [ ] **- version** response.end([data][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#responseenddata-encoding-callback)
- [ ] **added** response.writeProcessing() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#responsewriteprocessing)
- [ ] **added** http2session.connecting [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#http2sessionconnecting)
- [ ] **added** Event: 'wantTrailers' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#event-wanttrailers)
- [ ] **added** http2stream.sendTrailers(headers) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#http2streamsendtrailersheaders)
- [ ] **- version** http2stream.respondWithFD(fd[, headers[, options]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#http2streamrespondwithfdfd-headers-options)
- [ ] **- version** http2stream.respondWithFile(path[, headers[, options]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#http2streamrespondwithfilepath-headers-options)
- [ ] **- version** response.end([data][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#responseenddata-encoding-callback)
- [ ] **- version** os.uptime() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/os.md#osuptime)
- [ ] **- version** process.env [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/process.md#processenv)
- [ ] **- version** repl.start([options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/repl.md#replstartoptions)
- [ ] **- version** writable.end([chunk][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#writableendchunk-encoding-callback)
- [ ] **- version** Event: 'readable' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#event-readable)
- [ ] **- version** Event: 'readable' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#event-readable-1)
- [ ] **- version** readable.resume() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#readableresume)
- [ ] **added** readable\[Symbol.asyncIterator\]() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#readablesymbolasynciterator)
- [ ] **added** stream.finished(stream, callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#streamfinishedstream-callback)
- [ ] **added** stream.pipeline(...streams[, callback]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#streampipelinestreams-callback)
- [ ] **- version** Constructor: new stream.Writable([options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#constructor-new-streamwritableoptions)
- [ ] **- version** readable.\_read(size) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/stream.md#readable_readsize)
- [ ] **added** The `trace_events` module [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#the-trace_events-module)
- [ ] **added** `Tracing` object [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#tracing-object)
- [ ] **added** `tracing.categories` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#tracingcategories)
- [ ] **added** `tracing.disable()` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#tracingdisable)
- [ ] **added** `tracing.enable()` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#tracingenable)
- [ ] **added** `tracing.enabled` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#tracingenabled)
- [ ] **added** `trace_events.createTracing(options)` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#trace_eventscreatetracingoptions)
- [ ] **added** `trace_events.getEnabledCategories()` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tracing.md#trace_eventsgetenabledcategories)
- [ ] **- version** Class: URL [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/url.md#class-url)
- [ ] **- version** Class: URLSearchParams [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/url.md#class-urlsearchparams)
- [ ] **- version** util.deprecate(fn, msg[, code]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utildeprecatefn-msg-code)
- [ ] **added** util.formatWithOptions(inspectOptions, format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utilformatwithoptionsinspectoptions-format-args)
- [ ] **- version** util.inspect(object[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utilinspectobject-options)
- [ ] **added** util.types [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypes)
- [ ] **added** util.types.isAnyArrayBuffer(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisanyarraybuffervalue)
- [ ] **added** util.types.isArgumentsObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisargumentsobjectvalue)
- [ ] **added** util.types.isArrayBuffer(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisarraybuffervalue)
- [ ] **added** util.types.isAsyncFunction(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisasyncfunctionvalue)
- [ ] **added** util.types.isBigInt64Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisbigint64arrayvalue)
- [ ] **added** util.types.isBigUint64Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisbiguint64arrayvalue)
- [ ] **added** util.types.isBooleanObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisbooleanobjectvalue)
- [ ] **added** util.types.isDataView(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisdataviewvalue)
- [ ] **added** util.types.isDate(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisdatevalue)
- [ ] **added** util.types.isExternal(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisexternalvalue)
- [ ] **added** util.types.isFloat32Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisfloat32arrayvalue)
- [ ] **added** util.types.isFloat64Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisfloat64arrayvalue)
- [ ] **added** util.types.isGeneratorFunction(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisgeneratorfunctionvalue)
- [ ] **added** util.types.isGeneratorObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisgeneratorobjectvalue)
- [ ] **added** util.types.isInt8Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisint8arrayvalue)
- [ ] **added** util.types.isInt16Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisint16arrayvalue)
- [ ] **added** util.types.isInt32Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisint32arrayvalue)
- [ ] **added** util.types.isMap(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesismapvalue)
- [ ] **added** util.types.isMapIterator(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesismapiteratorvalue)
- [ ] **added** util.types.isModuleNamespaceObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesismodulenamespaceobjectvalue)
- [ ] **added** util.types.isNativeError(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisnativeerrorvalue)
- [ ] **added** util.types.isNumberObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisnumberobjectvalue)
- [ ] **added** util.types.isPromise(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesispromisevalue)
- [ ] **added** util.types.isProxy(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisproxyvalue)
- [ ] **added** util.types.isRegExp(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisregexpvalue)
- [ ] **added** util.types.isSet(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesissetvalue)
- [ ] **added** util.types.isSetIterator(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesissetiteratorvalue)
- [ ] **added** util.types.isSharedArrayBuffer(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesissharedarraybuffervalue)
- [ ] **added** util.types.isStringObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisstringobjectvalue)
- [ ] **added** util.types.isSymbolObject(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesissymbolobjectvalue)
- [ ] **added** util.types.isTypedArray(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesistypedarrayvalue)
- [ ] **added** util.types.isUint8Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisuint8arrayvalue)
- [ ] **added** util.types.isUint8ClampedArray(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisuint8clampedarrayvalue)
- [ ] **added** util.types.isUint16Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisuint16arrayvalue)
- [ ] **added** util.types.isUint32Array(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisuint32arrayvalue)
- [ ] **added** util.types.isWeakMap(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisweakmapvalue)
- [ ] **added** util.types.isWeakSet(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesisweaksetvalue)
- [ ] **added** util.types.isWebAssemblyCompiledModule(value) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utiltypesiswebassemblycompiledmodulevalue)
- [ ] **- version** script.runInNewContext([sandbox[, options]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/vm.md#scriptruninnewcontextsandbox-options)
- [ ] **- version** vm.createContext([sandbox[, options]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/vm.md#vmcreatecontextsandbox-options)
- [ ] **- version** vm.createContext([sandbox[, options]]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/vm.md#vmcreatecontextsandbox-options-1)
- [ ] **deprecated** zlib.bytesRead [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/zlib.md#zlibbytesread)
- [ ] **added** zlib.bytesWritten [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/zlib.md#zlibbyteswritten)

### Version 9.11.0

- [ ] **added** Event: 'ready' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#event-ready)
- [ ] **added** Event: 'ready' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#event-ready-1)
- [ ] **added** Event: 'ready' [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/net.md#event-ready)

### Version 9.10.0

- [ ] **added** napi_fatal_exception [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/n-api.md#napi_fatal_exception)

### Version 9.9.0

- [ ] **added** Strict mode [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#strict-mode)
- [ ] **- version** Strict mode [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#strict-mode-1)
- [ ] **- version** Strict mode [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#strict-mode-2)
- [ ] **- version** assert.throws(block[, error][, message]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/assert.md#assertthrowsblock-error-message-1)
- [ ] **- version** crypto.createCipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatecipherivalgorithm-key-iv-options-1)
- [ ] **- version** crypto.createDecipheriv(algorithm, key, iv[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/crypto.md#cryptocreatedecipherivalgorithm-key-iv-options-1)
- [ ] **- version** fs.open(path, flags[, mode], callback) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/fs.md#fsopenpath-flags-mode-callback)
- [ ] **added** tlsSocket.getFinished() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tls.md#tlssocketgetfinished)
- [ ] **added** tlsSocket.getPeerFinished() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tls.md#tlssocketgetpeerfinished)
- [ ] **added** writeStream.getColorDepth([env]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/tty.md#writestreamgetcolordepthenv)
- [ ] **- version** util.inspect(object[, options]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utilinspectobject-options-1)

### Version 9.8.0

- [ ] **added** `--trace-event-file-pattern` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/cli.md#--trace-event-file-pattern)
- [ ] **- version** Assignment of the `_` (underscore) variable [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/repl.md#assignment-of-the-_-underscore-variable)

### Version 9.7.0

- [ ] **added** immediate.ref() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/timers.md#immediateref)
- [ ] **added** immediate.unref() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/timers.md#immediateunref)
- [ ] **added** util.getSystemErrorName(err) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/util.md#utilgetsystemerrornameerr)

### Version 9.6.0

- [ ] **added** asyncResource.runInAsyncScope(fn[, thisArg, ...args]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/async_hooks.md#asyncresourceruninasyncscopefn-thisarg-args)
- [ ] **deprecated** asyncResource.emitBefore() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/async_hooks.md#asyncresourceemitbefore)
- [ ] **deprecated** asyncResource.emitAfter() [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/async_hooks.md#asyncresourceemitafter)
- [ ] **added** `--experimental-vm-modules` [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/cli.md#--experimental-vm-modules)
- [ ] **- version** http.createServer([options][, requestListener]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http.md#httpcreateserveroptions-requestlistener)
- [ ] **- version** http2.createServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/http2.md#http2createserveroptions-onrequesthandler)
- [ ] **added** napi_open_callback_scope [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/n-api.md#napi_open_callback_scope)
- [ ] **added** napi_close_callback_scope [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/n-api.md#napi_close_callback_scope)
- [ ] **added** Class: vm.Module [[+]](https://github.com/nodejs/node/blob/v10.5.0/doc/api/vm.md#class-vmmodule)

### Version 9.5.0

- [ ] **added** http2stream.sentHeaders [[+]](https://github.com/nodejs/node/blob/v9.5.0/doc/api/http2.md#http2streamsentheaders)
- [ ] **added** http2stream.sentInfoHeaders [[+]](https://github.com/nodejs/node/blob/v9.5.0/doc/api/http2.md#http2streamsentinfoheaders)
- [ ] **added** http2stream.sentTrailers [[+]](https://github.com/nodejs/node/blob/v9.5.0/doc/api/http2.md#http2streamsenttrailers)
- [ ] **added** performance.clearEntries(name) [[+]](https://github.com/nodejs/node/blob/v9.5.0/doc/api/perf_hooks.md#performanceclearentriesname)

### Version 9.4.0

- [ ] **added** emitter.rawListeners(eventName) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/events.md#emitterrawlistenerseventname)
- [ ] **- version** Event: 'clientError' [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http.md#event-clienterror)
- [ ] **added** http2session.alpnProtocol [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionalpnprotocol)
- [ ] **added** http2session.close([callback]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionclosecallback)
- [ ] **added** http2session.closed [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionclosed)
- [ ] **added** http2session.encrypted [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionencrypted)
- [ ] **added** http2session.goaway([code, [lastStreamID, [opaqueData]]]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessiongoawaycode-laststreamid-opaquedata)
- [ ] **added** http2session.originSet [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionoriginset)
- [ ] **added** http2session.ref() [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionref)
- [ ] **added** http2session.unref() [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionunref)
- [ ] **added** serverhttp2session.altsvc(alt, originOrStream) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#serverhttp2sessionaltsvcalt-originorstream)
- [ ] **added** Event: 'altsvc' [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#event-altsvc)
- [ ] **added** http2stream.closed [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2streamclosed)
- [ ] **added** http2stream.pending [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2streampending)
- [ ] **added** writable.writableLength [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/stream.md#writablewritablelength)
- [ ] **added** readable.readableLength [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/stream.md#readablereadablelength)
- [ ] **- version** Class Options [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#class-options)
- [ ] **- version** zlib.deflate(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibdeflatebuffer-options-callback)
- [ ] **- version** zlib.deflateSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibdeflatesyncbuffer-options)
- [ ] **- version** zlib.deflateRawSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibdeflaterawsyncbuffer-options)
- [ ] **- version** zlib.gunzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibgunzipbuffer-options-callback)
- [ ] **- version** zlib.gunzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibgunzipsyncbuffer-options)
- [ ] **- version** zlib.gzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibgzipbuffer-options-callback)
- [ ] **- version** zlib.gzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibgzipsyncbuffer-options)
- [ ] **- version** zlib.inflate(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibinflatebuffer-options-callback)
- [ ] **- version** zlib.inflateSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibinflatesyncbuffer-options)
- [ ] **- version** zlib.inflateRaw(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibinflaterawbuffer-options-callback)
- [ ] **- version** zlib.inflateRawSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibinflaterawsyncbuffer-options)
- [ ] **- version** zlib.unzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibunzipbuffer-options-callback)
- [ ] **- version** zlib.unzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/zlib.md#zlibunzipsyncbuffer-options)

### Version 9.3.0

- [ ] **- version** console.debug(data[, ...args]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/console.md#consoledebugdata-args)
- [ ] **- version** console.dirxml(...data) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/console.md#consoledirxmldata)
- [ ] **- version** https.request(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/https.md#httpsrequestoptions-callback)
- [ ] **added** module.builtinModules [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/modules.md#modulebuiltinmodules)
- [ ] **added** napi_get_uv_event_loop [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/n-api.md#napi_get_uv_event_loop)
- [ ] **added** process.hasUncaughtExceptionCaptureCallback() [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/process.md#processhasuncaughtexceptioncapturecallback)
- [ ] **added** process.setUncaughtExceptionCaptureCallback(fn) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/process.md#processsetuncaughtexceptioncapturecallbackfn)
- [ ] **added** writable.writableHighWaterMark [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/stream.md#writablewritablehighwatermark)
- [ ] **added** readable.readableHighWaterMark [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/stream.md#readablereadablehighwatermark)
- [ ] **- version** tls.createSecureContext(options) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/tls.md#tlscreatesecurecontextoptions)
- [ ] **- version** tls.createServer([options][, secureConnectionListener]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/tls.md#tlscreateserveroptions-secureconnectionlistener)

### Version 9.2.1

- [ ] **- version** Class Method: Buffer.alloc(size[, fill[, encoding]]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/buffer.md#class-method-bufferallocsize-fill-encoding)
- [ ] **added** http2session.ping([payload, ]callback) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2sessionpingpayload-callback)
- [ ] **- version** http2.createServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2createserveroptions-onrequesthandler)
- [ ] **- version** http2.createSecureServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2createsecureserveroptions-onrequesthandler)
- [ ] **- version** http2.connect(authority[, options][, listener]) [[+]](https://github.com/nodejs/node/blob/v9.4.0/doc/api/http2.md#http2connectauthority-options-listener)

### Version 9.2.0

- [ ] **added** process.ppid [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/process.md#processppid)

### Version 9.1.0

- [ ] **- version** http2.createServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/http2.md#http2createserveroptions-onrequesthandler)
- [ ] **- version** http2.createSecureServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/http2.md#http2createsecureserveroptions-onrequesthandler)
- [ ] **- version** http2.connect(authority[, options][, listener]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/http2.md#http2connectauthority-options-listener)
- [ ] **- version** Settings Object [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/http2.md#settings-object)

### Version 9.0.0

- [ ] **- version** assert.deepEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertdeepequalactual-expected-message)
- [ ] **- version** assert.deepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertdeepstrictequalactual-expected-message)
- [ ] **- version** assert.deepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertdeepstrictequalactual-expected-message-1)
- [ ] **- version** assert.notDeepEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertnotdeepequalactual-expected-message)
- [ ] **- version** assert.notDeepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertnotdeepstrictequalactual-expected-message)
- [ ] **- version** assert.notDeepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertnotdeepstrictequalactual-expected-message-1)
- [ ] **- version** assert.notDeepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/assert.md#assertnotdeepstrictequalactual-expected-message-2)
- [ ] **added** `async_hooks.createHook(callbacks)` [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/async_hooks.md#async_hookscreatehookcallbacks)
- [ ] **added** `--no-force-async-hooks-checks` [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/cli.md#--no-force-async-hooks-checks)
- [ ] **added** Certificate.exportChallenge(spkac) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/crypto.md#certificateexportchallengespkac)
- [ ] **added** Certificate.exportPublicKey(spkac[, encoding]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/crypto.md#certificateexportpublickeyspkac-encoding)
- [ ] **added** Certificate.verifySpkac(spkac) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/crypto.md#certificateverifyspkacspkac)
- [ ] **- version** crypto.randomFillSync(buffer[, offset][, size]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/crypto.md#cryptorandomfillsyncbuffer-offset-size)
- [ ] **- version** crypto.randomFill(buffer[, offset][, size], callback) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/crypto.md#cryptorandomfillbuffer-offset-size-callback)
- [ ] **- version** Class: fs.Stats [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/fs.md#class-fsstats)
- [ ] **added** agent.keepSocketAlive(socket) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/http.md#agentkeepsocketalivesocket)
- [ ] **added** agent.reuseSocket(socket, request) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/http.md#agentreusesocketsocket-request)
- [ ] **added** path.toNamespacedPath(path) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/path.md#pathtonamespacedpathpath)
- [ ] **- version** process.dlopen(module, filename[, flags]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/process.md#processdlopenmodule-filename-flags)
- [ ] **- version** process.versions [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/process.md#processversions)
- [ ] **added** replServer.clearBufferedCommand() [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/repl.md#replserverclearbufferedcommand)
- [ ] **deprecated** replServer.parseREPLKeyword(keyword, [rest]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/repl.md#replserverparsereplkeywordkeyword-rest)
- [ ] **added** util.isDeepStrictEqual(val1, val2) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/util.md#utilisdeepstrictequalval1-val2)
- [ ] **- version** vm.runInDebugContext(code) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/vm.md#vmrunindebugcontextcode)
- [ ] **added** zlib.bytesRead [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/zlib.md#zlibbytesread)

### Version 8.9.0

- [ ] **- version** require.resolve(request[, options]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/modules.md#requireresolverequest-options)
- [ ] **added** require.resolve.paths(request) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/modules.md#requireresolvepathsrequest)

### Version 8.8.0

- [ ] **- version** child_process.exec(command[, options][, callback]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/child_process.md#child_processexeccommand-options-callback)
- [ ] **- version** child_process.execFile(file[, args][, options][, callback]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/child_process.md#child_processexecfilefile-args-options-callback)
- [ ] **- version** child_process.spawn(command[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/child_process.md#child_processspawncommand-args-options)
- [ ] **- version** child_process.execFileSync(file[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/child_process.md#child_processexecfilesyncfile-args-options)
- [ ] **- version** child_process.execSync(command[, options]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/child_process.md#child_processexecsynccommand-options)
- [ ] **- version** child_process.spawnSync(command[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/child_process.md#child_processspawnsynccommand-args-options)
- [ ] **- version** Domain [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/domain.md#domain)

### Version 8.7.0

- [ ] **added** socket.getRecvBufferSize() [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/dgram.md#socketgetrecvbuffersize)
- [ ] **added** socket.getSendBufferSize() [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/dgram.md#socketgetsendbuffersize)
- [ ] **added** socket.setRecvBufferSize(size) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/dgram.md#socketsetrecvbuffersizesize)
- [ ] **added** socket.setSendBufferSize(size) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/dgram.md#socketsetsendbuffersizesize)
- [ ] **- version** dgram.createSocket(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v9.2.0/doc/api/dgram.md#dgramcreatesocketoptions-callback)

### Version 8.6.0

- [ ] **added** socket.setMulticastInterface(multicastInterface) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/dgram.md#socketsetmulticastinterfacemulticastinterface)
- [ ] **- version** dgram.createSocket(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/dgram.md#dgramcreatesocketoptions-callback)
- [ ] **added** *napi_get_new_target* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_get_new_target)
- [ ] **- version** napi_create_async_work [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_create_async_work)
- [ ] **added** *napi_async_init** [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_async_init)
- [ ] **added** *napi_async_destroy** [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_async_destroy)
- [ ] **- version** *napi_make_callback* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_make_callback)

### Version 8.5.0

- [ ] **- version** assert.deepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/assert.md#assertdeepstrictequalactual-expected-message)
- [ ] **added** console.group([...label]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/console.md#consolegrouplabel)
- [ ] **added** console.groupCollapsed() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/console.md#consolegroupcollapsed)
- [ ] **added** console.groupEnd() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/console.md#consolegroupend)
- [ ] **added** fs.copyFile(src, dest[, flags], callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/fs.md#fscopyfilesrc-dest-flags-callback)
- [ ] **added** fs.copyFileSync(src, dest[, flags]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/fs.md#fscopyfilesyncsrc-dest-flags)
- [ ] **added** Event: 'continue' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-continue)
- [ ] **added** Event: 'streamError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-streamerror)
- [ ] **added** Event: 'checkContinue' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-checkcontinue)
- [ ] **added** Event: 'checkContinue' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-checkcontinue-1)
- [ ] **added** *napi_remove_wrap* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_remove_wrap)
- [ ] **added** napi_adjust_external_memory [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_adjust_external_memory)
- [ ] **added** napi_create_promise [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_create_promise)
- [ ] **added** napi_resolve_deferred [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_resolve_deferred)
- [ ] **added** napi_reject_deferred [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_reject_deferred)
- [ ] **added** napi_is_promise [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_is_promise)
- [ ] **added** napi_run_script [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_run_script)
- [ ] **added** Performance Timing API [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performance-timing-api)
- [ ] **added** Class: Performance [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#class-performance)
- [ ] **added** performance.clearFunctions([name]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceclearfunctionsname)
- [ ] **added** performance.clearMarks([name]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceclearmarksname)
- [ ] **added** performance.clearMeasures([name]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceclearmeasuresname)
- [ ] **added** performance.getEntries() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancegetentries)
- [ ] **added** performance.getEntriesByName(name[, type]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancegetentriesbynamename-type)
- [ ] **added** performance.getEntriesByType(type) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancegetentriesbytypetype)
- [ ] **added** performance.mark([name]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancemarkname)
- [ ] **added** performance.measure(name, startMark, endMark) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancemeasurename-startmark-endmark)
- [ ] **added** performance.nodeFrame [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodeframe)
- [ ] **added** performance.nodeTiming [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetiming)
- [ ] **added** performance.now() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenow)
- [ ] **added** performance.timeOrigin [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancetimeorigin)
- [ ] **added** performance.timerify(fn) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancetimerifyfn)
- [ ] **added** Class: PerformanceEntry [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#class-performanceentry)
- [ ] **added** performanceEntry.duration [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceentryduration)
- [ ] **added** performanceEntry.name [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceentryname)
- [ ] **added** performanceEntry.startTime [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceentrystarttime)
- [ ] **added** performanceEntry.entryType [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceentryentrytype)
- [ ] **added** performanceEntry.kind [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceentrykind)
- [ ] **added** Class: PerformanceNodeFrame extends PerformanceEntry [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#class-performancenodeframe-extends-performanceentry)
- [ ] **added** Class: PerformanceNodeTiming extends PerformanceEntry [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#class-performancenodetiming-extends-performanceentry)
- [ ] **added** performanceNodeTiming.bootstrapComplete [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingbootstrapcomplete)
- [ ] **added** performanceNodeTiming.clusterSetupEnd [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingclustersetupend)
- [ ] **added** performanceNodeTiming.clusterSetupStart [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingclustersetupstart)
- [ ] **added** performanceNodeTiming.loopExit [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingloopexit)
- [ ] **added** performanceNodeTiming.loopStart [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingloopstart)
- [ ] **added** performanceNodeTiming.moduleLoadEnd [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingmoduleloadend)
- [ ] **added** performanceNodeTiming.moduleLoadStart [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingmoduleloadstart)
- [ ] **added** performanceNodeTiming.nodeStart [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingnodestart)
- [ ] **added** performanceNodeTiming.preloadModuleLoadEnd [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingpreloadmoduleloadend)
- [ ] **added** performanceNodeTiming.preloadModuleLoadStart [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingpreloadmoduleloadstart)
- [ ] **added** performanceNodeTiming.thirdPartyMainEnd [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingthirdpartymainend)
- [ ] **added** performanceNodeTiming.thirdPartyMainStart [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingthirdpartymainstart)
- [ ] **added** performanceNodeTiming.v8Start [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performancenodetimingv8start)
- [ ] **added** Class: PerformanceObserver(callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#class-performanceobservercallback)
- [ ] **added** Callback: PerformanceObserverCallback(list, observer) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#callback-performanceobservercallbacklist-observer)
- [ ] **added** Class: PerformanceObserverEntryList [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#class-performanceobserverentrylist)
- [ ] **added** performanceObserverEntryList.getEntries() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceobserverentrylistgetentries)
- [ ] **added** performanceObserverEntryList.getEntriesByName(name[, type]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceobserverentrylistgetentriesbynamename-type)
- [ ] **added** performanceObserverEntryList.getEntriesByType(type) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceobserverentrylistgetentriesbytypetype)
- [ ] **added** performanceObserver.disconnect() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceobserverdisconnect)
- [ ] **added** performanceObserver.observe(options) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/perf_hooks.md#performanceobserverobserveoptions)

### Version 8.4.0

- [ ] **added** `--expose-http2` [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/cli.md#--expose-http2)
- [ ] **added** Class: Http2Session [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-http2session)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-close)
- [ ] **added** Event: 'connect' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-connect)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-error)
- [ ] **added** Event: 'frameError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-frameerror)
- [ ] **added** Event: 'goaway' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-goaway)
- [ ] **added** Event: 'localSettings' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-localsettings)
- [ ] **added** Event: 'remoteSettings' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-remotesettings)
- [ ] **added** Event: 'stream' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-stream)
- [ ] **added** Event: 'socketError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-socketerror)
- [ ] **added** Event: 'timeout' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-timeout)
- [ ] **added** http2session.destroy() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessiondestroy)
- [ ] **added** http2session.destroyed [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessiondestroyed)
- [ ] **added** http2session.localSettings [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionlocalsettings)
- [ ] **added** http2session.pendingSettingsAck [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionpendingsettingsack)
- [ ] **added** http2session.remoteSettings [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionremotesettings)
- [ ] **added** http2session.request(headers[, options]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionrequestheaders-options)
- [ ] **added** http2session.rstStream(stream, code) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionrststreamstream-code)
- [ ] **added** http2session.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionsettimeoutmsecs-callback)
- [ ] **added** http2session.shutdown(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionshutdownoptions-callback)
- [ ] **added** http2session.socket [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionsocket)
- [ ] **added** http2session.state [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionstate)
- [ ] **added** http2session.priority(stream, options) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionprioritystream-options)
- [ ] **added** http2session.settings(settings) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessionsettingssettings)
- [ ] **added** http2session.type [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2sessiontype)
- [ ] **added** Class: Http2Stream [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-http2stream)
- [ ] **added** Event: 'aborted' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-aborted)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-error-1)
- [ ] **added** Event: 'frameError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-frameerror-1)
- [ ] **added** Event: 'streamClosed' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-streamclosed)
- [ ] **added** Event: 'timeout' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-timeout-1)
- [ ] **added** Event: 'trailers' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-trailers)
- [ ] **added** http2stream.aborted [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamaborted)
- [ ] **added** http2stream.destroyed [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamdestroyed)
- [ ] **added** http2stream.priority(options) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streampriorityoptions)
- [ ] **added** http2stream.rstCode [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrstcode)
- [ ] **added** http2stream.rstStream(code) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrststreamcode)
- [ ] **added** http2stream.rstWithNoError() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrstwithnoerror)
- [ ] **added** http2stream.rstWithProtocolError() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrstwithprotocolerror)
- [ ] **added** http2stream.rstWithCancel() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrstwithcancel)
- [ ] **added** http2stream.rstWithRefuse() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrstwithrefuse)
- [ ] **added** http2stream.rstWithInternalError() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrstwithinternalerror)
- [ ] **added** http2stream.session [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamsession)
- [ ] **added** http2stream.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamsettimeoutmsecs-callback)
- [ ] **added** http2stream.state [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamstate)
- [ ] **added** Class: ClientHttp2Stream [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-clienthttp2stream)
- [ ] **added** Event: 'headers' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-headers)
- [ ] **added** Event: 'push' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-push)
- [ ] **added** Event: 'response' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-response)
- [ ] **added** Class: ServerHttp2Stream [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-serverhttp2stream)
- [ ] **added** http2stream.additionalHeaders(headers) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamadditionalheadersheaders)
- [ ] **added** http2stream.headersSent [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamheaderssent)
- [ ] **added** http2stream.pushAllowed [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streampushallowed)
- [ ] **added** http2stream.pushStream(headers[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streampushstreamheaders-options-callback)
- [ ] **added** http2stream.respond([headers[, options]]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrespondheaders-options)
- [ ] **added** http2stream.respondWithFD(fd[, headers[, options]]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrespondwithfdfd-headers-options)
- [ ] **added** http2stream.respondWithFile(path[, headers[, options]]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2streamrespondwithfilepath-headers-options)
- [ ] **added** Class: Http2Server [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-http2server)
- [ ] **added** Event: 'socketError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-socketerror-1)
- [ ] **added** Event: 'sessionError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-sessionerror)
- [ ] **added** Event: 'stream' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-stream-1)
- [ ] **added** Event: 'request' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-request)
- [ ] **added** Event: 'timeout' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-timeout-2)
- [ ] **added** Class: Http2SecureServer [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-http2secureserver)
- [ ] **added** Event: 'sessionError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-sessionerror-1)
- [ ] **added** Event: 'socketError' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-socketerror-2)
- [ ] **added** Event: 'unknownProtocol' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-unknownprotocol)
- [ ] **added** Event: 'stream' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-stream-2)
- [ ] **added** Event: 'request' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-request-1)
- [ ] **added** Event: 'timeout' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-timeout-3)
- [ ] **added** http2.createServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2createserveroptions-onrequesthandler)
- [ ] **added** http2.createSecureServer(options[, onRequestHandler]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2createsecureserveroptions-onrequesthandler)
- [ ] **added** http2.connect(authority[, options][, listener]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2connectauthority-options-listener)
- [ ] **added** http2.constants [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2constants)
- [ ] **added** http2.getDefaultSettings() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2getdefaultsettings)
- [ ] **added** http2.getPackedSettings(settings) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2getpackedsettingssettings)
- [ ] **added** http2.getUnpackedSettings(buf) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#http2getunpackedsettingsbuf)
- [ ] **added** Class: http2.Http2ServerRequest [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-http2http2serverrequest)
- [ ] **added** Event: 'aborted' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-aborted-1)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-close-1)
- [ ] **added** request.destroy([error]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestdestroyerror)
- [ ] **added** request.headers [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestheaders)
- [ ] **added** request.httpVersion [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requesthttpversion)
- [ ] **added** request.method [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestmethod)
- [ ] **added** request.rawHeaders [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestrawheaders)
- [ ] **added** request.rawTrailers [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestrawtrailers)
- [ ] **added** request.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestsettimeoutmsecs-callback)
- [ ] **added** request.socket [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requestsocket)
- [ ] **added** request.stream [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requeststream)
- [ ] **added** request.trailers [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requesttrailers)
- [ ] **added** request.url [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#requesturl)
- [ ] **added** Class: http2.Http2ServerResponse [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#class-http2http2serverresponse)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-close-2)
- [ ] **added** Event: 'finish' [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#event-finish)
- [ ] **added** response.addTrailers(headers) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responseaddtrailersheaders)
- [ ] **added** response.connection [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responseconnection)
- [ ] **added** response.end([data][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responseenddata-encoding-callback)
- [ ] **added** response.finished [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsefinished)
- [ ] **added** response.getHeader(name) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsegetheadername)
- [ ] **added** response.getHeaderNames() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsegetheadernames)
- [ ] **added** response.getHeaders() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsegetheaders)
- [ ] **added** response.hasHeader(name) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsehasheadername)
- [ ] **added** response.headersSent [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responseheaderssent)
- [ ] **added** response.removeHeader(name) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responseremoveheadername)
- [ ] **added** response.sendDate [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsesenddate)
- [ ] **added** response.setHeader(name, value) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsesetheadername-value)
- [ ] **added** response.setTimeout(msecs[, callback]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsesettimeoutmsecs-callback)
- [ ] **added** response.socket [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsesocket)
- [ ] **added** response.statusCode [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsestatuscode)
- [ ] **added** response.statusMessage [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsestatusmessage)
- [ ] **added** response.stream [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsestream)
- [ ] **added** response.write(chunk[, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsewritechunk-encoding-callback)
- [ ] **added** response.writeContinue() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsewritecontinue)
- [ ] **added** response.writeHead(statusCode[, statusMessage][, headers]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsewriteheadstatuscode-statusmessage-headers)
- [ ] **added** response.createPushResponse(headers, callback) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/http2.md#responsecreatepushresponseheaders-callback)
- [ ] **added** *napi_create_int32* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_create_int32)
- [ ] **added** *napi_create_uint32* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_create_uint32)
- [ ] **added** *napi_create_int64* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_create_int64)
- [ ] **added** *napi_create_double* [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_create_double)
- [ ] **added** napi_get_node_version [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/n-api.md#napi_get_node_version)
- [ ] **- version** new stream.Duplex(options) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/stream.md#new-streamduplexoptions)
- [ ] **added** tlsSocket.disableRenegotiation() [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/tls.md#tlssocketdisablerenegotiation)
- [ ] **- version** util.format(format[, ...args]) [[+]](https://github.com/nodejs/node/blob/v8.6.0/doc/api/util.md#utilformatformat-args)

### Version 8.3.0

- [ ] **added** console.clear() [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/console.md#consoleclear)
- [ ] **added** console.count([label]) [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/console.md#consolecountlabel)
- [ ] **added** console.countReset([label = 'default']) [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/console.md#consolecountresetlabel--default)
- [ ] **added** Class dns.Resolver [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/dns.md#class-dnsresolver)
- [ ] **added** resolver.cancel() [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/dns.md#resolvercancel)
- [ ] **added** *napi_create_dataview* [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_create_dataview)
- [ ] **added** *napi_get_dataview_info* [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_get_dataview_info)
- [ ] **added** *napi_is_dataview* [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_is_dataview)
- [ ] **added** Class: util.TextDecoder [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/util.md#class-utiltextdecoder)
- [ ] **added** Class: util.TextEncoder [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/util.md#class-utiltextencoder)

### Version 8.2.0

- [ ] **added** Class Method: Buffer.from(object[, offsetOrEncoding[, length]]) [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/buffer.md#class-method-bufferfromobject-offsetorencoding-length)
- [ ] **added** Buffer Constants [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/buffer.md#buffer-constants)
- [ ] **added** buffer.constants.MAX_LENGTH [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/buffer.md#bufferconstantsmax_length)
- [ ] **added** buffer.constants.MAX_STRING_LENGTH [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/buffer.md#bufferconstantsmax_string_length)
- [ ] **- version** cluster.settings [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/cluster.md#clustersettings)
- [ ] **added** napi_fatal_error [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_fatal_error)
- [ ] **added** *napi_delete_property* [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_delete_property)
- [ ] **added** *napi_has_own_property* [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_has_own_property)
- [ ] **added** *napi_delete_element* [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/n-api.md#napi_delete_element)
- [ ] **added** util.callbackify(original) [[+]](https://github.com/nodejs/node/blob/v8.3.0/doc/api/util.md#utilcallbackifyoriginal)

### Version 8.1.0

- [ ] **added** `async_hooks.createHook(callbacks)` [[+]](https://github.com/nodejs/node/blob/v8.1.0/doc/api/async_hooks.md#async_hookscreatehookcallbacks)
- [ ] **- version** Class: fs.Stats [[+]](https://github.com/nodejs/node/blob/v8.1.0/doc/api/fs.md#class-fsstats)
- [ ] **added** agent.keepSocketAlive(socket) [[+]](https://github.com/nodejs/node/blob/v8.1.0/doc/api/http.md#agentkeepsocketalivesocket)
- [ ] **added** agent.reuseSocket(socket, request) [[+]](https://github.com/nodejs/node/blob/v8.1.0/doc/api/http.md#agentreusesocketsocket-request)
- [ ] **added** zlib.bytesRead [[+]](https://github.com/nodejs/node/blob/v8.1.0/doc/api/zlib.md#zlibbytesread)

### Version 8.0.0

- [ ] **- version** assert.deepEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/assert.md#assertdeepequalactual-expected-message)
- [ ] **- version** assert.deepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/assert.md#assertdeepstrictequalactual-expected-message)
- [ ] **- version** new Buffer(size) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#new-buffersize)
- [ ] **- version** Class Method: Buffer.compare(buf1, buf2) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#class-method-buffercomparebuf1-buf2)
- [ ] **- version** Class Method: Buffer.concat(list[, totalLength]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#class-method-bufferconcatlist-totallength)
- [ ] **- version** buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#bufcomparetarget-targetstart-targetend-sourcestart-sourceend)
- [ ] **- version** buf.equals(otherBuffer) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#bufequalsotherbuffer)
- [ ] **- version** buf.indexOf(value[, byteOffset][, encoding]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#bufindexofvalue-byteoffset-encoding)
- [ ] **- version** buf.lastIndexOf(value[, byteOffset][, encoding]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#buflastindexofvalue-byteoffset-encoding)
- [ ] **deprecated** buf.parent [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#bufparent)
- [ ] **- version** buffer.transcode(source, fromEnc, toEnc) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/buffer.md#buffertranscodesource-fromenc-toenc)
- [ ] **- version** child_process.fork(modulePath[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/child_process.md#child_processforkmodulepath-args-options)
- [ ] **- version** child_process.execFileSync(file[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/child_process.md#child_processexecfilesyncfile-args-options)
- [ ] **- version** child_process.execSync(command[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/child_process.md#child_processexecsynccommand-options)
- [ ] **- version** child_process.spawnSync(command[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/child_process.md#child_processspawnsynccommand-args-options)
- [ ] **added** `--pending-deprecation` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#--pending-deprecation)
- [ ] **added** `--napi-modules` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#--napi-modules)
- [ ] **added** `--redirect-warnings=file` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#--redirect-warningsfile)
- [ ] **added** `-` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#-)
- [ ] **added** `NODE_OPTIONS=options...` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#node_optionsoptions)
- [ ] **added** `NODE_PENDING_DEPRECATION=1` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#node_pending_deprecation1)
- [ ] **added** `NODE_REDIRECT_WARNINGS=file` [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/cli.md#node_redirect_warningsfile)
- [ ] **- version** Class: Console [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/console.md#class-console)
- [ ] **- version** sign.sign(private_key[, output_format]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/crypto.md#signsignprivate_key-output_format)
- [ ] **- version** verifier.verify(object, signature[, signature_format]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/crypto.md#verifierverifyobject-signature-signature_format)
- [ ] **- version** crypto.createDiffieHellman(prime[, prime_encoding][, generator][, generator_encoding]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/crypto.md#cryptocreatediffiehellmanprime-prime_encoding-generator-generator_encoding)
- [ ] **- version** crypto.createDiffieHellman(prime[, prime_encoding][, generator][, generator_encoding]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/crypto.md#cryptocreatediffiehellmanprime-prime_encoding-generator-generator_encoding-1)
- [ ] **- version** crypto.pbkdf2(password, salt, iterations, keylen, digest, callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/crypto.md#cryptopbkdf2password-salt-iterations-keylen-digest-callback)
- [ ] **- version** socket.send(msg, [offset, length,] port [, address] [, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/dgram.md#socketsendmsg-offset-length-port--address--callback)
- [ ] **- version** socket.send(msg, [offset, length,] port [, address] [, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/dgram.md#socketsendmsg-offset-length-port--address--callback-1)
- [ ] **- version** Domain [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/domain.md#domain)
- [ ] **- version** fs.realpath(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/fs.md#fsrealpathpath-options-callback)
- [ ] **- version** fs.realpathSync(path[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/fs.md#fsrealpathsyncpath-options)
- [ ] **added** server.keepAliveTimeout [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/http.md#serverkeepalivetimeout)
- [ ] **added** server.keepAliveTimeout [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/https.md#serverkeepalivetimeout)
- [ ] **added** Constructor: new inspector.Session() [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/inspector.md#constructor-new-inspectorsession)
- [ ] **added** Event: 'inspectorNotification' [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/inspector.md#event-inspectornotification)
- [ ] **added** Event: &lt;inspector-protocol-method&gt; [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/inspector.md#event-ltinspector-protocol-methodgt)
- [ ] **added** session.connect() [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/inspector.md#sessionconnect)
- [ ] **added** session.post(method[, params][, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/inspector.md#sessionpostmethod-params-callback)
- [ ] **added** session.disconnect() [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/inspector.md#sessiondisconnect)
- [ ] **added** napi_get_last_error_info [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_last_error_info)
- [ ] **added** napi_throw [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_throw)
- [ ] **added** napi_throw_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_throw_error)
- [ ] **added** napi_throw_type_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_throw_type_error)
- [ ] **added** napi_throw_range_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_throw_range_error)
- [ ] **added** napi_is_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_error)
- [ ] **added** napi_create_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_error)
- [ ] **added** napi_create_type_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_type_error)
- [ ] **added** napi_create_range_error [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_range_error)
- [ ] **added** napi_get_and_clear_last_exception [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_and_clear_last_exception)
- [ ] **added** napi_is_exception_pending [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_exception_pending)
- [ ] **added** napi_open_handle_scope [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_open_handle_scope)
- [ ] **added** napi_close_handle_scope [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_close_handle_scope)
- [ ] **added** napi_open_escapable_handle_scope [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_open_escapable_handle_scope)
- [ ] **added** napi_close_escapable_handle_scope [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_close_escapable_handle_scope)
- [ ] **added** napi_escape_handle [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_escape_handle)
- [ ] **added** napi_create_reference [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_reference)
- [ ] **added** napi_delete_reference [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_delete_reference)
- [ ] **added** napi_reference_ref [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_reference_ref)
- [ ] **added** napi_reference_unref [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_reference_unref)
- [ ] **added** napi_get_reference_value [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_reference_value)
- [ ] **added** *napi_create_array* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_array)
- [ ] **added** *napi_create_array_with_length* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_array_with_length)
- [ ] **added** *napi_create_arraybuffer* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_arraybuffer)
- [ ] **added** *napi_create_buffer* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_buffer)
- [ ] **added** *napi_create_buffer_copy* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_buffer_copy)
- [ ] **added** *napi_create_external* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_external)
- [ ] **added** napi_create_external_arraybuffer [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_external_arraybuffer)
- [ ] **added** *napi_create_external_buffer* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_external_buffer)
- [ ] **added** *napi_create_function* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_function)
- [ ] **added** *napi_create_object* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_object)
- [ ] **added** *napi_create_symbol* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_symbol)
- [ ] **added** *napi_create_typedarray* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_typedarray)
- [ ] **added** *napi_create_number* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_number)
- [ ] **added** *napi_create_string_utf16* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_string_utf16)
- [ ] **added** *napi_create_string_utf8* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_string_utf8)
- [ ] **added** *napi_get_array_length* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_array_length)
- [ ] **added** *napi_get_arraybuffer_info* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_arraybuffer_info)
- [ ] **added** *napi_get_buffer_info* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_buffer_info)
- [ ] **added** *napi_get_prototype* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_prototype)
- [ ] **added** *napi_get_typedarray_info* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_typedarray_info)
- [ ] **added** *napi_get_value_bool* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_bool)
- [ ] **added** *napi_get_value_double* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_double)
- [ ] **added** *napi_get_value_external* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_external)
- [ ] **added** *napi_get_value_int32* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_int32)
- [ ] **added** *napi_get_value_int64* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_int64)
- [ ] **added** *napi_get_value_string_length* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_string_length)
- [ ] **added** *napi_get_value_string_utf8* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_string_utf8)
- [ ] **added** *napi_get_value_string_utf16* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_string_utf16)
- [ ] **added** *napi_get_value_uint32* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_value_uint32)
- [ ] **added** *napi_get_boolean* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_boolean)
- [ ] **added** *napi_get_global* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_global)
- [ ] **added** *napi_get_null* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_null)
- [ ] **added** *napi_get_undefined* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_undefined)
- [ ] **added** *napi_coerce_to_bool* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_coerce_to_bool)
- [ ] **added** *napi_coerce_to_number* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_coerce_to_number)
- [ ] **added** *napi_coerce_to_object* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_coerce_to_object)
- [ ] **added** *napi_coerce_to_string* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_coerce_to_string)
- [ ] **added** *napi_typeof* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_typeof)
- [ ] **added** *napi_instanceof* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_instanceof)
- [ ] **added** *napi_is_array* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_array)
- [ ] **added** *napi_is_arraybuffer* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_arraybuffer)
- [ ] **added** *napi_is_buffer* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_buffer)
- [ ] **added** *napi_is_error* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_error-1)
- [ ] **added** *napi_is_typedarray* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_typedarray)
- [ ] **added** *napi_strict_equals* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_strict_equals)
- [ ] **added** *napi_get_property_names* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_property_names)
- [ ] **added** *napi_set_property* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_set_property)
- [ ] **added** *napi_get_property* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_property)
- [ ] **added** *napi_has_property* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_has_property)
- [ ] **added** *napi_set_named_property* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_set_named_property)
- [ ] **added** *napi_get_named_property* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_named_property)
- [ ] **added** *napi_has_named_property* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_has_named_property)
- [ ] **added** *napi_set_element* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_set_element)
- [ ] **added** *napi_get_element* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_element)
- [ ] **added** *napi_has_element* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_has_element)
- [ ] **added** *napi_define_properties* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_define_properties)
- [ ] **added** *napi_call_function* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_call_function)
- [ ] **added** *napi_create_function* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_function-1)
- [ ] **added** *napi_get_cb_info* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_cb_info)
- [ ] **added** *napi_is_construct_call* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_is_construct_call)
- [ ] **added** *napi_new_instance* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_new_instance)
- [ ] **added** *napi_make_callback* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_make_callback)
- [ ] **added** *napi_define_class* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_define_class)
- [ ] **added** *napi_wrap* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_wrap)
- [ ] **added** *napi_unwrap* [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_unwrap)
- [ ] **added** napi_create_async_work [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_create_async_work)
- [ ] **added** napi_delete_async_work [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_delete_async_work)
- [ ] **added** napi_queue_async_work [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_queue_async_work)
- [ ] **added** napi_cancel_async_work [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_cancel_async_work)
- [ ] **added** napi_get_version [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/n-api.md#napi_get_version)
- [ ] **added** process.emitWarning(warning[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/process.md#processemitwarningwarning-options)
- [ ] **- version** querystring.parse(str[, sep[, eq[, options]]]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/querystring.md#querystringparsestr-sep-eq-options)
- [ ] **- version** writable.end([chunk][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#writableendchunk-encoding-callback)
- [ ] **- version** writable.write(chunk[, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#writablewritechunk-encoding-callback)
- [ ] **added** writable.destroy([error]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#writabledestroyerror)
- [ ] **- version** readable.unshift(chunk) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#readableunshiftchunk)
- [ ] **added** readable.destroy([error]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#readabledestroyerror)
- [ ] **added** transform.destroy([error]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#transformdestroyerror)
- [ ] **added** writable.\_destroy(err, callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#writable_destroyerr-callback)
- [ ] **added** writable.\_final(callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#writable_finalcallback)
- [ ] **- version** readable.push(chunk[, encoding]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/stream.md#readablepushchunk-encoding)
- [ ] **- version** stringDecoder.write(buffer) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/string_decoder.md#stringdecoderwritebuffer)
- [ ] **- version** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/tls.md#tlsconnectoptions-callback)
- [ ] **- version** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/tls.md#tlsconnectoptions-callback-1)
- [ ] **- version** tls.createServer([options][, secureConnectionListener]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/tls.md#tlscreateserveroptions-secureconnectionlistener)
- [ ] **added** util.promisify(original) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/util.md#utilpromisifyoriginal)
- [ ] **added** util.promisify.custom [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/util.md#utilpromisifycustom)
- [ ] **added** v8.cachedDataVersionTag() [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/v8.md#v8cacheddataversiontag)
- [ ] **- version** Class Options [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#class-options)
- [ ] **- version** zlib.deflate(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflatebuffer-options-callback)
- [ ] **- version** zlib.deflate(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflatebuffer-options-callback-1)
- [ ] **- version** zlib.deflateSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflatesyncbuffer-options)
- [ ] **- version** zlib.deflateSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflatesyncbuffer-options-1)
- [ ] **- version** zlib.deflateRaw(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflaterawbuffer-options-callback)
- [ ] **- version** zlib.deflateRaw(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflaterawbuffer-options-callback-1)
- [ ] **- version** zlib.deflateRawSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflaterawsyncbuffer-options)
- [ ] **- version** zlib.deflateRawSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibdeflaterawsyncbuffer-options-1)
- [ ] **- version** zlib.gunzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgunzipbuffer-options-callback)
- [ ] **- version** zlib.gunzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgunzipbuffer-options-callback-1)
- [ ] **- version** zlib.gunzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgunzipsyncbuffer-options)
- [ ] **- version** zlib.gunzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgunzipsyncbuffer-options-1)
- [ ] **- version** zlib.gzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgzipbuffer-options-callback)
- [ ] **- version** zlib.gzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgzipbuffer-options-callback-1)
- [ ] **- version** zlib.gzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgzipsyncbuffer-options)
- [ ] **- version** zlib.gzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibgzipsyncbuffer-options-1)
- [ ] **- version** zlib.inflate(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflatebuffer-options-callback)
- [ ] **- version** zlib.inflate(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflatebuffer-options-callback-1)
- [ ] **- version** zlib.inflateSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflatesyncbuffer-options)
- [ ] **- version** zlib.inflateSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflatesyncbuffer-options-1)
- [ ] **- version** zlib.inflateRaw(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflaterawbuffer-options-callback)
- [ ] **- version** zlib.inflateRaw(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflaterawbuffer-options-callback-1)
- [ ] **- version** zlib.inflateRawSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflaterawsyncbuffer-options)
- [ ] **- version** zlib.inflateRawSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibinflaterawsyncbuffer-options-1)
- [ ] **- version** zlib.unzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibunzipbuffer-options-callback)
- [ ] **- version** zlib.unzip(buffer[, options], callback) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibunzipbuffer-options-callback-1)
- [ ] **- version** zlib.unzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibunzipsyncbuffer-options)
- [ ] **- version** zlib.unzipSync(buffer[, options]) [[+]](https://github.com/nodejs/node/blob/v8.0.0/doc/api/zlib.md#zlibunzipsyncbuffer-options-1)

### Version 7.10.0

- [ ] **added** crypto.randomFillSync(buffer[, offset][, size]) [[+]](https://github.com/nodejs/node/blob/v7.10.0/doc/api/crypto.md#cryptorandomfillsyncbuffer-offset-size)
- [ ] **added** crypto.randomFill(buffer[, offset][, size], callback) [[+]](https://github.com/nodejs/node/blob/v7.10.0/doc/api/crypto.md#cryptorandomfillbuffer-offset-size-callback)
- [ ] **added** Constructor: new URLSearchParams(obj) [[+]](https://github.com/nodejs/node/blob/v7.10.0/doc/api/url.md#constructor-new-urlsearchparamsobj)
- [ ] **added** Constructor: new URLSearchParams(iterable) [[+]](https://github.com/nodejs/node/blob/v7.10.0/doc/api/url.md#constructor-new-urlsearchparamsiterable)

### Version 7.7.0

- [ ] **added** `--trace-events-enabled` [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/cli.md#--trace-events-enabled)
- [ ] **added** `--trace-event-categories` [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/cli.md#--trace-event-categories)
- [ ] **added** `OPENSSL_CONF=file` [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/cli.md#openssl_conffile)
- [ ] **added** `SSL_CERT_DIR=dir` [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/cli.md#ssl_cert_dirdir)
- [ ] **added** `SSL_CERT_FILE=file` [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/cli.md#ssl_cert_filefile)
- [ ] **added** response.getHeaderNames() [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/http.md#responsegetheadernames)
- [ ] **added** response.getHeaders() [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/http.md#responsegetheaders)
- [ ] **added** response.hasHeader(name) [[+]](https://github.com/nodejs/node/blob/v7.8.0/doc/api/http.md#responsehasheadername)

### Version 7.5.0

- [ ] **added** `--use-openssl-ca`, `--use-bundled-ca` [[+]](https://github.com/nodejs/node/blob/v7.5.0/doc/api/cli.md#--use-openssl-ca---use-bundled-ca)
- [ ] **added** `--` [[+]](https://github.com/nodejs/node/blob/v7.5.0/doc/api/cli.md#--)
- [ ] **added** `NODE_NO_WARNINGS=1` [[+]](https://github.com/nodejs/node/blob/v7.5.0/doc/api/cli.md#node_no_warnings1)

### Version 7.1.0

- [ ] **added** buffer.transcode(source, fromEnc, toEnc) [[+]](https://github.com/nodejs/node/blob/v7.1.0/doc/api/buffer.md#buffertranscodesource-fromenc-toenc)
- [ ] **added** child.channel [[+]](https://github.com/nodejs/node/blob/v7.1.0/doc/api/child_process.md#childchannel)
- [ ] **added** `NODE_PRESERVE_SYMLINKS=1` [[+]](https://github.com/nodejs/node/blob/v7.1.0/doc/api/cli.md#node_preserve_symlinks1)
- [ ] **added** process.channel [[+]](https://github.com/nodejs/node/blob/v7.1.0/doc/api/process.md#processchannel)

### Version 6.9.0

- [ ] **added** `--openssl-config=file` [[+]](https://github.com/nodejs/node/blob/v6.9.0/doc/api/cli.md#--openssl-configfile)

### Version 6.6.0

- [ ] **added** util.inspect.custom [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilinspectcustom)

### Version 6.4.0

- [ ] **added** `NODE_TTY_UNSAFE_ASYNC=1` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#node_tty_unsafe_async1)
- [ ] **added** readStream.bytesRead [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#readstreambytesread)
- [ ] **added** process.argv0 [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processargv0)
- [ ] **added** util.inspect.defaultOptions [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilinspectdefaultoptions)

### Version 6.3.0

- [ ] **added** buf.swap64() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufswap64)
- [ ] **added** `--preserve-symlinks` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--preserve-symlinks)
- [ ] **added** crypto.constants [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptoconstants)

### Version 6.1.0

- [ ] **added** socket.connecting [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketconnecting)
- [ ] **added** process.cpuUsage([previousValue]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processcpuusagepreviousvalue)

### Version 6.0.0

- [ ] **deprecated** new Buffer(array) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#new-bufferarray)
- [ ] **deprecated** new Buffer(buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#new-bufferbuffer)
- [ ] **deprecated** new Buffer(arrayBuffer[, byteOffset [, length]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#new-bufferarraybuffer-byteoffset--length)
- [ ] **deprecated** new Buffer(size) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#new-buffersize)
- [ ] **deprecated** new Buffer(string[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#new-bufferstring-encoding)
- [ ] **added** buf.lastIndexOf(value[, byteOffset][, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#buflastindexofvalue-byteoffset-encoding)
- [ ] **deprecated** Class: SlowBuffer [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-slowbuffer)
- [ ] **deprecated** new SlowBuffer(size) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#new-slowbuffersize)
- [ ] **added** `--no-warnings` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--no-warnings)
- [ ] **added** `--trace-warnings` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--trace-warnings)
- [ ] **added** `--zero-fill-buffers` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--zero-fill-buffers)
- [ ] **added** `--prof-process` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--prof-process)
- [ ] **added** `--enable-fips` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--enable-fips)
- [ ] **added** `--force-fips` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--force-fips)
- [ ] **added** worker.exitedAfterDisconnect [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerexitedafterdisconnect)
- [ ] **deprecated** worker.suicide [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workersuicide-1)
- [ ] **added** crypto.fips [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptofips)
- [ ] **added** dns.resolvePtr(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolveptrhostname-callback)
- [ ] **added** emitter.eventNames() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emittereventnames)
- [ ] **added** emitter.prependListener(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitterprependlistenereventname-listener)
- [ ] **added** emitter.prependOnceListener(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitterprependoncelistenereventname-listener)
- [ ] **added** Buffer API [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#buffer-api)
- [ ] **added** os.userInfo([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osuserinfooptions)
- [ ] **added** Event: 'warning' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-warning)
- [ ] **added** process.emitWarning(warning[, name][, ctor]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processemitwarningwarning-name-ctor)
- [ ] **added** Event: 'tlsClientError' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-tlsclienterror)
- [ ] **deprecated** util.log(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utillogstring-1)
- [ ] **deprecated** util.\_extend(target, source) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#util_extendtarget-source-1)
- [ ] **added** v8.getHeapSpaceStatistics() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/v8.md#v8getheapspacestatistics)

### Version 5.10.0

- [ ] **added** The `--zero-fill-buffers` command line option [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#the---zero-fill-buffers-command-line-option)
- [ ] **added** Class Method: Buffer.alloc(size[, fill[, encoding]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferallocsize-fill-encoding)
- [ ] **added** Class Method: Buffer.allocUnsafe(size) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferallocunsafesize)
- [ ] **added** Class Method: Buffer.allocUnsafeSlow(size) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferallocunsafeslowsize)
- [ ] **added** Class Method: Buffer.from(array) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferfromarray)
- [ ] **added** Class Method: Buffer.from(arrayBuffer[, byteOffset[, length]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferfromarraybuffer-byteoffset-length)
- [ ] **added** Class Method: Buffer.from(buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferfrombuffer)
- [ ] **added** Class Method: Buffer.from(string[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferfromstring-encoding)
- [ ] **added** buf.swap16() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufswap16)
- [ ] **added** buf.swap32() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufswap32)
- [ ] **added** fs.mkdtemp(prefix[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsmkdtempprefix-options-callback)
- [ ] **added** fs.mkdtempSync(prefix[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsmkdtempsyncprefix-options)

### Version 5.7.0

- [ ] **added** server.listening [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#serverlistening)
- [ ] **added** server.listening [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverlistening)
- [ ] **added** tlsSocket.getProtocol() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketgetprotocol)

### Version 5.5.0

- [ ] **added** Event: 'checkExpectation' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-checkexpectation)

### Version 5.3.0

- [ ] **added** buf.includes(value[, byteOffset][, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufincludesvalue-byteoffset-encoding)

### Version 5.2.0

- [ ] **deprecated** ecdh.setPublicKey(public_key[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhsetpublickeypublic_key-encoding-1)

### Version 5.0.0

- [ ] **added** `-c`, `--check` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-c---check)
- [ ] **added** tlsSocket.getEphemeralKeyInfo() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketgetephemeralkeyinfo)

### Version 4.0.0

- [ ] **added** `--tls-cipher-list=list` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--tls-cipher-listlist)
- [ ] **deprecated** EventEmitter.listenerCount(emitter, eventName) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#eventemitterlistenercountemitter-eventname-1)
- [ ] **deprecated** util.isArray(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisarrayobject-1)
- [ ] **deprecated** util.isBoolean(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisbooleanobject-1)
- [ ] **deprecated** util.isBuffer(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisbufferobject-1)
- [ ] **deprecated** util.isDate(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisdateobject-1)
- [ ] **deprecated** util.isError(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utiliserrorobject-1)
- [ ] **deprecated** util.isFunction(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisfunctionobject-1)
- [ ] **deprecated** util.isNull(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisnullobject-1)
- [ ] **deprecated** util.isNullOrUndefined(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisnullorundefinedobject-1)
- [ ] **deprecated** util.isNumber(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisnumberobject-1)
- [ ] **deprecated** util.isObject(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisobjectobject-1)
- [ ] **deprecated** util.isPrimitive(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisprimitiveobject-1)
- [ ] **deprecated** util.isRegExp(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisregexpobject-1)
- [ ] **deprecated** util.isString(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisstringobject-1)
- [ ] **deprecated** util.isSymbol(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilissymbolobject-1)
- [ ] **deprecated** util.isUndefined(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisundefinedobject-1)

### Version 3.2.0

- [ ] **added** emitter.listenerCount(eventName) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitterlistenercounteventname)

### Version 3.0.0

- [ ] **added** buffer.kMaxLength [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufferkmaxlength)
- [ ] **added** `NODE_REPL_HISTORY=file` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#node_repl_historyfile)
- [ ] **added** process.release [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processrelease)
- [ ] **deprecated** NODE_REPL_HISTORY_FILE [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#node_repl_history_file-1)
- [ ] **added** server.getTicketKeys() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#servergetticketkeys)
- [ ] **added** server.setTicketKeys(keys) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#serversetticketkeyskeys)

### Version 2.4.0

- [ ] **added** `--track-heap-objects` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--track-heap-objects)

### Version 2.3.0

- [ ] **added** crypto.getCurves() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptogetcurves)
- [ ] **added** os.homedir() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#oshomedir)

### Version 2.2.0

- [ ] **added** Class: ChildProcess [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#class-childprocess)

### Version 2.1.0

- [ ] **added** `--trace-sync-io` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--trace-sync-io)

### Version 2.0.0

- [ ] **added** process.getegid() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processgetegid)
- [ ] **added** process.geteuid() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processgeteuid)
- [ ] **added** process.setegid(id) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processsetegidid)
- [ ] **added** process.seteuid(id) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processseteuidid)
- [ ] **added** NODE_REPL_HISTORY_FILE [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#node_repl_history_file)

### Version 1.6.0

- [ ] **added** `-r`, `--require module` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-r---require-module)
- [ ] **added** request.flushHeaders() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestflushheaders)

### Version 1.5.0

- [ ] **added** buf.indexOf(value[, byteOffset][, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufindexofvalue-byteoffset-encoding)

### Version 1.4.1

- [ ] **added** Event: 'abort' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-abort)
- [ ] **added** Event: 'rejectionHandled' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-rejectionhandled)
- [ ] **added** Event: 'unhandledRejection' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-unhandledrejection)

### Version 1.2.0

- [ ] **added** assert.deepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertdeepstrictequalactual-expected-message)
- [ ] **added** assert.notDeepStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertnotdeepstrictequalactual-expected-message)

### Version 1.1.0

- [ ] **added** buf.entries() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufentries)
- [ ] **added** buf.keys() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufkeys)
- [ ] **added** buf.values() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufvalues)
- [ ] **added** crypto.privateEncrypt(private_key, buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptoprivateencryptprivate_key-buffer)
- [ ] **added** crypto.publicDecrypt(public_key, buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptopublicdecryptpublic_key-buffer)

### Version 1.0.0

- [ ] **added** cipher.setAAD(buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ciphersetaadbuffer)
- [ ] **added** cipher.getAuthTag() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ciphergetauthtag)
- [ ] **added** decipher.setAAD(buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#deciphersetaadbuffer)
- [ ] **added** decipher.setAuthTag(buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#deciphersetauthtagbuffer)
- [ ] **added** emitter.getMaxListeners() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emittergetmaxlisteners)
- [ ] **deprecated** fs.exists(path, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsexistspath-callback-1)
- [ ] **deprecated** fs.existsSync(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsexistssyncpath-1)
- [ ] **added** v8.getHeapStatistics() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/v8.md#v8getheapstatistics)
- [ ] **added** v8.setFlagsFromString(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/v8.md#v8setflagsfromstringstring)

### Version 0.11.15

- [ ] **added** buf.readDoubleLE(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreaddoubleleoffset-noassert)
- [ ] **added** buf.readFloatLE(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreadfloatleoffset-noassert)
- [ ] **added** buf.readIntLE(offset, byteLength[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreadintleoffset-bytelength-noassert)
- [ ] **added** buf.readUIntLE(offset, byteLength[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreaduintleoffset-bytelength-noassert)
- [ ] **added** buf.writeDoubleLE(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwritedoublelevalue-offset-noassert)
- [ ] **added** buf.writeFloatLE(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwritefloatlevalue-offset-noassert)
- [ ] **added** buf.writeIntLE(value, offset, byteLength[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteintlevalue-offset-bytelength-noassert)
- [ ] **added** `--icu-data-dir=file` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--icu-data-dirfile)
- [ ] **added** `NODE_ICU_DATA=file` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#node_icu_datafile)
- [ ] **added** fs.access(path[, mode], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsaccesspath-mode-callback)
- [ ] **added** fs.accessSync(path[, mode]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsaccesssyncpath-mode)
- [ ] **added** path.format(pathObject) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathformatpathobject)
- [ ] **added** path.parse(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathparsepath)
- [ ] **added** path.posix [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathposix)
- [ ] **added** path.win32 [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathwin32)
- [ ] **added** writable.setDefaultEncoding(encoding) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#writablesetdefaultencodingencoding)

### Version 0.11.14

- [ ] **added** `--throw-deprecation` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--throw-deprecation)
- [ ] **added** worker.isConnected() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerisconnected)
- [ ] **added** worker.isDead() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerisdead)
- [ ] **added** Class: ECDH [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-ecdh)
- [ ] **added** ecdh.computeSecret(other_public_key[, input_encoding][, output_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhcomputesecretother_public_key-input_encoding-output_encoding)
- [ ] **added** ecdh.generateKeys([encoding[, format]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhgeneratekeysencoding-format)
- [ ] **added** ecdh.getPrivateKey([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhgetprivatekeyencoding)
- [ ] **added** ecdh.getPublicKey([encoding[, format]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhgetpublickeyencoding-format)
- [ ] **added** ecdh.setPrivateKey(private_key[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhsetprivatekeyprivate_key-encoding)
- [ ] **added** ecdh.setPublicKey(public_key[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ecdhsetpublickeypublic_key-encoding)
- [ ] **added** crypto.createECDH(curve_name) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreateecdhcurve_name)
- [ ] **added** crypto.privateDecrypt(private_key, buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptoprivatedecryptprivate_key-buffer)
- [ ] **added** crypto.publicEncrypt(public_key, buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptopublicencryptpublic_key-buffer)
- [ ] **added** socket.bind(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketbindoptions-callback)
- [ ] **added** dns.lookupService(address, port, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnslookupserviceaddress-port-callback)
- [ ] **added** server.listen(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverlistenoptions-callback)
- [ ] **added** socket.remoteFamily [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketremotefamily)
- [ ] **added** vm.runInDebugContext(code) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#vmrunindebugcontextcode)

### Version 0.11.13

- [ ] **added** Class Method: Buffer.compare(buf1, buf2) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-buffercomparebuf1-buf2)
- [ ] **added** buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufcomparetarget-targetstart-targetend-sourcestart-sourceend)
- [ ] **added** buf.equals(otherBuffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufequalsotherbuffer)
- [ ] **deprecated** crypto.createCredentials(details) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatecredentialsdetails-1)
- [ ] **added** dgram.createSocket(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#dgramcreatesocketoptions-callback)
- [ ] **added** Event: 'OCSPRequest' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-ocsprequest)
- [ ] **added** Event: 'OCSPResponse' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-ocspresponse)
- [ ] **added** tls.createSecureContext(options) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlscreatesecurecontextoptions)

### Version 0.11.12

- [ ] **added** child_process.execFileSync(file[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processexecfilesyncfile-args-options)
- [ ] **added** child_process.execSync(command[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processexecsynccommand-options)
- [ ] **added** child_process.spawnSync(command[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processspawnsynccommand-args-options)
- [ ] **added** diffieHellman.verifyError [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmanverifyerror)
- [ ] **added** crypto.createDiffieHellman(prime[, prime_encoding][, generator][, generator_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatediffiehellmanprime-prime_encoding-generator-generator_encoding)
- [ ] **added** Event: 'beforeExit' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-beforeexit)
- [ ] **added** zlib.deflateSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibdeflatesyncbuf-options)
- [ ] **added** zlib.deflateRawSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibdeflaterawsyncbuf-options)
- [ ] **added** zlib.gunzipSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibgunzipsyncbuf-options)
- [ ] **added** zlib.gzipSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibgzipsyncbuf-options)
- [ ] **added** zlib.inflateSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibinflatesyncbuf-options)
- [ ] **added** zlib.inflateRawSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibinflaterawsyncbuf-options)
- [ ] **added** zlib.unzipSync(buf[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibunzipsyncbuf-options)

### Version 0.11.11

- [ ] **added** crypto.setEngine(engine[, flags]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptosetengineengine-flags)
- [ ] **added** tlsSocket.setMaxSendFragment(size) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketsetmaxsendfragmentsize)

### Version 0.11.10

- [ ] **added** dns.resolveSoa(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvesoahostname-callback)
- [ ] **added** message.statusMessage [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagestatusmessage)

### Version 0.11.8

- [ ] **added** Class: Certificate [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-certificate)
- [ ] **added** certificate.exportChallenge(spkac) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#certificateexportchallengespkac)
- [ ] **added** certificate.exportPublicKey(spkac) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#certificateexportpublickeyspkac)
- [ ] **added** certificate.verifySpkac(spkac) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#certificateverifyspkacspkac)
- [ ] **added** response.statusMessage [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsestatusmessage)
- [ ] **added** http.METHODS [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpmethods)
- [ ] **added** process.exitCode [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processexitcode-1)
- [ ] **added** tlsSocket.renegotiate(options, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketrenegotiateoptions-callback)

### Version 0.11.7

- [ ] **added** agent.maxFreeSockets [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentmaxfreesockets)
- [ ] **added** vm.isContext(sandbox) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#vmiscontextsandbox)

### Version 0.11.6

- [ ] **added** message.rawHeaders [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagerawheaders)
- [ ] **added** message.rawTrailers [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagerawtrailers)

### Version 0.11.5

- [ ] **added** fs.write(fd, data[, position[, encoding]], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswritefd-data-position-encoding-callback)
- [ ] **added** fs.writeSync(fd, data[, position[, encoding]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswritesyncfd-data-position-encoding)
- [ ] **added** util.isBoolean(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisbooleanobject)
- [ ] **added** util.isBuffer(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisbufferobject)
- [ ] **added** util.isFunction(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisfunctionobject)
- [ ] **added** util.isNull(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisnullobject)
- [ ] **added** util.isNullOrUndefined(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisnullorundefinedobject)
- [ ] **added** util.isNumber(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisnumberobject)
- [ ] **added** util.isObject(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisobjectobject)
- [ ] **added** util.isPrimitive(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisprimitiveobject)
- [ ] **added** util.isString(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisstringobject)
- [ ] **added** util.isSymbol(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilissymbolobject)
- [ ] **added** util.isUndefined(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisundefinedobject)

### Version 0.11.4

- [ ] **added** agent.createConnection(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentcreateconnectionoptions-callback)
- [ ] **added** agent.destroy() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentdestroy)
- [ ] **added** agent.freeSockets [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentfreesockets)
- [ ] **added** agent.getName(options) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentgetnameoptions)
- [ ] **added** Class: tls.TLSSocket [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#class-tlstlssocket)
- [ ] **added** new tls.TLSSocket(socket[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#new-tlstlssocketsocket-options)
- [ ] **added** Event: 'secureConnect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-secureconnect)
- [ ] **added** tlsSocket.address() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketaddress)
- [ ] **added** tlsSocket.authorized [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketauthorized)
- [ ] **added** tlsSocket.authorizationError [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketauthorizationerror)
- [ ] **added** tlsSocket.encrypted [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketencrypted)
- [ ] **added** tlsSocket.getCipher() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketgetcipher)
- [ ] **added** tlsSocket.getPeerCertificate([ detailed ]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketgetpeercertificate-detailed-)
- [ ] **added** tlsSocket.getSession() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketgetsession)
- [ ] **added** tlsSocket.getTLSTicket() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketgettlsticket)
- [ ] **added** tlsSocket.localAddress [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketlocaladdress)
- [ ] **added** tlsSocket.localPort [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketlocalport)
- [ ] **added** tlsSocket.remoteAddress [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketremoteaddress)
- [ ] **added** tlsSocket.remoteFamily [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketremotefamily)
- [ ] **added** tlsSocket.remotePort [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlssocketremoteport)
- [ ] **added** zlib.params(level, strategy, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibparamslevel-strategy-callback)

### Version 0.11.3

- [ ] **added** Class Property: Buffer.poolSize [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-property-bufferpoolsize)
- [ ] **added** dns.getServers() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsgetservers)
- [ ] **added** dns.setServers(servers) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnssetserversservers)
- [ ] **added** Event: 'lookup' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-lookup)
- [ ] **added** tls.connect(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlsconnectoptions-callback)
- [ ] **added** tls.connect(port[, host][, options][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlsconnectport-host-options-callback)
- [ ] **deprecated** Class: CryptoStream [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#class-cryptostream-1)
- [ ] **deprecated** cryptoStream.bytesWritten [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#cryptostreambyteswritten-1)
- [ ] **deprecated** Class: SecurePair [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#class-securepair-1)
- [ ] **deprecated** Event: 'secure' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-secure-1)
- [ ] **deprecated** tls.createSecurePair([context][, isServer][, requestCert][, rejectUnauthorized][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlscreatesecurepaircontext-isserver-requestcert-rejectunauthorized-options-1)
- [ ] **added** util.debuglog(section) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utildebuglogsection)
- [ ] **deprecated** util.debug(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utildebugstring-1)
- [ ] **deprecated** util.error([...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilerror-1)
- [ ] **deprecated** util.print([...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilprint-1)
- [ ] **deprecated** util.puts([...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilputs-1)

### Version 0.11.2

- [ ] **added** Event: 'exit' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-exit)
- [ ] **added** cluster.schedulingPolicy [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterschedulingpolicy)
- [ ] **added** EventEmitter.defaultMaxListeners [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#eventemitterdefaultmaxlisteners)
- [ ] **added** server.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#serversettimeoutmsecs-callback)
- [ ] **added** server.timeout [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#servertimeout)
- [ ] **added** path.isAbsolute(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathisabsolutepath)
- [ ] **added** writable.cork() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#writablecork)
- [ ] **added** writable.uncork() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#writableuncork)

### Version 0.11.1

- [ ] **added** Class Options [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-options)

### Version 0.11.0

- [ ] **added** Event: 'reset' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#event-reset)

### Version 0.10.2

- [ ] **added** tls.getCiphers() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlsgetciphers)

### Version 0.9.12

- [ ] **added** worker.kill([signal='SIGTERM']) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerkillsignalsigterm)
- [ ] **added** dns.resolveNaptr(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvenaptrhostname-callback)
- [ ] **added** EventEmitter.listenerCount(emitter, eventName) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#eventemitterlistenercountemitter-eventname)
- [ ] **added** server.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#serversettimeoutmsecs-callback)
- [ ] **added** server.timeout [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#servertimeout)
- [ ] **added** response.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsesettimeoutmsecs-callback)

### Version 0.9.11

- [ ] **added** readable.unshift(chunk) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readableunshiftchunk)

### Version 0.9.9

- [ ] **added** os.tmpdir() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#ostmpdir)

### Version 0.9.7

- [ ] **deprecated** server.connections [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverconnections-1)
- [ ] **added** server.getConnections(callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#servergetconnectionscallback)

### Version 0.9.6

- [ ] **added** socket.localAddress [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketlocaladdress)
- [ ] **added** socket.localPort [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketlocalport)

### Version 0.9.4

- [ ] **added** os.endianness() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osendianness)
- [ ] **added** process.getgroups() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processgetgroups)
- [ ] **added** process.initgroups(user, extra_group) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processinitgroupsuser-extra_group)
- [ ] **added** process.setgroups(groups) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processsetgroupsgroups)
- [ ] **added** Class: stream.Writable [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#class-streamwritable)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-close)
- [ ] **added** Event: 'drain' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-drain)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-error)
- [ ] **added** Event: 'finish' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-finish)
- [ ] **added** Event: 'pipe' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-pipe)
- [ ] **added** Event: 'unpipe' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-unpipe)
- [ ] **added** writable.end([chunk][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#writableendchunk-encoding-callback)
- [ ] **added** writable.write(chunk[, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#writablewritechunk-encoding-callback)
- [ ] **added** Class: stream.Readable [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#class-streamreadable)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-close-1)
- [ ] **added** Event: 'data' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-data)
- [ ] **added** Event: 'end' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-end)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-error-1)
- [ ] **added** Event: 'readable' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#event-readable)
- [ ] **added** readable.pause() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readablepause)
- [ ] **added** readable.pipe(destination[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readablepipedestination-options)
- [ ] **added** readable.read([size]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readablereadsize)
- [ ] **added** readable.resume() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readableresume)
- [ ] **added** readable.setEncoding(encoding) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readablesetencodingencoding)
- [ ] **added** readable.unpipe([destination]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readableunpipedestination)
- [ ] **added** readable.wrap(stream) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#readablewrapstream)
- [ ] **added** Class: stream.Duplex [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#class-streamduplex)
- [ ] **added** Class: stream.Transform [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/stream.md#class-streamtransform)

### Version 0.9.3

- [ ] **added** crypto.DEFAULT_ENCODING [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptodefault_encoding)
- [ ] **added** crypto.getCiphers() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptogetciphers)
- [ ] **added** crypto.getHashes() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptogethashes)
- [ ] **added** crypto.pbkdf2Sync(password, salt, iterations, keylen, digest) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptopbkdf2syncpassword-salt-iterations-keylen-digest)
- [ ] **added** Event: 'removeListener' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#event-removelistener)
- [ ] **added** response.headersSent [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responseheaderssent)
- [ ] **added** path.delimiter [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathdelimiter)
- [ ] **added** stringDecoder.end([buffer]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/string_decoder.md#stringdecoderendbuffer)

### Version 0.9.2

- [ ] **added** buf.toJSON() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#buftojson)
- [ ] **added** Event: 'newSession' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-newsession)
- [ ] **added** Event: 'resumeSession' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-resumesession)

### Version 0.9.1

- [ ] **added** Class Method: Buffer.isEncoding(encoding) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferisencodingencoding)
- [ ] **added** socket.ref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketref)
- [ ] **added** socket.unref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketunref)
- [ ] **added** server.ref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverref)
- [ ] **added** server.unref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverunref)
- [ ] **added** socket.ref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketref)
- [ ] **added** socket.unref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketunref)
- [ ] **added** timeout.ref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#timeoutref)
- [ ] **added** timeout.unref() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#timeoutunref)
- [ ] **added** setImmediate(callback[, ...arg]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#setimmediatecallback-arg)
- [ ] **added** clearImmediate(immediate) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#clearimmediateimmediate)

### Version 0.8.6

- [ ] **added** fs.ftruncate(fd, len, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsftruncatefd-len-callback)
- [ ] **added** fs.ftruncateSync(fd, len) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsftruncatesyncfd-len)
- [ ] **added** fs.truncate(path, len, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fstruncatepath-len-callback)
- [ ] **added** fs.truncateSync(path, len) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fstruncatesyncpath-len)

### Version 0.8.1

- [ ] **added** cluster.isMaster [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterismaster)

### Version 0.8.0

- [ ] **added** `--no-deprecation` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--no-deprecation)
- [ ] **added** `--trace-deprecation` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--trace-deprecation)
- [ ] **added** worker.id [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerid)
- [ ] **added** util.deprecate(function, string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utildeprecatefunction-string)

### Version 0.7.11

- [ ] **added** Class Method: Buffer.concat(list[, totalLength]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferconcatlist-totallength)

### Version 0.7.10

- [ ] **added** options.detached [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#optionsdetached)
- [ ] **added** options.stdio [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#optionsstdio)
- [ ] **added** child.stdio [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childstdio)

### Version 0.7.9

- [ ] **added** Event: 'disconnect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-disconnect-1)
- [ ] **added** Event: 'exit' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-exit-1)
- [ ] **added** path.sep [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathsep)

### Version 0.7.8

- [ ] **added** os.EOL [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#oseol)

### Version 0.7.7

- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#event-close)
- [ ] **added** `-i`, `--interactive` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-i---interactive)
- [ ] **added** Event: 'disconnect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-disconnect)
- [ ] **added** worker.disconnect() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerdisconnect)
- [ ] **added** cluster.disconnect([callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterdisconnectcallback)
- [ ] **added** Event: 'disconnect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-disconnect)
- [ ] **added** process.config [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processconfig)
- [ ] **added** process.execArgv [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processexecargv)
- [ ] **added** readline.clearLine(stream, dir) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#readlineclearlinestream-dir)
- [ ] **added** readline.clearScreenDown(stream) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#readlineclearscreendownstream)
- [ ] **added** readline.cursorTo(stream, x, y) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#readlinecursortostream-x-y)
- [ ] **added** readline.emitKeypressEvents(stream[, interface]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#readlineemitkeypresseventsstream-interface)
- [ ] **added** readline.moveCursor(stream, dx, dy) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#readlinemovecursorstream-dx-dy)
- [ ] **added** Event: 'exit' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#event-exit)
- [ ] **added** readStream.isRaw [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#readstreamisraw)
- [ ] **added** readStream.setRawMode(mode) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#readstreamsetrawmodemode)
- [ ] **added** Event: 'resize' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#event-resize)
- [ ] **added** writeStream.columns [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#writestreamcolumns)
- [ ] **added** writeStream.rows [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#writestreamrows)

### Version 0.7.6

- [ ] **added** process.hrtime([time]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processhrtimetime)

### Version 0.7.5

- [ ] **added** crypto.getDiffieHellman(group_name) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptogetdiffiehellmangroup_name)
- [ ] **added** response.sendDate [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsesenddate)
- [ ] **added** Event: 'pause' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-pause)
- [ ] **added** Event: 'resume' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-resume)
- [ ] **added** Event: 'SIGCONT' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-sigcont)
- [ ] **added** Event: 'SIGTSTP' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-sigtstp)
- [ ] **added** util.\_extend(target, source) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#util_extendtarget-source)

### Version 0.7.3

- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-error)

### Version 0.7.2

- [ ] **added** Event: 'disconnect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#event-disconnect)
- [ ] **added** child.connected [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childconnected)
- [ ] **added** child.disconnect() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childdisconnect)
- [ ] **added** process.connected [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processconnected)
- [ ] **added** process.disconnect() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processdisconnect)

### Version 0.7.1

- [ ] **added** Event: 'setup' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-setup)
- [ ] **added** cluster.settings [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clustersettings)
- [ ] **added** cluster.setupMaster([settings]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clustersetupmastersettings)
- [ ] **added** cipher.setAutoPadding(auto_padding=true) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#ciphersetautopaddingauto_paddingtrue)
- [ ] **added** decipher.setAutoPadding(auto_padding=true) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#deciphersetautopaddingauto_paddingtrue)

### Version 0.7.0

- [ ] **added** Class: Worker [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#class-worker)
- [ ] **added** Event: 'listening' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-listening)
- [ ] **added** Event: 'message' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-message)
- [ ] **added** Event: 'online' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-online)
- [ ] **added** worker.process [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workerprocess)
- [ ] **added** worker.send(message[, sendHandle][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workersendmessage-sendhandle-callback)
- [ ] **added** worker.suicide [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#workersuicide)
- [ ] **added** Event: 'fork' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-fork)
- [ ] **added** Event: 'listening' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-listening-1)
- [ ] **added** Event: 'online' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#event-online-1)
- [ ] **added** cluster.worker [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterworker)
- [ ] **added** cluster.workers [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterworkers)
- [ ] **added** Event: 'connect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-connect)
- [ ] **added** Event: 'connect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-connect-1)
- [ ] **added** server.maxHeadersCount [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#servermaxheaderscount)
- [ ] **added** net.connect(options[, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netconnectoptions-connectlistener)
- [ ] **added** process.abort() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processabort)
- [ ] **added** punycode.ucs2 [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodeucs2)
- [ ] **added** punycode.ucs2.decode(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodeucs2decodestring)
- [ ] **added** punycode.ucs2.encode(codePoints) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodeucs2encodecodepoints)
- [ ] **added** zlib.reset() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibreset)

### Version 0.6.9

- [ ] **added** socket.addMembership(multicastAddress[, multicastInterface]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketaddmembershipmulticastaddress-multicastinterface)
- [ ] **added** socket.dropMembership(multicastAddress[, multicastInterface]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketdropmembershipmulticastaddress-multicastinterface)
- [ ] **added** socket.setBroadcast(flag) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketsetbroadcastflag)

### Version 0.6.7

- [ ] **added** fs.appendFile(file, data[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsappendfilefile-data-options-callback)
- [ ] **added** fs.appendFileSync(file, data[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsappendfilesyncfile-data-options)
- [ ] **added** fs.chmodSync(path, mode) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fschmodsyncpath-mode)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-close-1)

### Version 0.6.4

- [ ] **added** `-p`, `--print "script"` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-p---print-script)

### Version 0.6.1

- [ ] **added** punycode.toASCII(domain) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodetoasciidomain)
- [ ] **added** punycode.toUnicode(domain) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodetounicodedomain)
- [ ] **added** punycode.version [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodeversion)

### Version 0.6.0

- [ ] **added** cluster.fork([env]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterforkenv)
- [ ] **added** cluster.isWorker [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cluster.md#clusterisworker)
- [ ] **added** os.networkInterfaces() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osnetworkinterfaces)
- [ ] **added** server.address() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#serveraddress)
- [ ] **added** util.isArray(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisarrayobject)
- [ ] **added** util.isDate(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisdateobject)
- [ ] **added** util.isError(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utiliserrorobject)
- [ ] **added** util.isRegExp(object) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilisregexpobject)
- [ ] **added** zlib.deflate(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibdeflatebuf-options-callback)
- [ ] **added** zlib.deflateRaw(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibdeflaterawbuf-options-callback)
- [ ] **added** zlib.gunzip(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibgunzipbuf-options-callback)
- [ ] **added** zlib.gzip(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibgzipbuf-options-callback)
- [ ] **added** zlib.inflate(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibinflatebuf-options-callback)
- [ ] **added** zlib.inflateRaw(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibinflaterawbuf-options-callback)
- [ ] **added** zlib.unzip(buf[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibunzipbuf-options-callback)

### Version 0.5.10

- [ ] **added** fs.watch(filename[, options][, listener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswatchfilename-options-listener)
- [ ] **added** server.listen(handle[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#serverlistenhandle-callback)
- [ ] **added** server.listen(handle[, backlog][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverlistenhandle-backlog-callback)
- [ ] **added** socket.remoteAddress [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketremoteaddress)
- [ ] **added** socket.remotePort [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketremoteport)
- [ ] **added** Event: 'message' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-message)

### Version 0.5.9

- [ ] **added** assert(value[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertvalue-message)
- [ ] **added** Event: 'message' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#event-message)
- [ ] **added** child.send(message[, sendHandle[, options]][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childsendmessage-sendhandle-options-callback)
- [ ] **added** agent.requests [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentrequests)
- [ ] **added** request.setNoDelay([noDelay]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestsetnodelaynodelay)
- [ ] **added** request.setSocketKeepAlive([enable][, initialDelay]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestsetsocketkeepaliveenable-initialdelay)
- [ ] **added** request.setTimeout(timeout[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestsettimeouttimeout-callback)
- [ ] **added** message.setTimeout(msecs, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagesettimeoutmsecs-callback)
- [ ] **added** http.globalAgent [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpglobalagent)
- [ ] **added** https.globalAgent [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#httpsglobalagent)
- [ ] **added** process.send(message[, sendHandle[, options]][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processsendmessage-sendhandle-options-callback)

### Version 0.5.8

- [ ] **added** crypto.randomBytes(size[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptorandombytessize-callback)
- [ ] **added** Class: fs.FSWatcher [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#class-fsfswatcher)
- [ ] **added** Event: 'change' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#event-change)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#event-error)
- [ ] **added** watcher.close() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#watcherclose)
- [ ] **added** Class: tty.ReadStream [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#class-ttyreadstream)
- [ ] **added** Class: tty.WriteStream [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#class-ttywritestream)
- [ ] **added** tty.isatty(fd) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tty.md#ttyisattyfd)
- [ ] **added** Constants [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#constants)
- [ ] **added** Class: zlib.Deflate [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibdeflate)
- [ ] **added** Class: zlib.DeflateRaw [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibdeflateraw)
- [ ] **added** Class: zlib.Gunzip [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibgunzip)
- [ ] **added** Class: zlib.Gzip [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibgzip)
- [ ] **added** Class: zlib.Inflate [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibinflate)
- [ ] **added** Class: zlib.InflateRaw [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibinflateraw)
- [ ] **added** Class: zlib.Unzip [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibunzip)
- [ ] **added** Class: zlib.Zlib [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#class-zlibzlib)
- [ ] **added** zlib.flush([kind], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibflushkind-callback)
- [ ] **added** zlib.createDeflate([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreatedeflateoptions)
- [ ] **added** zlib.createDeflateRaw([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreatedeflaterawoptions)
- [ ] **added** zlib.createGunzip([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreategunzipoptions)
- [ ] **added** zlib.createGzip([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreategzipoptions)
- [ ] **added** zlib.createInflate([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreateinflateoptions)
- [ ] **added** zlib.createInflateRaw([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreateinflaterawoptions)
- [ ] **added** zlib.createUnzip([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/zlib.md#zlibcreateunzipoptions)

### Version 0.5.5

- [ ] **added** buf.readInt16LE(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreadint16leoffset-noassert)
- [ ] **added** buf.readInt32LE(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreadint32leoffset-noassert)
- [ ] **added** buf.readUInt16LE(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreaduint16leoffset-noassert)
- [ ] **added** buf.readUInt32LE(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreaduint32leoffset-noassert)
- [ ] **added** buf.writeInt16LE(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteint16levalue-offset-noassert)
- [ ] **added** buf.writeInt32LE(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteint32levalue-offset-noassert)
- [ ] **added** buf.writeUInt16LE(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteuint16levalue-offset-noassert)
- [ ] **added** buf.writeUInt32LE(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteuint32levalue-offset-noassert)
- [ ] **added** buf.writeUIntLE(value, offset, byteLength[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteuintlevalue-offset-bytelength-noassert)
- [ ] **added** crypto.pbkdf2(password, salt, iterations, keylen, digest, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptopbkdf2password-salt-iterations-keylen-digest-callback)

### Version 0.5.4

- [ ] **added** buffer.INSPECT_MAX_BYTES [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufferinspect_max_bytes)

### Version 0.5.3

- [ ] **added** Event: 'socket' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-socket)
- [ ] **added** socket.bytesRead [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketbytesread)
- [ ] **added** socket.bytesWritten [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketbyteswritten)
- [ ] **added** server.addContext(hostname, context) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#serveraddcontexthostname-context)
- [ ] **added** util.format(format[, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilformatformat-)

### Version 0.5.2

- [ ] **added** `-e`, `--eval "script"` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-e---eval-script)

### Version 0.5.1

- [ ] **added** module.require(id) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#modulerequireid)
- [ ] **added** punycode.decode(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodedecodestring)
- [ ] **added** punycode.encode(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/punycode.md#punycodeencodestring)

### Version 0.5.0

- [ ] **added** buf.fill(value[, offset[, end]][, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#buffillvalue-offset-end-encoding)
- [ ] **added** buf.readInt8(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreadint8offset-noassert)
- [ ] **added** buf.readUInt8(offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufreaduint8offset-noassert)
- [ ] **added** buf.writeInt8(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteint8value-offset-noassert)
- [ ] **added** buf.writeUInt8(value, offset[, noAssert]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwriteuint8value-offset-noassert)
- [ ] **added** child_process.fork(modulePath[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processforkmodulepath-args-options)
- [ ] **added** Class: DiffieHellman [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-diffiehellman)
- [ ] **added** diffieHellman.computeSecret(other_public_key[, input_encoding][, output_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmancomputesecretother_public_key-input_encoding-output_encoding)
- [ ] **added** diffieHellman.generateKeys([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmangeneratekeysencoding)
- [ ] **added** diffieHellman.getGenerator([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmangetgeneratorencoding)
- [ ] **added** diffieHellman.getPrime([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmangetprimeencoding)
- [ ] **added** diffieHellman.getPrivateKey([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmangetprivatekeyencoding)
- [ ] **added** diffieHellman.getPublicKey([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmangetpublickeyencoding)
- [ ] **added** diffieHellman.setPrivateKey(private_key[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmansetprivatekeyprivate_key-encoding)
- [ ] **added** diffieHellman.setPublicKey(public_key[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#diffiehellmansetpublickeypublic_key-encoding)
- [ ] **added** crypto.createDiffieHellman(prime_length[, generator]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatediffiehellmanprime_length-generator)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-close)
- [ ] **added** net.createServer([options][, connectionListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netcreateserveroptions-connectionlistener)
- [ ] **added** os.arch() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osarch)
- [ ] **added** os.platform() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osplatform)
- [ ] **added** path.relative(from, to) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathrelativefrom-to)
- [ ] **added** process.arch [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processarch)
- [ ] **added** process.uptime() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processuptime)

### Version 0.4.7

- [ ] **added** writeStream.bytesWritten [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#writestreambyteswritten)
- [ ] **added** fs.fchmod(fd, mode, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfchmodfd-mode-callback)
- [ ] **added** fs.fchmodSync(fd, mode) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfchmodsyncfd-mode)
- [ ] **added** fs.fchown(fd, uid, gid, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfchownfd-uid-gid-callback)
- [ ] **added** fs.fchownSync(fd, uid, gid) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfchownsyncfd-uid-gid)
- [ ] **deprecated** fs.lchmod(path, mode, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslchmodpath-mode-callback)
- [ ] **deprecated** fs.lchmodSync(path, mode) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslchmodsyncpath-mode)
- [ ] **deprecated** fs.lchown(path, uid, gid, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslchownpath-uid-gid-callback)
- [ ] **deprecated** fs.lchownSync(path, uid, gid) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslchownsyncpath-uid-gid)

### Version 0.4.5

- [ ] **added** Class: https.Agent [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#class-httpsagent)

### Version 0.4.2

- [ ] **added** fs.futimes(fd, atime, mtime, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfutimesfd-atime-mtime-callback)
- [ ] **added** fs.futimesSync(fd, atime, mtime) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfutimessyncfd-atime-mtime)
- [ ] **added** fs.utimes(path, atime, mtime, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsutimespath-atime-mtime-callback)
- [ ] **added** fs.utimesSync(path, atime, mtime) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsutimessyncpath-atime-mtime)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-close-2)

### Version 0.4.0

- [ ] **added** response.getHeader(name) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsegetheadername)
- [ ] **added** response.removeHeader(name) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responseremoveheadername)
- [ ] **added** response.setHeader(name, value) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsesetheadername-value)
- [ ] **added** response.statusCode [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsestatuscode)

### Version 0.3.8

- [ ] **added** socket.setMulticastLoopback(flag) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketsetmulticastloopbackflag)
- [ ] **added** socket.setMulticastTTL(ttl) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketsetmulticastttlttl)
- [ ] **added** Event: 'aborted' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-aborted)
- [ ] **added** request.abort() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestabort)
- [ ] **added** Event: 'aborted' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-aborted-1)
- [ ] **added** socket.bufferSize [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketbuffersize)

### Version 0.3.6

- [ ] **added** agent.maxSockets [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentmaxsockets)
- [ ] **added** agent.sockets [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#agentsockets)
- [ ] **added** Event: 'finish' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-finish)
- [ ] **deprecated** http.createClient([port][, host]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpcreateclientport-host-1)
- [ ] **added** http.get(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpgetoptions-callback)
- [ ] **added** http.request(options[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httprequestoptions-callback)
- [ ] **added** https.get(options, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#httpsgetoptions-callback)
- [ ] **added** https.request(options, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#httpsrequestoptions-callback)

### Version 0.3.5

- [ ] **added** emitter.setMaxListeners(n) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emittersetmaxlistenersn)

### Version 0.3.4

- [ ] **added** Class: http.Agent [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#class-httpagent)
- [ ] **added** new Agent([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#new-agentoptions)
- [ ] **added** Class: https.Server [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#class-httpsserver)
- [ ] **added** https.createServer(options[, requestListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#httpscreateserveroptions-requestlistener)
- [ ] **added** Class: net.Socket [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#class-netsocket)
- [ ] **added** new net.Socket([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#new-netsocketoptions)
- [ ] **added** path.resolve([path[, ...]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathresolvepath-)
- [ ] **added** rl.pause() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlpause)
- [ ] **added** rl.resume() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlresume)
- [ ] **added** Class: CryptoStream [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#class-cryptostream)
- [ ] **added** cryptoStream.bytesWritten [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#cryptostreambyteswritten)

### Version 0.3.3

- [ ] **added** os.cpus() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#oscpus)
- [ ] **added** os.freemem() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osfreemem)
- [ ] **added** os.hostname() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#oshostname)
- [ ] **added** os.loadavg() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osloadavg)
- [ ] **added** os.release() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osrelease)
- [ ] **added** os.totalmem() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#ostotalmem)
- [ ] **added** os.type() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#ostype)
- [ ] **added** os.uptime() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/os.md#osuptime)
- [ ] **added** rl.question(query, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlquestionquery-callback)

### Version 0.3.2

- [ ] **added** dns.resolveCname(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvecnamehostname-callback)
- [ ] **added** Event: 'continue' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-continue)
- [ ] **added** Class: tls.Server [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#class-tlsserver)
- [ ] **added** Event: 'secureConnection' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-secureconnection)
- [ ] **added** server.close([callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#serverclosecallback)
- [ ] **added** server.connections [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#serverconnections)
- [ ] **added** server.listen(port[, hostname][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#serverlistenport-hostname-callback)
- [ ] **added** tls.createServer(options[, secureConnectionListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlscreateserveroptions-secureconnectionlistener)
- [ ] **added** Class: SecurePair [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#class-securepair)
- [ ] **added** Event: 'secure' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#event-secure)
- [ ] **added** tls.createSecurePair([context][, isServer][, requestCert][, rejectUnauthorized][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/tls.md#tlscreatesecurepaircontext-isserver-requestcert-rejectunauthorized-options)

### Version 0.3.1

- [ ] **added** Class: vm.Script [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#class-vmscript)
- [ ] **added** new vm.Script(code, options) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#new-vmscriptcode-options)
- [ ] **added** script.runInContext(contextifiedSandbox[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#scriptrunincontextcontextifiedsandbox-options)
- [ ] **added** script.runInNewContext([sandbox][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#scriptruninnewcontextsandbox-options)
- [ ] **added** script.runInThisContext([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#scriptruninthiscontextoptions)
- [ ] **added** vm.createContext([sandbox]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#vmcreatecontextsandbox)
- [ ] **added** vm.runInNewContext(code[, sandbox][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#vmruninnewcontextcode-sandbox-options)
- [ ] **added** vm.runInThisContext(code[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/vm.md#vmruninthiscontextcode-options)

### Version 0.3.0

- [ ] **added** buf.slice([start[, end]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufslicestart-end)
- [ ] **added** `NODE_DISABLE_COLORS=1` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#node_disable_colors1)
- [ ] **added** emitter.once(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitteronceeventname-listener)
- [ ] **added** Event: 'checkContinue' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-checkcontinue)
- [ ] **added** response.addTrailers(headers) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responseaddtrailersheaders)
- [ ] **added** response.writeContinue() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsewritecontinue)
- [ ] **added** message.destroy([error]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagedestroyerror)
- [ ] **added** message.socket [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagesocket)
- [ ] **added** message.trailers [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagetrailers)
- [ ] **added** net.isIP(input) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netisipinput)
- [ ] **added** net.isIPv4(input) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netisipv4input)
- [ ] **added** net.isIPv6(input) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netisipv6input)
- [ ] **added** Event: 'SIGINT' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-sigint)
- [ ] **added** replServer.defineCommand(keyword, cmd) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#replserverdefinecommandkeyword-cmd)
- [ ] **added** util.inherits(constructor, superConstructor) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilinheritsconstructor-superconstructor)
- [ ] **added** util.inspect(object[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilinspectobject-options)
- [ ] **added** util.debug(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utildebugstring)
- [ ] **added** util.error([...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilerror)
- [ ] **added** util.log(string) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utillogstring)
- [ ] **added** util.print([...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilprint)
- [ ] **added** util.puts([...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/util.md#utilputs)

### Version 0.2.0

- [ ] **added** server.connections [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverconnections)
- [ ] **added** server.maxConnections [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#servermaxconnections)
- [ ] **added** process.versions [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processversions)

### Version 0.1.104

- [ ] **added** console.time(label) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoletimelabel)
- [ ] **added** console.timeEnd(label) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoletimeendlabel)
- [ ] **added** console.trace(message[, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoletracemessage-)
- [ ] **added** process.title [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processtitle)
- [ ] **added** Class: Interface [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#class-interface)

### Version 0.1.101

- [ ] **added** Class Method: Buffer.isBuffer(obj) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferisbufferobj)
- [ ] **added** console.assert(value[, message][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoleassertvalue-message-)
- [ ] **added** console.dir(obj[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoledirobj-options)
- [ ] **added** socket.setTTL(ttl) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketsetttlttl)
- [ ] **added** emitter.on(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitteroneventname-listener)

### Version 0.1.100

- [ ] **added** console.error([data][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoleerrordata-)
- [ ] **added** console.info([data][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consoleinfodata-)
- [ ] **added** console.log([data][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consolelogdata-)
- [ ] **added** console.warn([data][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/console.md#consolewarndata-)
- [ ] **added** process.execPath [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processexecpath)

### Version 0.1.99

- [ ] **added** Class: dgram.Socket [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#class-dgramsocket)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#event-close)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#event-error)
- [ ] **added** Event: 'listening' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#event-listening)
- [ ] **added** Event: 'message' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#event-message)
- [ ] **added** socket.address() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketaddress)
- [ ] **added** socket.bind([port][, address][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketbindport-address-callback)
- [ ] **added** socket.close([callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketclosecallback)
- [ ] **added** socket.send(msg, [offset, length,] port, address[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#socketsendmsg-offset-length-port-address-callback)
- [ ] **added** dgram.createSocket(type[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dgram.md#dgramcreatesockettype-callback)
- [ ] **added** Class: new StringDecoder([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/string_decoder.md#class-new-stringdecoderencoding)
- [ ] **added** stringDecoder.write(buffer) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/string_decoder.md#stringdecoderwritebuffer)

### Version 0.1.98

- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-close)
- [ ] **added** Event: 'line' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#event-line)
- [ ] **added** rl.close() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlclose)
- [ ] **added** rl.prompt([preserveCursor]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlpromptpreservecursor)
- [ ] **added** rl.setPrompt(prompt) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlsetpromptprompt)
- [ ] **added** rl.write(data[, key]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#rlwritedata-key)
- [ ] **added** readline.createInterface(options) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/readline.md#readlinecreateinterfaceoptions)

### Version 0.1.97

- [ ] **added** assert.ifError(value) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertiferrorvalue)
- [ ] **added** fs.chown(path, uid, gid, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fschownpath-uid-gid-callback)
- [ ] **added** fs.chownSync(path, uid, gid) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fschownsyncpath-uid-gid)

### Version 0.1.96

- [ ] **added** fs.fdatasync(fd, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfdatasyncfd-callback)
- [ ] **added** fs.fdatasyncSync(fd) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfdatasyncsyncfd)
- [ ] **added** fs.fsync(fd, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfsyncfd-callback)
- [ ] **added** fs.fsyncSync(fd) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfsyncsyncfd)

### Version 0.1.95

- [ ] **added** fs.fstat(fd, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfstatfd-callback)
- [ ] **added** fs.fstatSync(fd) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsfstatsyncfd)

### Version 0.1.94

- [ ] **added** Class: Cipher [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-cipher)
- [ ] **added** cipher.final([output_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cipherfinaloutput_encoding)
- [ ] **added** cipher.update(data[, input_encoding][, output_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cipherupdatedata-input_encoding-output_encoding)
- [ ] **added** Class: Decipher [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-decipher)
- [ ] **added** decipher.final([output_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#decipherfinaloutput_encoding)
- [ ] **added** decipher.update(data[, input_encoding][, output_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#decipherupdatedata-input_encoding-output_encoding)
- [ ] **added** Class: Hmac [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-hmac)
- [ ] **added** hmac.digest([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#hmacdigestencoding)
- [ ] **added** hmac.update(data[, input_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#hmacupdatedata-input_encoding)
- [ ] **added** crypto.createCipher(algorithm, password) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatecipheralgorithm-password)
- [ ] **added** crypto.createDecipher(algorithm, password) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatedecipheralgorithm-password)
- [ ] **added** crypto.createDecipheriv(algorithm, key, iv) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatedecipherivalgorithm-key-iv)
- [ ] **added** crypto.createHmac(algorithm, key) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatehmacalgorithm-key)
- [ ] **added** Event: 'upgrade' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-upgrade)
- [ ] **added** Event: 'clientError' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-clienterror)
- [ ] **added** Event: 'upgrade' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-upgrade-1)

### Version 0.1.93

- [ ] **added** Class: fs.ReadStream [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#class-fsreadstream)
- [ ] **added** Event: 'open' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#event-open)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#event-close)
- [ ] **added** readStream.path [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#readstreampath)
- [ ] **added** Class: fs.WriteStream [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#class-fswritestream)
- [ ] **added** Event: 'open' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#event-open-1)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#event-close-1)
- [ ] **added** writeStream.path [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#writestreampath)

### Version 0.1.92

- [ ] **added** Class: Hash [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-hash)
- [ ] **added** hash.digest([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#hashdigestencoding)
- [ ] **added** hash.update(data[, input_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#hashupdatedata-input_encoding)
- [ ] **added** Class: Sign [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-sign)
- [ ] **added** sign.sign(private_key[, output_format]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#signsignprivate_key-output_format)
- [ ] **added** sign.update(data[, input_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#signupdatedata-input_encoding)
- [ ] **added** Class: Verify [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#class-verify)
- [ ] **added** verifier.update(data[, input_encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#verifierupdatedata-input_encoding)
- [ ] **added** verifier.verify(object, signature[, signature_format]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#verifierverifyobject-signature-signature_format)
- [ ] **added** crypto.createCredentials(details) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatecredentialsdetails)
- [ ] **added** crypto.createHash(algorithm) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatehashalgorithm)
- [ ] **added** crypto.createSign(algorithm) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreatesignalgorithm)
- [ ] **added** crypto.createVerify(algorithm) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/crypto.md#cryptocreateverifyalgorithm)
- [ ] **added** socket.setKeepAlive([enable][, initialDelay]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketsetkeepaliveenable-initialdelay)

### Version 0.1.91

- [ ] **added** child_process.execFile(file[, args][, options][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processexecfilefile-args-options-callback)
- [ ] **added** Class: REPLServer [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#class-replserver)
- [ ] **added** replServer.displayPrompt([preserveCursor]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#replserverdisplaypromptpreservecursor)
- [ ] **added** repl.start([options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/repl.md#replstartoptions)

### Version 0.1.90

- [ ] **added** Class Method: Buffer.byteLength(string[, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#class-method-bufferbytelengthstring-encoding)
- [ ] **added** buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufcopytarget-targetstart-sourcestart-sourceend)
- [ ] **added** buf.length [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#buflength)
- [ ] **added** buf.toString([encoding[, start[, end]]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#buftostringencoding-start-end)
- [ ] **added** buf.write(string[, offset[, length]][, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/buffer.md#bufwritestring-offset-length-encoding)
- [ ] **added** child_process.exec(command[, options][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processexeccommand-options-callback)
- [ ] **added** child_process.spawn(command[, args][, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#child_processspawncommand-args-options)
- [ ] **added** Event: 'exit' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#event-exit)
- [ ] **added** child.kill([signal]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childkillsignal)
- [ ] **added** child.pid [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childpid)
- [ ] **added** child.stderr [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childstderr)
- [ ] **added** child.stdin [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childstdin)
- [ ] **added** child.stdout [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/child_process.md#childstdout)
- [ ] **added** dns.lookup(hostname[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnslookuphostname-options-callback)
- [ ] **added** dns.resolveNs(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvenshostname-callback)
- [ ] **added** request.end([data][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestenddata-encoding-callback)
- [ ] **added** server.close([callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#serverclosecallback)
- [ ] **added** server.listen(path[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#serverlistenpath-callback)
- [ ] **added** server.listen([port][, hostname][, backlog][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#serverlistenport-hostname-backlog-callback)
- [ ] **added** response.end([data][, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responseenddata-encoding-callback)
- [ ] **added** message.url [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messageurl)
- [ ] **added** server.close([callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/https.md#serverclosecallback)
- [ ] **added** Class: net.Server [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#class-netserver)
- [ ] **added** Event: 'connection' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-connection)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-error)
- [ ] **added** Event: 'listening' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-listening)
- [ ] **added** server.address() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serveraddress)
- [ ] **added** server.close([callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverclosecallback)
- [ ] **added** server.listen(path[, backlog][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverlistenpath-backlog-callback)
- [ ] **added** server.listen([port][, hostname][, backlog][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#serverlistenport-hostname-backlog-callback)
- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-close-1)
- [ ] **added** Event: 'connect' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-connect)
- [ ] **added** Event: 'data' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-data)
- [ ] **added** Event: 'drain' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-drain)
- [ ] **added** Event: 'end' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-end)
- [ ] **added** Event: 'error' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-error-1)
- [ ] **added** Event: 'timeout' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#event-timeout)
- [ ] **added** socket.address() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketaddress)
- [ ] **added** socket.connect(options[, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketconnectoptions-connectlistener)
- [ ] **added** socket.connect(port[, host][, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketconnectport-host-connectlistener)
- [ ] **added** socket.destroy([exception]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketdestroyexception)
- [ ] **added** socket.end([data][, encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketenddata-encoding)
- [ ] **added** socket.setEncoding([encoding]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketsetencodingencoding)
- [ ] **added** socket.setNoDelay([noDelay]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketsetnodelaynodelay)
- [ ] **added** socket.setTimeout(timeout[, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketsettimeouttimeout-callback)
- [ ] **added** socket.write(data[, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#socketwritedata-encoding-callback)
- [ ] **added** net.connect(path[, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netconnectpath-connectlistener)
- [ ] **added** net.connect(port[, host][, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netconnectport-host-connectlistener)
- [ ] **added** net.createConnection(options[, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netcreateconnectionoptions-connectlistener)
- [ ] **added** net.createConnection(path[, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netcreateconnectionpath-connectlistener)
- [ ] **added** net.createConnection(port[, host][, connectListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/net.md#netcreateconnectionport-host-connectlistener)

### Version 0.1.32

- [ ] **added** `NODE_DEBUG=module[,…]` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#node_debugmodule)
- [ ] **added** `NODE_PATH=path[:…]` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#node_pathpath)

### Version 0.1.31

- [ ] **added** fs.createReadStream(path[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fscreatereadstreampath-options)
- [ ] **added** fs.createWriteStream(path[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fscreatewritestreampath-options)
- [ ] **added** fs.link(srcpath, dstpath, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslinksrcpath-dstpath-callback)
- [ ] **added** fs.linkSync(srcpath, dstpath) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslinksyncsrcpath-dstpath)
- [ ] **added** fs.readlink(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreadlinkpath-options-callback)
- [ ] **added** fs.readlinkSync(path[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreadlinksyncpath-options)
- [ ] **added** fs.realpath(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsrealpathpath-options-callback)
- [ ] **added** fs.realpathSync(path[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsrealpathsyncpath-options)
- [ ] **added** fs.symlink(target, path[, type], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fssymlinktarget-path-type-callback)
- [ ] **added** fs.symlinkSync(target, path[, type]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fssymlinksynctarget-path-type)
- [ ] **added** fs.unwatchFile(filename[, listener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsunwatchfilefilename-listener)
- [ ] **added** fs.watchFile(filename[, options], listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswatchfilefilename-options-listener)
- [ ] **added** process.getgid() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processgetgid)
- [ ] **added** process.setgid(id) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processsetgidid)

### Version 0.1.30

- [ ] **added** fs.chmod(path, mode, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fschmodpath-mode-callback)
- [ ] **added** fs.lstat(path, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslstatpath-callback)
- [ ] **added** fs.lstatSync(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fslstatsyncpath)
- [ ] **added** response.writeHead(statusCode[, statusMessage][, headers]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsewriteheadstatuscode-statusmessage-headers)

### Version 0.1.29

- [ ] **added** fs.readFile(file[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreadfilefile-options-callback)
- [ ] **added** fs.writeFile(file, data[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswritefilefile-data-options-callback)
- [ ] **added** fs.writeFileSync(file, data[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswritefilesyncfile-data-options)
- [ ] **added** request.write(chunk[, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#requestwritechunk-encoding-callback)
- [ ] **added** response.write(chunk[, encoding][, callback]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsewritechunk-encoding-callback)

### Version 0.1.28

- [ ] **added** process.getuid() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processgetuid)
- [ ] **added** process.setuid(id) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processsetuidid)

### Version 0.1.27

- [ ] **added** dns.resolve(hostname[, rrtype], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvehostname-rrtype-callback)
- [ ] **added** dns.resolveMx(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvemxhostname-callback)
- [ ] **added** dns.resolveSrv(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvesrvhostname-callback)
- [ ] **added** dns.resolveTxt(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolvetxthostname-callback)
- [ ] **added** process.argv [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processargv)
- [ ] **added** process.env [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processenv)

### Version 0.1.26

- [ ] **added** Class: EventEmitter [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#class-eventemitter)
- [ ] **added** Event: 'newListener' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#event-newlistener)
- [ ] **added** emitter.addListener(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitteraddlistenereventname-listener)
- [ ] **added** emitter.emit(eventName[, arg1][, arg2][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitteremiteventname-arg1-arg2-)
- [ ] **added** emitter.listeners(eventName) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitterlistenerseventname)
- [ ] **added** emitter.removeAllListeners([eventName]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitterremovealllistenerseventname)
- [ ] **added** emitter.removeListener(eventName, listener) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/events.md#emitterremovelistenereventname-listener)
- [ ] **added** process.nextTick(callback[, arg][, ...]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processnexttickcallback-arg-)

### Version 0.1.25

- [ ] **added** path.basename(path[, ext]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathbasenamepath-ext)
- [ ] **added** path.extname(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathextnamepath)
- [ ] **added** querystring.escape(str) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/querystring.md#querystringescapestr)
- [ ] **added** querystring.parse(str[, sep[, eq[, options]]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/querystring.md#querystringparsestr-sep-eq-options)
- [ ] **added** querystring.stringify(obj[, sep[, eq[, options]]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/querystring.md#querystringstringifyobj-sep-eq-options)
- [ ] **added** querystring.unescape(str) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/querystring.md#querystringunescapestr)
- [ ] **added** url.format(urlObject) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/url.md#urlformaturlobject)
- [ ] **added** url.parse(urlString[, parseQueryString[, slashesDenoteHost]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/url.md#urlparseurlstring-parsequerystring-slashesdenotehost)
- [ ] **added** url.resolve(from, to) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/url.md#urlresolvefrom-to)

### Version 0.1.23

- [ ] **added** path.normalize(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathnormalizepath)

### Version 0.1.22

- [ ] **added** http.STATUS_CODES [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpstatus_codes)

### Version 0.1.21

- [ ] **added** assert.deepEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertdeepequalactual-expected-message)
- [ ] **added** assert.doesNotThrow(block[, error][, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertdoesnotthrowblock-error-message)
- [ ] **added** assert.equal(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertequalactual-expected-message)
- [ ] **added** assert.fail(actual, expected, message, operator) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertfailactual-expected-message-operator)
- [ ] **added** assert.notDeepEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertnotdeepequalactual-expected-message)
- [ ] **added** assert.notEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertnotequalactual-expected-message)
- [ ] **added** assert.notStrictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertnotstrictequalactual-expected-message)
- [ ] **added** assert.ok(value[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertokvalue-message)
- [ ] **added** assert.strictEqual(actual, expected[, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertstrictequalactual-expected-message)
- [ ] **added** assert.throws(block[, error][, message]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/assert.md#assertthrowsblock-error-message)
- [ ] **added** Class: fs.Stats [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#class-fsstats)
- [ ] **added** fs.closeSync(fd) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsclosesyncfd)
- [ ] **added** fs.existsSync(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsexistssyncpath)
- [ ] **added** fs.mkdirSync(path[, mode]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsmkdirsyncpath-mode)
- [ ] **added** fs.openSync(path, flags[, mode]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsopensyncpath-flags-mode)
- [ ] **added** fs.readdirSync(path[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreaddirsyncpath-options)
- [ ] **added** fs.readSync(fd, buffer, offset, length, position) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreadsyncfd-buffer-offset-length-position)
- [ ] **added** fs.renameSync(oldPath, newPath) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsrenamesyncoldpath-newpath)
- [ ] **added** fs.rmdirSync(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsrmdirsyncpath)
- [ ] **added** fs.statSync(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsstatsyncpath)
- [ ] **added** fs.unlinkSync(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsunlinksyncpath)
- [ ] **added** fs.writeSync(fd, buffer, offset, length[, position]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswritesyncfd-buffer-offset-length-position)

### Version 0.1.19

- [ ] **added** process.umask([mask]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processumaskmask)

### Version 0.1.18

- [ ] **added** Event: 'uncaughtException' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-uncaughtexception)

### Version 0.1.17

- [ ] **added** Class: http.ClientRequest [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#class-httpclientrequest)
- [ ] **added** Class: http.Server [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#class-httpserver)
- [ ] **added** Class: http.ServerResponse [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#class-httpserverresponse)
- [ ] **added** Class: http.IncomingMessage [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#class-httpincomingmessage)
- [ ] **added** process.chdir(directory) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processchdirdirectory)
- [ ] **added** process.mainModule [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processmainmodule)

### Version 0.1.16

- [ ] **added** dns.resolve4(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolve4hostname-callback)
- [ ] **added** dns.resolve6(hostname, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsresolve6hostname-callback)
- [ ] **added** dns.reverse(ip, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/dns.md#dnsreverseip-callback)
- [ ] **added** The `module` Object [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#the-module-object)
- [ ] **added** module.children [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#modulechildren)
- [ ] **added** module.exports [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#moduleexports)
- [ ] **added** exports alias [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#exports-alias)
- [ ] **added** module.filename [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#modulefilename)
- [ ] **added** module.id [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#moduleid)
- [ ] **added** module.loaded [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#moduleloaded)
- [ ] **added** module.parent [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/modules.md#moduleparent)
- [ ] **added** path.dirname(path) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathdirnamepath)
- [ ] **added** path.join([path[, ...]]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/path.md#pathjoinpath-)
- [ ] **added** process.memoryUsage() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processmemoryusage)
- [ ] **added** process.platform [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processplatform)

### Version 0.1.15

- [ ] **added** process.pid [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processpid)

### Version 0.1.13

- [ ] **added** http.createClient([port][, host]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpcreateclientport-host)
- [ ] **added** http.createServer([requestListener]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#httpcreateserverrequestlistener)
- [ ] **added** process.exit([code]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processexitcode)

### Version 0.1.8

- [ ] **added** fs.mkdir(path[, mode], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsmkdirpath-mode-callback)
- [ ] **added** fs.readdir(path[, options], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreaddirpath-options-callback)
- [ ] **added** fs.readFileSync(file[, options]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreadfilesyncfile-options)
- [ ] **added** process.cwd() [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processcwd)

### Version 0.1.7

- [ ] **added** Event: 'exit' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#event-exit)

### Version 0.1.5

- [ ] **added** message.headers [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messageheaders)

### Version 0.1.4

- [ ] **added** Event: 'close' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-close)

### Version 0.1.3

- [ ] **added** `-v`, `--version` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-v---version)
- [ ] **added** `-h`, `--help` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#-h---help)
- [ ] **added** `--v8-options` [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/cli.md#--v8-options)
- [ ] **added** process.version [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processversion)

### Version 0.1.1

- [ ] **added** message.httpVersion [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagehttpversion)
- [ ] **added** message.method [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagemethod)
- [ ] **added** message.statusCode [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#messagestatuscode)

### Version 0.1.0

- [ ] **added** Event: 'response' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-response)
- [ ] **added** Event: 'connection' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-connection)
- [ ] **added** Event: 'request' [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#event-request)

### Version 0.0.6

- [ ] **added** process.kill(pid[, signal]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/process.md#processkillpid-signal)

### Version 0.0.2

- [ ] **added** fs.close(fd, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsclosefd-callback)
- [ ] **added** fs.exists(path, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsexistspath-callback)
- [ ] **added** fs.open(path, flags[, mode], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsopenpath-flags-mode-callback)
- [ ] **added** fs.read(fd, buffer, offset, length, position, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsreadfd-buffer-offset-length-position-callback)
- [ ] **added** fs.rename(oldPath, newPath, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsrenameoldpath-newpath-callback)
- [ ] **added** fs.rmdir(path, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsrmdirpath-callback)
- [ ] **added** fs.stat(path, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsstatpath-callback)
- [ ] **added** fs.unlink(path, callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fsunlinkpath-callback)
- [ ] **added** fs.write(fd, buffer, offset, length[, position], callback) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/fs.md#fswritefd-buffer-offset-length-position-callback)
- [ ] **added** response.finished [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/http.md#responsefinished)

### Version 0.0.1

- [ ] **added** setInterval(callback, delay[, ...arg]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#setintervalcallback-delay-arg)
- [ ] **added** setTimeout(callback, delay[, ...arg]) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#settimeoutcallback-delay-arg)
- [ ] **added** clearInterval(timeout) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#clearintervaltimeout)
- [ ] **added** clearTimeout(timeout) [[+]](https://github.com/nodejs/node/blob/v6.6.0/doc/api/timers.md#cleartimeouttimeout)

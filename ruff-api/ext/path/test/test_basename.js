var path = require('../');
var assert = require('assert');

exports['test should run basename'] = function () {
    assert.equal(path.basename(__filename), 'test_basename.js');
    assert.equal(path.basename(__filename, '.js'), 'test_basename');
    assert.equal(path.basename(''), '');
    assert.equal(path.basename('/dir/basename.ext'), 'basename.ext');
    assert.equal(path.basename('/basename.ext'), 'basename.ext');
    assert.equal(path.basename('basename.ext'), 'basename.ext');
    assert.equal(path.basename('basename.ext', '.ext'), 'basename');
    assert.equal(path.basename('basename.ext/'), 'basename.ext');
    assert.equal(path.basename('basename.ext//'), 'basename.ext');

    // On Windows a backslash acts as a path separator.
    assert.equal(path.win32.basename('\\dir\\basename.ext'), 'basename.ext');
    assert.equal(path.win32.basename('\\basename.ext'), 'basename.ext');
    assert.equal(path.win32.basename('basename.ext'), 'basename.ext');
    assert.equal(path.win32.basename('basename.ext\\'), 'basename.ext');
    assert.equal(path.win32.basename('basename.ext\\\\'), 'basename.ext');
    assert.equal(path.win32.basename('foo'), 'foo');

    // On unix a backslash is just treated as any other character.
    assert.equal(path.posix.basename('\\dir\\basename.ext'), '\\dir\\basename.ext');
    assert.equal(path.posix.basename('\\basename.ext'), '\\basename.ext');
    assert.equal(path.posix.basename('basename.ext'), 'basename.ext');
    assert.equal(path.posix.basename('basename.ext\\'), 'basename.ext\\');
    assert.equal(path.posix.basename('basename.ext\\\\'), 'basename.ext\\\\');
    assert.equal(path.posix.basename('foo'), 'foo');

    // POSIX filenames may include control characters
    // c.f. http://www.dwheeler.com/essays/fixing-unix-linux-filenames.html
    var controlCharFilename = 'Icon' + String.fromCharCode(13);
    assert.equal(path.posix.basename('/a/b/' + controlCharFilename),
            controlCharFilename);
};
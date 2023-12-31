# Path

This module contains utilities for handling and transforming file
paths.  Almost all these methods perform only string transformations.
The file system is not consulted to check whether paths are valid.

Use `require('path')` to use this module.  The following methods are provided:

## path.normalize(p)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Normalize a string path, taking care of `'..'` and `'.'` parts.

When multiple slashes are found, they're replaced by a single one;
when the path contains a trailing slash, it is preserved.

Example:

    path.normalize('/foo/bar//baz/asdf/quux/..')
    // returns
    '/foo/bar/baz/asdf'

*Note:* If the path string passed as argument is a zero-length string then `'.'`
        will be returned, which represents the current working directory.

## path.join([path1][, path2][, ...])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Join all arguments together and normalize the resulting path.

Arguments must be strings. When non-string arguments were
passed, an exception is thrown.

Example:

    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
    // returns
    '/foo/bar/baz/asdf'

    path.join('foo', {}, 'bar')
    // throws exception
    TypeError: Arguments to path.join must be strings

*Note:* If the arguments to `join` have zero-length strings, unlike other path
        module functions, they will be ignored. If the joined path string is a
        zero-length string then `'.'` will be returned, which represents the
        current working directory.

## path.resolve([from ...], to)
<span class="api-platform">Ruff available: v1.6.0</span>

Resolves `to` to an absolute path.

If `to` isn't already absolute `from` arguments are prepended in right to left
order, until an absolute path is found. If after using all `from` paths still
no absolute path is found, the current working directory is used as well. The
resulting path is normalized, and trailing slashes are removed unless the path
gets resolved to the root directory. Non-string `from` arguments are ignored.

Another way to think of it is as a sequence of `cd` commands in a shell.

    path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')

Is similar to:

    cd foo/bar
    cd /tmp/file/
    cd ..
    cd a/../subfile
    pwd

The difference is that the different paths don't need to exist and may also be
files.

Examples:

    path.resolve('/foo/bar', './baz')
    // returns
    '/foo/bar/baz'

    path.resolve('/foo/bar', '/tmp/file/')
    // returns
    '/tmp/file'

    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
    // if currently in /home/myself/node, it returns
    '/home/myself/node/wwwroot/static_files/gif/image.gif'

*Note:* If the arguments to `resolve` have zero-length strings then the current
        working directory will be used instead of them.

## path.isAbsolute(path)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Determines whether `path` is an absolute path. An absolute path will always
resolve to the same location, regardless of the working directory.

Posix examples:

    path.isAbsolute('/foo/bar') // true
    path.isAbsolute('/baz/..')  // true
    path.isAbsolute('qux/')     // false
    path.isAbsolute('.')        // false

*Note:* If the path string passed as parameter is a zero-length string, unlike
        other path module functions, it will be used as-is and `false` will be
        returned.

## path.relative(from, to)
<span class="api-platform">Ruff available: v1.6.0</span>

Solve the relative path from `from` to `to`.

At times we have two absolute paths, and we need to derive the relative
path from one to the other.  This is actually the reverse transform of
`path.resolve`, which means we see that:

    path.resolve(from, path.relative(from, to)) == path.resolve(to)

Examples:

    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
    // returns
    '../../impl/bbb'

*Note:* If the arguments to `relative` have zero-length strings then the current
        working directory will be used instead of the zero-length strings. If
        both the paths are the same then a zero-length string will be returned.

## path.dirname(p)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Return the directory name of a path.  Similar to the Unix `dirname` command.

Example:

    path.dirname('/foo/bar/baz/asdf/quux')
    // returns
    '/foo/bar/baz/asdf'

## path.basename(p[, ext])
<span class="api-platform">Ruff available: v1.6.0</span>

Return the last portion of a path.  Similar to the Unix `basename` command.

Example:

    path.basename('/foo/bar/baz/asdf/quux.html')
    // returns
    'quux.html'

    path.basename('/foo/bar/baz/asdf/quux.html', '.html')
    // returns
    'quux'

## path.extname(p)
<span class="api-platform">Ruff available: v1.6.0</span>

Return the extension of the path, from the last '.' to end of string
in the last portion of the path.  If there is no '.' in the last portion
of the path or the first character of it is '.', then it returns
an empty string.  Examples:

    path.extname('index.html')
    // returns
    '.html'

    path.extname('index.coffee.md')
    // returns
    '.md'

    path.extname('index.')
    // returns
    '.'

    path.extname('index')
    // returns
    ''

    path.extname('.index')
    // returns
    ''

## path.sep
<span class="api-platform">Ruff available: v1.6.0</span>

The platform-specific file separator. `'\\'` or `'/'`.

An example:

    'foo/bar/baz'.split(path.sep)
    // returns
    ['foo', 'bar', 'baz']

## path.delimiter
<span class="api-platform">Ruff available: v1.6.0</span>

The platform-specific path delimiter, `;` or `':'`.

An example:

    console.log(process.env.PATH)
    // '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

    process.env.PATH.split(path.delimiter)
    // returns
    ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

## path.parse(pathString)
<span class="api-platform">Ruff available: v1.6.0</span>

Returns an object from a path string.

An example:

    path.parse('/home/user/dir/file.txt')
    // returns
    {
        root : "/",
        dir : "/home/user/dir",
        base : "file.txt",
        ext : ".txt",
        name : "file"
    }

## path.format(pathObject)
<span class="api-platform">Ruff available: v1.6.0</span>

Returns a path string from an object, the opposite of `path.parse` above.

    path.format({
        root : "/",
        dir : "/home/user/dir",
        base : "file.txt",
        ext : ".txt",
        name : "file"
    })
    // returns
    '/home/user/dir/file.txt'

$ = require('ruff');

var entry = undefined;

/*
 *
 * Ruff App entry strategy (according to priority):
 *
 * 1. process.argv
 * 2. main field of package.json
 * 3. src/index.js
 *
 * TODO: retry next after require fails
 *
 */
var argEntry = process.argv[process.argv.length - 1];

if (argEntry && argEntry.indexOf('js') >= 0) {
    entry = argEntry;
}

if (entry === undefined) {
    var packageJson = require('package.json');
    entry = packageJson.main;
}

if (entry === undefined) {
    entry = 'src/index.js';
}

require(entry);

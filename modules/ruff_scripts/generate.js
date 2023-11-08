/* eslint-env es6 */

'use strict';

const Path = require('path');

const FS = require('fs-extra');

const processIncludes = require('./preprocess.js');

let format = 'json';
let template = null;
let inputPath = null;

for (let arg of process.argv.slice(2)) {
    if (!arg.match(/^\-\-/)) {
        inputPath = arg;
    } else if (arg.match(/^\-\-format=/)) {
        format = arg.replace(/^\-\-format=/, '');
    } else if (arg.match(/^\-\-template=/)) {
        template = arg.replace(/^\-\-template=/, '');
    }
}

if (!inputPath) {
    throw new Error('No input file specified');
}

console.error('Input file = %s', inputPath);

let markdown = FS.readFileSync(inputPath, 'utf-8');

processIncludes(inputPath, markdown, () => {
    switch (format) {
        case 'json':
            require('./json.js')(markdown, inputPath, function (er, obj) {
                if (er) {
                    throw er;
                }

                console.log(JSON.stringify(obj, null, 2));
            });
            break;

        case 'html':
            require('./html.js')(markdown, inputPath, template, function (er, html) {
                if (er) {
                    throw er;
                }

                console.log(html);
            });
            break;

        default:
            throw new Error('Invalid format: ' + format);
    }
});

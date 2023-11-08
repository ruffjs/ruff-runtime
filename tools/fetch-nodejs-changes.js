'use strict';

const FS = require('fs');
const Path = require('path');

const Slugger = require('github-slugger');
const SemVer = require('semver');
const Tmp = require('tmp');
const fetch = require('node-fetch');
const v = require('villa');

const OWNER = 'nodejs';
const REPO = 'node';
const GITHUB_OAUTH_TOKEN = '5e59a019a13979b08e85efd340012ef7a556281d';
const NODEJS_API_DOC_DIR = Path.join(__dirname, 'nodejs-api-doc');
const NODEJS_CHANGES_FILE_PATH = Path.join(__dirname, '../nodejs-changes.md');

const SINCE_VERSION_REGEX = /<!--\s*since-version:\s*([^\s>]+)\s*-->\s*\n[^\s<].+/;
const CHANGES_LIST_REGEX = /<!--\s*changes-list\s*-->/;

console.log('Fetching tags...');

readCurrentChangesFile()
    .then(metadata => {
        let sinceVersion = metadata.since;
        let content = metadata.content;

        return getTags(sinceVersion)
            .then(tags => {
                if (!tags.length) {
                    console.log('No newer tag.');
                    return undefined;
                }

                console.log(`Fetched ${tags.length} newer tag(s).`);
                console.log('Updating Node.js documentation files...');

                let tagName = tags[0].name;

                return updateNodeDocumentations(tagName)
                    .then(updated => console.log(`Updated ${updated} file(s).`))
                    .then(() => getChangedAPIs(sinceVersion && tags.map(tag => tag.name)))
                    .then(apis => updateChangesFile(content, tagName, apis));
            });
    })
    .catch(error => {
        console.error(error.stack);
        process.exit(1);
    });

function readCurrentChangesFile() {
    return v
        .call(FS.readFile, NODEJS_CHANGES_FILE_PATH, 'utf-8')
        .then(text => {
            let captures = SINCE_VERSION_REGEX.exec(text);
            let sinceVersion = captures[1];

            return {
                content: text,
                since: sinceVersion === 'none' ? undefined : sinceVersion
            };
        });
}

function updateChangesFile(content, tagName, apis) {
    let version = tagName.replace(/^v/, '');

    content = content
        .replace(SINCE_VERSION_REGEX, `<!-- since-version: ${version} -->\n
The latest synchronized version is ${version}.`);

    if (apis.length) {
        let markdown = generateChangesMarkdown(apis, tagName);
        content = content.replace(CHANGES_LIST_REGEX, text => `${text}\n\n${markdown}`);
    }

    return v
        .call(FS.writeFile, NODEJS_CHANGES_FILE_PATH, content)
        .then(() => console.log(`Updated Node.js changes file with ${apis.length} API updates.`));
}

function generateChangesMarkdown(apis, sourceTagName) {
    let apisMap = new Map();

    for (let api of apis) {
        let version = api.version;
        let versionSpecificAPIs = apisMap.get(version);

        if (versionSpecificAPIs) {
            versionSpecificAPIs.push(api);
        } else {
            apisMap.set(version, [api]);
        }
    }

    let versions = Array.from(apisMap.keys());

    return versions
        .sort(SemVer.rcompare)
        .map(version => generateChangesMarkdownForVersion(apisMap.get(version), version, sourceTagName))
        .join('\n\n');
}

function generateChangesMarkdownForVersion(apis, version, sourceTagName) {
    let apisMarkdown = apis
        .map(api => `\
- [ ] **${api.verb}** ${api.heading} [[+]](https://github.com/nodejs/node/blob/${sourceTagName}/doc/api/${api.path}#${api.hash})`)
        .join('\n');

    return `\
### Version ${version}\n
${apisMarkdown}`;
}

function getTags(sinceVersion) {
    let url = `https://api.github.com/repos/${OWNER}/${REPO}/tags`;

    return authFetch(url)
        .then(response => response.json())
        .then(tags => {
            if (!sinceVersion) {
                return tags;
            }

            sinceVersion = sinceVersion.replace(/^v/, '');

            let sinceIndex = tags.findIndex(tag => {
                let version = tag.name.replace(/^v/, '');
                return SemVer.lte(version, sinceVersion);
            });

            if (sinceIndex < 0) {
                return tags;
            }

            return tags.slice(0, sinceIndex);
        });
}

function getChangedAPIs(tagNames) {
    return v
        .chainable(v.call(FS.readdir, NODEJS_API_DOC_DIR))
        .map(fileName => Path.join(NODEJS_API_DOC_DIR, fileName))
        .filter(fileName => v.call(FS.stat, fileName).then(() => true, () => false))
        .map(fileName => getChangedAPIsInFile(fileName, tagNames))
        .reduce((results, apis) => results.concat(apis), []);
}

function getChangedAPIsInFile(path, tagNames) {
    let yamlRegex = /#+\s*(.+)\s*<!--\s*YAML\s+([^]*?)\s*-->/gi;

    let tagNameRegexStr = tagNames && tagNames.length ?
        `v?(${tagNames.map(name => name.replace(/\./g, '\\.').replace(/^v?/, '')).join('|')})` :
        'v?(\\d+\\.\\d+\\.\\d+)';

    let verbRegex = new RegExp(`^\\s*(.+?)\\s*:\\s*${tagNameRegexStr}\\s*$`, 'gm');

    return v
        .call(FS.readFile, path, 'utf-8')
        .then(text => {
            let slugger = new Slugger();

            let apis = [];
            let yamlCaptures;

            // eslint-disable-next-line no-cond-assign
            while (yamlCaptures = yamlRegex.exec(text)) {
                let heading = yamlCaptures[1];
                let yaml = yamlCaptures[2];

                let verbCaptures;

                // eslint-disable-next-line no-cond-assign
                while (verbCaptures = verbRegex.exec(yaml)) {
                    apis.push({
                        heading,
                        path: Path.relative(NODEJS_API_DOC_DIR, path).replace(/\\/g, '/'),
                        hash: slugger.slug(heading),
                        verb: verbCaptures[1],
                        version: verbCaptures[2]
                    });
                }
            }

            return apis;
        });
}

function getAPIFileEntries(tagName) {
    let url = `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${tagName}`;
    return authFetch(url).then(response => response.json());
}

function updateNodeDocumentations(tagName) {
    let updated = 0;

    return getAPIFileEntries(tagName)
        .then(entries => v.each(entries, entry => {
            let path = Path.join(NODEJS_API_DOC_DIR, entry.path.replace(/^doc\/api\//, ''));
            let sha = getBlobShaOfFile(path);

            if (sha === entry.sha) {
                return undefined;
            }

            updated++;

            return fetch(entry.download_url).then(res => {
                let tmpPath = Tmp.tmpNameSync();

                let targetStream = FS.createWriteStream(tmpPath);
                let sourceStream = res.body;

                targetStream.write(`<!--${entry.sha}-->\n`);

                sourceStream.pipe(targetStream);

                return v
                    .awaitable(targetStream, 'close', [sourceStream])
                    .then(() => v.call(FS.rename, tmpPath, path));
            });
        }))
        .then(() => updated);
}

function authFetch(url) {
    return fetch(url, {
        headers: {
            authorization: `token ${GITHUB_OAUTH_TOKEN}`
        }
    });
}

function getBlobShaOfFile(path) {
    try {
        FS.statSync(path);
    } catch (error) {
        return undefined;
    }

    let fd = FS.openSync(path, 'r');
    let buffer = new Buffer(40);

    FS.readSync(fd, buffer, 0, buffer.length, 4);

    let sha = buffer.toString();

    FS.closeSync(fd);

    return sha;
}

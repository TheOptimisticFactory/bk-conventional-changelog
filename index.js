'use strict';

const { CHANGELOG: { GITHUB_USERNAMES = {}, REPOSITORY_TYPE = 'github', USERNAMES = {}} = {}} = require('config');
const { readFile } = require('fs').promises;
const { resolve } = require('path');

const legacyMergeRegex = /Merge pull request #[0-9]+ from .*/ig;
const semverRegex = /^[\d.]+.?-?(.*)?$/ig;
const fullNames = {
  ADD: '✅ Features',
  DEFAULT: '😭 Unclassified (not [following convention](https://github.com/sportheroes/bk-conventional-changelog#types-of-commits))',
  DOC: '☑️ Documentation',
  FIX: '✴️ Bug Fixes',
  MOD: '🔄 Notable changes',
  PUB: '⏩ Versioning',
  TEST: '🔀 Testing',
};

const FINAL_USERNAMES = {
  ...GITHUB_USERNAMES,
  ...USERNAMES,
};

const beautifyDescription = commit => {
  if (commit.shortDesc) {
    commit.shortDesc = commit.shortDesc.trim();
  }
};

const beautifyType = commit => {
  const description = commit.shortDesc || commit.header;
  let type = (commit.type) ? commit.type.trim() : 'DEFAULT';

  if (type === 'DEFAULT' && description?.match?.(legacyMergeRegex)) {
    type = 'PUB';

    if (!commit.scope) {
      commit.scope = 'Release';
    }
  }

  commit.type = (fullNames[type]) ? fullNames[type] : fullNames.MOD;
};

const beautifyScope = commit => {
  const scopeText = (commit.scope) ? commit.scope.trim() : 'Miscellaneous';

  commit.scope = scopeText.charAt(0).toUpperCase() + scopeText.slice(1);
};

const beautifyHash = commit => {
  if (typeof commit.hash === 'string') {
    // eslint-disable-next-line no-magic-numbers
    commit.hash = commit.hash.substring(0, 7);
  }
};

const setUsername = commit => {
  if (typeof commit.committerEmail === 'string') {
    if (FINAL_USERNAMES[commit.committerEmail]) {
      commit.username = FINAL_USERNAMES[commit.committerEmail];
    }
  }
};

const setMerger = commit => {
  if (typeof commit.mergerEmail === 'string') {
    if (FINAL_USERNAMES[commit.mergerEmail]) {
      commit.mergerUsername = FINAL_USERNAMES[commit.mergerEmail];
    }
  }
};

const process = commit => {
  const isReleaseCommit = (commit.type === fullNames.PUB && commit.scope === 'Release');

  // Discard release commit that aren't merges or lerna publish
  if (isReleaseCommit && commit.shortDesc && commit.shortDesc.match(semverRegex)) {
    return null;
  }

  return commit;
};

async function presetOpts() {
  const parserOpts = {
    headerCorrespondence: [
      'emoji',
      'type',
      'scope',
      'shortDesc',
    ],
    headerPattern: /^(?:\s|\t)*(?:([\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u23C2-\uF251])+.+?)?\[([A-Z]{3,4})\]\s(?:\((.*?)\))?\s?(.*)$/,
  };

  const writerOpts = {
    commitGroupsSort: 'title',
    commitsSort: [ 'scope', 'shortDesc' ],
    groupBy: 'type',
    transform(commit) {
      beautifyDescription(commit);
      beautifyType(commit);
      beautifyScope(commit);
      beautifyHash(commit);
      setUsername(commit);
      setMerger(commit);

      return process(commit);
    },
  };

  let commitTemplate = 'templates/commit.github.hbs';

  if (REPOSITORY_TYPE && REPOSITORY_TYPE.toLowerCase() === 'gitlab') {
    commitTemplate = 'templates/commit.gitlab.hbs';
  }

  const [ template, header, commit ] = await Promise.all([
    readFile(resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
    readFile(resolve(__dirname, 'templates/header.hbs'), 'utf-8'),
    readFile(resolve(__dirname, commitTemplate), 'utf-8'),
  ]);

  writerOpts.mainTemplate = template;
  writerOpts.headerPartial = header;
  writerOpts.commitPartial = commit;

  return {
    gitRawCommitsOpts: {
      /* eslint-disable no-inline-comments, no-multi-spaces */
      format: '%B' +                   // body
        '%n-hash-%n%H' +               // short hash
        '%n-gitTags-%n%d' +            // tags
        '%n-committerDate-%n%ci' +     // Committer date
        '%n-committerName-%n%aN' +     // Committer name (author)
        '%n-committerEmail-%n%aE' +    // Committer email (author)
        '%n-mergerName-%n%cN' +        // Merger name (committer)
        '%n-mergerEmail-%n%cE',        // Merger email (committer)
    },
    parserOpts,
    writerOpts,
  };
}

module.exports = presetOpts;

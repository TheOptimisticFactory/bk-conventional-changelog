'use strict';

const Q = require('q');
const readFile = Q.denodeify(require('fs').readFile);
const resolve = require('path').resolve;

const fullNames = {
  ADD: '✅ Features',
  DOC: '☑️ Documentation',
  FIX: '✴️ Bug Fixes',
  MOD: '🔄 Notable changes',
  PUB: '⏩ Versioning',
  TEST: '🔀 Testing',
};

const beautifyType = commit => {
  const type = commit.type;
  commit.type = (fullNames[type]) ? fullNames[type] : fullNames.MOD;
};

const beautifyScope = commit => {
  const scopeText = (commit.scope) ? commit.scope : 'Miscellaneous';
  commit.scope = scopeText.charAt(0).toUpperCase() + scopeText.slice(1);
};

const beautifyHash = commit => {
  if (typeof commit.hash === 'string') {
    commit.hash = commit.hash.substring(0, 7);
  }
};

function presetOpts(cb) {
  const parserOpts = {
    headerPattern: /^([\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251])+.+?\[([A-Z]{3,4})\]\s(?:\((.*?)\))?\s?(.*)$/,
    headerCorrespondence: [
      'emoji',
      'type',
      'scope',
      'shortDesc'
    ]
  };

  const writerOpts = {
    transform: function(commit) {
      if (!commit.type || typeof commit.type !== 'string') {
        return;
      }
      beautifyType(commit);
      beautifyScope(commit);
      beautifyHash(commit);

      return commit;
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'shortDesc']
  };

  Q.all([
    readFile(resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
    readFile(resolve(__dirname, 'templates/header.hbs'), 'utf-8'),
    readFile(resolve(__dirname, 'templates/commit.hbs'), 'utf-8')
  ])
    .spread(function(template, header, commit) {
      writerOpts.mainTemplate = template;
      writerOpts.headerPartial = header;
      writerOpts.commitPartial = commit;

      cb(null, {
        parserOpts: parserOpts,
        writerOpts: writerOpts
      });
    });
}

presetOpts.commitFormat = '%B' + // body
  '%n-hash-%n%H' +            // short hash  
  '%n-gitTags-%n%d' +         // tags
  '%n-committerDate-%n%ci' +  // Committer date
  '%n-committerName-%n%cN';   // Committer name

module.exports = presetOpts;

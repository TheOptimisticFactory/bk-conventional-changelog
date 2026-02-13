'use strict';

const { execSync } = require('child_process');
const conventionalChangelogCore = require('conventional-changelog-core');
const expect = require('chai').expect;
const fsPromises = require('fs/promises');
const path = require('path');
const through = require('through2');

const preset = require('./');
const TMP_DIRECTORY = path.join(__dirname, 'tmp');

const setupRuntime = async () => {
  await fsPromises.rm(TMP_DIRECTORY, {
    force: true,
    recursive: true,
  });

  await fsPromises.mkdir(TMP_DIRECTORY, {
    recursive: true,
  });

  process.chdir(TMP_DIRECTORY);

  execSync('git init --template=./git-templates', {
    stdio: 'ignore',
  });
};

const cleanupRuntime = async () => {
  process.chdir(__dirname);

  await fsPromises.rm(TMP_DIRECTORY, {
    force: true,
    recursive: true,
  });
};

const gitDummyCommit = msg => {
  // Use --allow-empty to create a commit without file changes
  // Use --no-gpg-sign to avoid hanging if the user has GPG signing enabled globally
  execSync(`git commit -m "${msg}" --allow-empty --no-gpg-sign`, {
    stdio: 'ignore',
  });
};

describe('SportHeroesGroup backend preset', () => {
  // eslint-disable-next-line mocha/no-hooks-for-single-case
  before(async () => {
    await setupRuntime();

    gitDummyCommit('Add default port AWS');
    gitDummyCommit('✅ [ADD] Sort by members count');
    gitDummyCommit('✴️ [FIX] (services) Include filters keys to promote target');
    gitDummyCommit('🔄 [MOD] (controllers) Change createRanking implementation, use count');
    gitDummyCommit('☑️ [DOC] (api) Added documentation to parseFilters middleware');
    gitDummyCommit('🔄 [MOD] (services) Events collections are now setup per ranking');
    gitDummyCommit('✅ [ADD] (services) KeyStore collections can now be cloned');
    gitDummyCommit('🔀 [TEST] (services) Adjusted MemoryRange unit tests');
    gitDummyCommit('⏩ [PUB] (release) Published sub-packages');
    gitDummyCommit('Merge pull request #2334 from sportheroes/romain/feature/facebook-email-fallback');
    gitDummyCommit(' ✴️ [FIX] (unitedMonthly) use getHighest date between userClientCreatedAt and exportStartAt');
    gitDummyCommit('⏩ [PUB] (release) 1.87.0');
    gitDummyCommit('[ADD] (app) display error message when user cannot fullscreen');
    gitDummyCommit('[FIX] (app, router) add optional token for public routes');
  });

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(async () => {
    await cleanupRuntime();
  });

  it('should work if there is no semver tag', done => {
    const params = {
      config: preset,
    };

    conventionalChangelogCore(params)
      .on('error', err => done(err))
      .pipe(through(chunk => {
        chunk = chunk.toString();

        // Changelog should include this commits
        expect(chunk).to.include('Add default port AWS');
        expect(chunk).to.include('Sort by members count');
        expect(chunk).to.include('Include filters keys to promote target');
        expect(chunk).to.include('Change createRanking implementation, use count');
        expect(chunk).to.include('Added documentation to parseFilters middleware');
        expect(chunk).to.include('Events collections are now setup per ranking');
        expect(chunk).to.include('KeyStore collections can now be cloned');
        expect(chunk).to.include('Adjusted MemoryRange unit tests');
        expect(chunk).to.include('Published sub-packages');
        expect(chunk).to.include('Merge pull request #2334 from sportheroes/romain/feature/facebook-email-fallback');
        expect(chunk).to.include('use getHighest date between userClientCreatedAt and exportStartAt');
        expect(chunk).to.include('display error message when user cannot fullscreen');
        expect(chunk).to.include('add optional token for public routes');

        // Changelog should NOT INCLUDE this commits
        expect(chunk).to.not.include('1.87.0');

        done();
      }));
  });
});

'use strict';

/* eslint no-magic-numbers:off, max-lines:off */

const { FlatCompat } = require('@eslint/eslintrc');
const babelEslintParser = require('@babel/eslint-parser');
const globals = require('globals');
const js = require('@eslint/js');
const pluginChaiExpect = require('eslint-plugin-chai-expect');
const pluginFilenames = require('eslint-plugin-filenames');
const pluginMocha = require('eslint-plugin-mocha');
const pluginN = require('eslint-plugin-n');
const pluginNoRelativeImports = require('eslint-plugin-no-relative-import-paths');
const pluginPromise = require('eslint-plugin-promise');
const pluginRegexp = require('eslint-plugin-regexp');
const pluginSecureCoding = require('eslint-plugin-secure-coding');
const pluginSortDestructure = require('eslint-plugin-sort-destructure-keys');
const pluginSortKeys = require('eslint-plugin-sort-keys-fix');

// Helper to mimic legacy behavior for older plugins
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // 1. Global Ignores (Equivalent to ignorePatterns)
  {
    ignores: [
      '**/node_modules/*',
      '**/.nyc_output/*',
      '**/tmp/*',
      '**/mochawesome-report/**',
      '.history/**',
      '.nyc_output/**',
      '.eslintrc.js',
      'coverage/**',
      'test-results.xml',
    ],
  },

  // 2. Base Configuration
  js.configs.recommended,
  ...compat.extends('plugin:import/errors', 'plugin:import/warnings'),
  ...compat.extends('plugin:n/recommended'),

  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
      parser: babelEslintParser,
      parserOptions: {
        allowImportExportEverywhere: false,
        requireConfigFile: false,
      },

      sourceType: 'script',
    },
    plugins: {
      /* eslint-disable quote-props */
      'chai-expect': pluginChaiExpect,
      'filenames': pluginFilenames,
      'mocha': pluginMocha.default,
      'n': pluginN,
      'no-relative-import-paths': pluginNoRelativeImports,
      'promise': pluginPromise,
      'regexp': pluginRegexp,
      'secure-coding': pluginSecureCoding,
      'sort-destructure-keys': pluginSortDestructure,
      'sort-keys-fix': pluginSortKeys,
      /* eslint-enable quote-props */
    },
    rules: {
      /* eslint-disable sort-keys-fix/sort-keys-fix */

      /* ======================= */
      /* ||  Possible Errors  || */
      /* ======================= */
      'no-buffer-constructor': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-character-class': 'error',
      'no-empty': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',

      // "no-extra-parens": "error",
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-prototype-builtins': 'error',
      'no-regex-spaces': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'use-isnan': 'error',

      /*
      "valid-jsdoc": ["error", {
        "matchDescription": ".+",
        "requireReturn": false,
        "prefer": {
          "arg": "param",
          "argument": "param",
          "class": "constructor",
          "return": "returns",
          "virtual": "abstract"
        },
        "preferType": {
          "boolean": "Boolean",
          "number": "Number",
          "object": "Object",
          "string": "String"
        }
      }],
      */
      'valid-typeof': 'error',

      /* ===================== */
      /* ||  Best Practices || */
      /* ===================== */
      'accessor-pairs': 'error',
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'class-methods-use-this': 'off',
      complexity: [ 'warn', {
        max: 30,
        variant: 'modified',
      }],
      'consistent-return': 'error',
      curly: [ 'error', 'all' ],
      'default-case': 'error',
      'dot-location': [ 'error', 'property' ],
      'dot-notation': 'error',
      eqeqeq: 'error',
      'guard-for-in': 'error',
      'no-alert': 'error',
      'no-caller': 'error',

      // no-case-declarations
      'no-div-regex': 'error',
      'no-else-return': 'error',

      // no-empty-function
      'no-empty-pattern': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',

      // no-extra-label
      'no-fallthrough': 'error',
      'no-floating-decimal': 'error',
      'no-global-assign': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': [ 'error', {
        ignoreArrayIndexes: true,
        ignore: [ 0, 1 ],
        enforceConst: true,
      }],
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-new': 'error',
      'no-octal-escape': 'error',
      'no-octal': 'error',

      // no-param-reassign
      'no-proto': 'error',
      'no-redeclare': 'error',

      // COULD BE USEFUL :
      // no-restricted-properties
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',

      // no-unused-labels
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',

      // no-warning-comments
      'no-with': 'error',
      'prefer-promise-reject-errors': 'error',

      // radix
      'require-await': 'off',
      strict: [ 'error', 'global' ],
      'vars-on-top': 'error',

      // wrap-iife
      yoda: 'error',

      /* ===================== */
      /* ||    Variables    || */
      /* ===================== */
      // init-declarations
      'no-catch-shadow': 'error',
      'no-delete-var': 'error',

      // no-label-var
      // COULD BE USEFUL :
      // no-restricted-globals
      'no-shadow-restricted-names': 'error',

      // Could be useful :
      'no-shadow': 'error',
      'no-undef-init': 'error',
      'no-undef': 'error',

      // no-undefined
      'no-unused-vars': [ 'error', {
        args: 'after-used',
        argsIgnorePattern: '^(input|initializationPayload|params|payload|scriptParams|cronjobParams|queryInterface|Sequelize|DataTypes|toolkit)$',
        ignoreRestSiblings: true,
      }],
      'no-use-before-define': [ 'error', {
        functions: false,
      }],

      /* ============================ */
      /* ||  Node.js and CommonJS  || */
      /* ============================ */
      'callback-return': [ 'error', [ 'callback', 'cb', 'next' ]],
      'global-require': 'error',
      'handle-callback-err': 'error',

      // no-mixed-requires
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-env': 'error',
      'no-process-exit': 'error',

      // no-restricted-modules
      'no-sync': 'error',

      /* ======================== */
      /* ||  Stylistic Issues  || */
      /* ======================== */
      'array-bracket-spacing': [ 'error', 'always', {
        objectsInArrays: false,
        arraysInArrays: false,
      }],
      'block-spacing': 'error',
      'brace-style': [ 'error', '1tbs', {
        allowSingleLine: true,
      }],

      // capitalized-comments
      'comma-dangle': [ 'error', 'always-multiline' ],
      'comma-spacing': 'error',
      'comma-style': 'error',
      'computed-property-spacing': 'error',
      'consistent-this': [ 'error', 'self' ],
      'eol-last': 'error',
      'func-call-spacing': 'error',
      'func-name-matching': 'error',
      'func-names': 'error',
      'func-style': [ 'error', 'declaration', {
        allowArrowFunctions: true,
      }],

      // COULD BE USEFUL:
      // id-blacklist
      'id-length': [ 'error', {
        exceptions: [ 'x', 'y', 'i', 'j' ],
      }],

      // id-match
      indent: [ 'error', 2, {
        SwitchCase: 1,
      }],
      'jsx-quotes': 'error',
      'key-spacing': 'error',
      'keyword-spacing': 'error',

      // line-comment-position
      // Too many error currently :
      // "linebreak-style": "error",
      'lines-around-comment': [ 'error', {
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      }],
      'lines-around-directive': 'error',
      'max-depth': [ 'error', 4 ],
      'max-len': [ 'error', 150, {
        ignoreComments: true,
        ignorePattern: '^(.* = (?:require|import)\\(.*\\);)$',
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      }],
      'max-lines': [ 'error', {
        skipBlankLines: true,
        skipComments: true,
      }],
      'max-nested-callbacks': [ 'error', {
        max: 4,
      }],
      'max-params': [ 'warn', 3 ],
      'max-statements-per-line': [ 'error', {
        max: 1,
      }],

      // max-statements
      // multiline-ternary
      'new-parens': 'error',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: [ 'const', 'let', 'var' ],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: [ 'const', 'let', 'var' ],
          next: [ 'const', 'let', 'var' ],
        },
        {
          blankLine: 'always',
          prev: [ 'block-like' ],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: [ 'case', 'default' ],
          next: '*',
        },
      ],
      'newline-before-return': 'error',
      'newline-per-chained-call': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-continue': 'error',
      'no-inline-comments': [ 'error', {
        ignorePattern: '(?:\\s*(nosemgrep|njsscan-ignore):.*)',
      }],
      'no-lonely-if': 'error',
      'no-mixed-operators': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-assign': 'error',
      'no-multiple-empty-lines': [ 'error', {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      }],

      // no-negated-condition
      'no-nested-ternary': 'error',
      'no-new-object': 'error',

      // no-plusplus
      // no-restricted-syntax
      'no-tabs': 'error',

      // no-ternary
      'no-trailing-spaces': [ 'error', {
        skipBlankLines: true,
      }],

      // no-underscore-dangle
      'no-unneeded-ternary': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-newline': [ 'error', {
        ObjectExpression: {
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
        },
      }],
      'object-curly-spacing': [ 'error', 'always', {
        arraysInObjects: false,
        objectsInObjects: false,
      }],
      'object-property-newline': 'error',
      'one-var-declaration-per-line': [ 'error', 'always' ],
      'one-var': [ 'error', 'never' ],

      // operator-assignment
      'operator-linebreak': [ 'error', 'after', {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      }],
      'padded-blocks': [ 'error', {
        blocks: 'never',
        classes: 'always',
        switches: 'never',
      }],
      'quote-props': [ 'error', 'as-needed' ],
      quotes: [ 'error', 'single' ],

      /*
      "require-jsdoc": ["warn", {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": true,
          "ClassDeclaration": true
        }
      }],
      */
      'semi-spacing': 'error',
      'semi-style': [ 'error', 'last' ],
      semi: 'error',
      'sort-keys-fix/sort-keys-fix': [ 'error', 'asc', {
        caseSensitive: false,
      }],
      'sort-vars': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': [ 'error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': [ 'error', {
        words: true,
        nonwords: false,
      }],
      'spaced-comment': [ 'error', 'always' ],
      'template-tag-spacing': 'error',
      'unicode-bom': 'error',

      // wrap-regex

      /* ===================== */
      /* ||   ECMAScript 6  || */
      /* ===================== */
      'arrow-body-style': [ 'error', 'as-needed' ],
      'arrow-parens': [ 'error', 'as-needed' ],
      'arrow-spacing': 'error',
      'constructor-super': 'error',
      'generator-star-spacing': 'error',
      'no-class-assign': 'error',
      'no-confusing-arrow': [ 'error', {
        allowParens: true,
      }],
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-imports': 'error',
      'no-new-symbol': 'error',

      // no-restricted-imports
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': [ 'error', {
        destructuring: 'all',
      }],
      'prefer-numeric-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-yield': 'error',
      'rest-spread-spacing': 'error',
      'sort-imports': [ 'error', {
        ignoreCase: true,
      }],
      'symbol-description': 'error',
      'template-curly-spacing': 'error',
      'yield-star-spacing': 'error',
      'require-atomic-updates': 'off',

      /* ========================================= */
      /* ||      eslint-plugin-chai-expect      || */
      /* ========================================= */
      'chai-expect/no-inner-compare': 'error',
      'chai-expect/missing-assertion': 'error',
      'chai-expect/terminating-properties': 'error',

      /* ======================================= */
      /* ||      eslint-plugin-filenames      || */
      /* ======================================= */
      'filenames/match-exported': 'off',

      /* =================================== */
      /* ||      eslint-plugin-mocha      || */
      /* =================================== */
      'mocha/handle-done-callback': 'error',
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-global-tests': 'error',
      'mocha/no-hooks-for-single-case': 'error',
      'mocha/no-identical-title': 'error',
      'mocha/no-nested-tests': 'error',
      'mocha/no-pending-tests': 'error',
      'mocha/no-sibling-hooks': 'error',
      'mocha/no-top-level-hooks': 'error',

      /* ====================================================== */
      /* ||      eslint-plugin-no-relative-import-paths      || */
      /* ====================================================== */
      'no-relative-import-paths/no-relative-import-paths': [
        'error', {
          allowSameFolder: false,
        },
      ],

      /* ====================================== */
      /* ||        eslint-plugin-node        || */
      /* ====================================== */
      'n/no-extraneous-require': 'off',
      'n/no-deprecated-api': 'warn',
      'n/no-unpublished-require': 'off',

      /* ===================================== */
      /* ||      eslint-plugin-promise      || */
      /* ===================================== */
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'warn',
      'promise/prefer-await-to-then': 'warn',

      /* ========================================== */
      /* ||        eslint-plugin-security        || */
      /* ========================================== */
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'off',

      /* ======================================================= */
      /* ||        eslint-plugin-sort-destructure-keys        || */
      /* ======================================================= */
      'sort-destructure-keys/sort-destructure-keys': [ 'error', {
        caseSensitive: false,
      }],

      /* eslint-enable sort-keys-fix/sort-keys-fix */
    },
    settings: {
      // eslint-disable-next-line id-length
      n: {
        version: '>=22.22.0 <23.0.0',
      },
    },
  },

  // 6. Overrides (Config Files)

  /* ======================================== */
  /* ||      OVERRIDES - CONFIG FILES      || */
  /* ======================================== */
  {
    files: [
      'config/**/*.js',
    ],
    rules: {
      'no-process-env': 'off',
    },
  },

  /* ======================================== */
  /* ||      OVERRIDES - MODELS FILES      || */
  /* ======================================== */
  {
    files: [
      'services/database/models/*.js',
    ],
    rules: {
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },

  /* =========================================== */
  /* ||      OVERRIDES - MIGRATION FILES      || */
  /* =========================================== */
  {
    files: [
      'services/database/migrations/{archives,scripts}/*.js',
      'services/database/migrations/utils/migration.skeleton.js',
    ],
    rules: {
      complexity: 'off',
      'max-lines': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },

  /* ====================================== */
  /* ||      OVERRIDES - TEST FILES      || */
  /* ====================================== */
  {
    files: [
      '**/*.test.js',
    ],
    rules: {
      camelcase: 'off',
      'class-methods-use-this': 'off',
      'max-len': 'off',
      'max-lines': 'off',
      'no-magic-numbers': 'off',
      'no-unused-expressions': 'off',
      'node/no-unpublished-require': 'off',
      'require-jsdoc': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },

  /* ======================================================= */
  /* ||      OVERRIDES - OPENAPI SPECIFICATION FILES      || */
  /* ======================================================= */
  {
    files: [
      'routes/*.specifications.js',
      'routes/specifications/{parameters,responses,schemas,tags}.js',
    ],
    rules: {
      'max-len': 'off',
      'max-lines': 'off',
      'no-magic-numbers': 'off',
    },
  },
];

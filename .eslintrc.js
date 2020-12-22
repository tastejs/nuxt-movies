module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  // TODO: should fix properly
  // ! Just followed https://chestozo.medium.com/fixing-eslint-no-invalid-this-error-for-fat-arrow-class-methods-a56908ca8bb6
  plugins: ['babel'],
  extends: [
    'eslint:recommended',
    'google',
    '@nuxtjs'
  ],
  rules: {
    // Vue
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/no-v-html': ['error'],
    // JavaScript
    // 'comma-dangle': ['error', 'never'],
    semi: ['error', 'always'],
    'require-jsdoc': 'off', // TODO: should turn on and fix accordingly
    'max-len': ['warn',
      {
        code: 130
      } // 130 on GitHub, 80 on npmjs.org for README.md code blocks
    ],
    'no-negated-condition': 'warn',
    'spaced-comment': ['error', 'always',
      {
        exceptions: ['/']
      }
    ],
    // 'quote-props': ['error', 'as-needed'],
    indent: ['error', 2],
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'no-console': ['warn'],

    // TODO: should fix properly
    // ! Just followed https://chestozo.medium.com/fixing-eslint-no-invalid-this-error-for-fat-arrow-class-methods-a56908ca8bb6
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1
  }
};

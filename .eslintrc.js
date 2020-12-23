module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'google'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  // TODO: should fix properly
  // ! Just followed https://chestozo.medium.com/fixing-eslint-no-invalid-this-error-for-fat-arrow-class-methods-a56908ca8bb6
  plugins: [
    'babel',
    'import'
  ],
  rules: {
    // Vue
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/no-v-html': ['error'],
    // JavaScript
    'comma-dangle': ['error', 'never'],
    'no-console': ['warn'],
    indent: ['error', 2],
    'quote-props': ['error', 'as-needed'],
    'max-len': ['warn',
      {
        code: 130
      } // 130 on GitHub, 80 on npmjs.org for README.md code blocks
    ],
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'no-negated-condition': 'warn',
    'spaced-comment': ['error', 'always',
      {
        exceptions: ['/']
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'always'],
    'require-jsdoc': 'off', // TODO: should turn on and fix accordingly
    'import/exports-last': 'error',
    // TODO: should fix properly
    // ! Just followed https://chestozo.medium.com/fixing-eslint-no-invalid-this-error-for-fat-arrow-class-methods-a56908ca8bb6
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1
  }
};

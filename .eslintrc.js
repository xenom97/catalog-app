module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],

  // add your custom rules here
  rules: {
    'no-prototype-builtins': 'off',
    'import/named': 0,
    'import/order': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    /**
     * Let Typescript handle these rules
     */
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',

    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-v-html': 0,

    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
  },
};

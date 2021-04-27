module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  globals: {
    ENV: true,
  },
  plugins: ['react', 'import'],
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
  ],
  rules: {
    'no-console': 'warn',
    'react/prop-types': ['warn', { ignore: ['children'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', 'tsx', 'ts'] },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'jsx-a11y/no-onchange': 'warn',
    'func-style': ['error', 'expression'],
  },
}

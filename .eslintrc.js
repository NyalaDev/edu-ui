module.exports = {
  parser: 'babel-eslint',
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
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
  ],
  rules: {
    'no-console': 'warn',
    'react/prop-types': ['warn', { ignore: ['children'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'func-style': ['error', 'expression'],
  },
}

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
  settings: {
    react: {
      version: '>16',
    },
  },
  plugins: ['react', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
  ],
  rules: {
    'no-console': 'error',
    'react/prop-types': ['warn', { ignore: ['children'] }],
  },
}

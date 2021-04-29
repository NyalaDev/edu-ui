module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
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
  plugins: ['react', 'import', '@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'react/prop-types': ['warn', { ignore: ['children'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/no-onchange': 'warn',
    'func-style': ['error', 'expression'],

    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',

    // FIXME: Temp rules during the transitoin wa keda
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
  },
  ignorePatterns: ['.eslintrc.js'],
}

/* module.exports = {
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
  plugins: ['react', 'import', '@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
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
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
}
 */

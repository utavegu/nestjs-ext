module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: 'tsconfig.json', валит ошибку в каждом файле, если оставить. Вот эту:
    /*
    Parsing error: ESLint was configured to run on `<ts config RootDir>/../../../../Рабочий стол/Ссылка на ndtnf16/nest js-ext/src/books/books.module.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
    However, that TSConfig does not include this file. Either:
    - Change ESLint's list of included files to not include this file
    - Change that TSConfig to include this file
    - Create a new TSConfig that includes this file and include it in your parserOptions.project
    See the typescript-eslint docs for more info: https://typescript-eslint.io/linting/troubleshooting##i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-fileeslint
    */
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

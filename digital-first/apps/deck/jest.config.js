module.exports = {
  name: 'deck',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ["<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer"],
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom-thirteen',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
    'DateHelper(.*)': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic|chart|ng2-charts)'],
  coverageDirectory: '../../coverage/apps/deck/jest/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
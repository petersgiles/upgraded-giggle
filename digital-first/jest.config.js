module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ["<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer"],
    },
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic|@material)'],
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
     // '^.+\\.tsx?$': 'babel-jest',
    // '^.+\\.(ts|html)$': 'ts-jest',
    // '^.+\\.js?$': 'babel-jest',
    },
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverage: true,
    coverageReporters: ['html']
   }
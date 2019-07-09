module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ["<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer"],
    },
  },
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest'
    },
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverage: true,
    coverageReporters: ['html']
   }
module.exports = {
  name: 'commitments-reader',
  preset: 'ts-jest',
  coverageDirectory: '../../coverage/apps/commitments-reader/',
  transform: {
    "^.+\\.spec\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    '^@digital-first(.*)': '../../libs/df-app-core/src/lib/reducers/app/$1',
  },
  transformIgnorePatterns: ['node_modules/@angular-mdc'],
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

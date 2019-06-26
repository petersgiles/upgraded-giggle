module.exports = {
  name: 'df-layouts',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-layouts/jest/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

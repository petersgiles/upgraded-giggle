module.exports = {
  name: 'df-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-components',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

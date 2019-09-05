module.exports = {
  name: 'df-moment',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-moment',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

module.exports = {
  name: 'df-pipes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-pipes',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

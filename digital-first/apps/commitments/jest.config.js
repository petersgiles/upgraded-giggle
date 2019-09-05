module.exports = {
  name: 'commitments',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/commitments',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

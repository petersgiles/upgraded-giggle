module.exports = {
  name: 'commitments-reader',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/commitments-reader/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

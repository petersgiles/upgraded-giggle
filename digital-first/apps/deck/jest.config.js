module.exports = {
  name: 'deck',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/deck',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
module.exports = {
  name: 'programs-admin',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/programs-admin/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

module.exports = {
  name: 'programs-admin',
  preset: 'jest-preset-angular',
  coverageDirectory: '../../coverage/apps/programs-admin/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

module.exports = {
  name: 'df-app-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-app-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
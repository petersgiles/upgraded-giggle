module.exports = {
  name: 'df-auth',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

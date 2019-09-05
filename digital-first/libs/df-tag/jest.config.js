module.exports = {
  name: 'df-tag',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-tag',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

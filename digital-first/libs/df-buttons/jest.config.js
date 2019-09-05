
module.exports = {
  name: 'df-buttons',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-buttons',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

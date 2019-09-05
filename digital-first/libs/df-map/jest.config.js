module.exports = {
  name: 'df-map',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-map',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

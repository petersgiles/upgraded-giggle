module.exports = {
  name: 'df-datatable',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-datatable',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

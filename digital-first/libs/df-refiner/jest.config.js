module.exports = {
  name: 'df-refiner',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/df-refiner',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
}

module.exports = {
  name: 'policy-briefs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/policy-briefs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

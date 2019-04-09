declare var require: any

export const environment = {
  production: true,
  version: require('../../../../package.json').version,
  datasources: {
    deck: {
      type: 'sharepoint',
      dataServiceUrl: ''
    },
    commitments: {
      type: 'apollo',
      dataServiceUrl: ''
    },
    brief: {
      type: 'sharepoint',
      dataServiceUrl: ''
    }
  }
}

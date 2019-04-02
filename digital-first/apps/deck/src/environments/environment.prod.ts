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
      type: 'sharepoint',
      dataServiceUrl: ''
    },
    brief: {
      type: 'sharepoint',
      dataServiceUrl: ''
    }
  }
}

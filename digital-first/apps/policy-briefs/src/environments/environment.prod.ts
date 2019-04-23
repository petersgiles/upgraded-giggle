declare var require: any

export const environment = {
  production: true,
  version: require('../../../../package.json').version,
  config: 'assets/config.txt',
  datasources: {
    default: {
      type: 'apollo',
      dataServiceUrl: '//localhost:3202/graphql'
    },
    brief: {
      type: 'sharepoint',
      dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
    }
  }
}
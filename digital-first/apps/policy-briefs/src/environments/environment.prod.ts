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
      dataServiceUrl: '//localhost:3202/graphql'
    },
    packNavigation: {
      type: 'apollo',
      dataServiceUrl: '//localhost:3202/graphql'
    }
  }
}
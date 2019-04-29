declare var require: any

export const environment = {
  production: true,
  version: require('../../../../package.json').version,
  config: 'assets/deck_config.txt',
  datasources: {
    default: {
      type: 'sharepoint',
      dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
    }
  }
}
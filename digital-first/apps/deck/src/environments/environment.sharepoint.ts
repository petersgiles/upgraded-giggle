declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  config: '/AppConfig/deck.txt',
  datasources: {
    default: {
      type: 'sharepoint',
      dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
    }
  }
}

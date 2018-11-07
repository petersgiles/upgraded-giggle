declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '',
  },
  federatedLoginApiPath: '//programs.cloud9.cabnet'
}

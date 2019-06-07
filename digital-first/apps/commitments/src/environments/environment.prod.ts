declare var require: any

export const environment = {
  production: true,
  version: require('../../../../package.json').version,
  commithash: require('../../../../package.json')['commit-hash'],
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '',
  },
  assetsPath: '/assets'
}

declare var require: any

export const environment = {
  production: true,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:3008/graphql'
  },
  apiKey: '',
  assetsPath: '/assets'
}

declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  // developer's your API KEY here
  apiKey: 'naHB00CkH22G3Cu596sLKTJ+0oI=',
  assetsPath: '/assets'
}

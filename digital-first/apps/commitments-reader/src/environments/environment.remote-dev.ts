declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  // developer's your API KEY here
  apiKey: '85femJw3mKfr909JyGTF9MUmGZ8=',
  assetsPath: '/assets'
}

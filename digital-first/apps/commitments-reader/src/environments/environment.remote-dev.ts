declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  // developer's your API KEY here
  apiKey: 'D967pGeq5IHUfJg9k/m5gWlS46g=',
  assetsPath: '/assets'
}

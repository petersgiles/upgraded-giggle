declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  // developer's your API KEY here
  apiKey: 'Wi4/4dYB8as4lbOD7zSVVO5YW54=',
  assetsPath: '/assets'
}

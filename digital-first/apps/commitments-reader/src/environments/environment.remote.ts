declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//programs.cloud9.cabnet/graphql'
  },
  // user "Mustang Sally" on Cloud9
  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/assets'
}

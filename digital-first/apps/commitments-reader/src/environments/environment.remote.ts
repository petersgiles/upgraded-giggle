import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  config: 'assets/commitment_delivery_config.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//programs.cloud9.cabnet/graphql'
  },
  // user "Mustang Sally" on Cloud9
  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/assets'
}
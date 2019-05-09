import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  version: packageJson.version,
  config: '/AppConfig/commitment_delivery_config.txt',
  datasources: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql'
  },
  apiKey: '#{ApiKey}',

  assetsPath: '/assets'
}

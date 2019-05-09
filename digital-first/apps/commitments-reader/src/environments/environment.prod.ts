import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'local',
  version: packageJson.version,
  config: 'assets/commitment_delivery_config.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql',
  },
  apiKey: '#{ApiKey}',

  assetsPath: '/assets'
}

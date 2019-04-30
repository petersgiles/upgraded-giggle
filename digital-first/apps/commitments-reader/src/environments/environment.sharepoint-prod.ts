import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  version: packageJson.version,
  config: 'assets/commitment_reader_config.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql',
  },
  apiKey: '#{ApiKey}',

  assetsPath: '/assets'
}

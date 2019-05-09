import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'sharepoint',
  version: packageJson.version,
  config: '/AppConfig/commitment_delivery_config.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql'
  },
  eventDatasource:'sharepoint',
  apiKey: '#{ApiKey}',
  assetsPath: '/assets'
}

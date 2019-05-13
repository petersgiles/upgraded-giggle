import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'sharepoint',
  version: packageJson.version,
  config: '/AppConfig/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql'
  },
  eventDatasource: 'sharepoint',
  appConfigDataSource: 'sharepoint',
  apiKey: '#{ApiKey}',
  assetsPath: '/assets'
}

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
  loggingSource: {
    type: 'seq',
    url: '//#{ApiPath}/api/events/raw',
    level: 'error',
    source: 'Commitments Reader'
  },
  eventDatasource: 'sharepoint',
  appConfigDataSource: 'sharepoint',
  apiKey: '#{ApiKey}',
  assetsPath: '../../SiteAssets/apps/commitments-reader/assets'
}

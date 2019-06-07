import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'sharepoint',
  version: packageJson.version,
  commithash: packageJson['commit-hash'],
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

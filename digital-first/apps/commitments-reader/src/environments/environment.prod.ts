import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'local',
  version: packageJson.version,
  commithash: packageJson['commit-hash'],
  config: '/assets/commitments-reader.txt',
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
  assetsPath: '/assets'
}

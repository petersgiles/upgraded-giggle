import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'local',
  version: packageJson.version,
  commithash: packageJson['commit-hash'],
  config: '/assets/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//programs.cloud9.cabnet/graphql'
  },
  loggingSource:{
    type: 'seq',
    url: '//programs.cloud9.cabnet/api/events/raw',
    level: 'info',
    source: 'Commitments Reader'
  },
  eventDatasource:'local',
  appConfigDataSource: 'local',
  // user "Mustang Sally" on Cloud9
  apiKey: 'AYVuNMbXhu0K9sWbmtbyCdrofPM=',
  assetsPath: '/assets'
}

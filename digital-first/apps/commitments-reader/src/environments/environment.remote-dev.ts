import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'local',
  version: packageJson.version,
  commithash: packageJson['commit-hash'],
  config: '/assets/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: 'https://localhost:52619/graphql'
  },
  loggingSource: {
    type: 'seq',
    url: '//programs.cloud9.cabnet/api/events/raw',
    level: 'info',
    source: 'Commitments Reader'
  },
  eventDatasource: 'local',
  appConfigDataSource: 'local',
  // developers! your API KEY here
  apiKey: 'zQL+BN7aZ9hb/T18ShqfldOUENg=',
  assetsPath: '/assets'
}

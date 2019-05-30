import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'local',
  version: packageJson.version,
  config: '/assets/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: 'https://localhost:52619/graphql'
  },
  loggingSource:{
    type: 'seq',
    url: '//programs.cloud9.cabnet/api/events/raw'
  },
  eventDatasource:'local',
  appConfigDataSource: 'local',
  // developer's your API KEY here

  apiKey: 'f2kEqQewiebidPkHIkqYyNY88HA=',
  assetsPath: '/assets'
}

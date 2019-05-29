import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'local',
  version: packageJson.version,
  config: '/assets/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//programs.cloud9.cabnet/graphql'
  },
  eventDatasource:'local',
  appConfigDataSource: 'local',
  // user "Mustang Sally" on Cloud9
  apiKey: 'f2kEqQewiebidPkHIkqYyNY88HA=',
  assetsPath: '/assets'
}

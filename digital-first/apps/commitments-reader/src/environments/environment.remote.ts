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
  loggingSource:{
    type: 'seq',
    loggingServiceUrl: '//programs.cloud9.cabnet'
  },
  eventDatasource:'local',
  appConfigDataSource: 'local',
  // user "Mustang Sally" on Cloud9
  apiKey: '1PARfaAtmMKPkda2GKa9a2mUOW8=',
  assetsPath: '/assets'
}

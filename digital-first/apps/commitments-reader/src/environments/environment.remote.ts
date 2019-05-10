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
  // user "Mustang Sally" on Cloud9
  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/assets'
}

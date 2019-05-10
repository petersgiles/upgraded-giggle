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
  eventDatasource:'local',
  // developer's your API KEY here

  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/assets'
}

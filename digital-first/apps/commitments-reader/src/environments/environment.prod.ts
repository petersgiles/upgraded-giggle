import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'local',
  version: packageJson.version,
  config: '/assets/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql',
  },
  eventDatasource:'sharepoint',
  apiKey: '#{ApiKey}',
  assetsPath: '/assets'
}

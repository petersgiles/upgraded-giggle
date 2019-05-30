import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  host: 'sharepoint',
  version: packageJson.version,
  config: '/AppConfig/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql'
  },
  loggingSource:{
    type: 'seq',
    loggingServiceUrl: '//#{ApiPath}/api/events/raw'
  },
  eventDatasource: 'sharepoint',
  appConfigDataSource: 'sharepoint',
  apiKey: '#{ApiKey}',
  assetsPath: '../../SiteAssets/apps/commitments-reader/assets'
}

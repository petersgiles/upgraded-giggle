import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'sharepoint',
  version: packageJson.version,
  config: '/AppConfig/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: 'https://programs.cloud9.cabnet/graphql',
  },
  loggingSource: {
    type: 'seq',
    url: '//programs.cloud9.cabnet/api/events/raw',
    level: 'error'
  },
  eventDatasource: 'sharepoint',
  appConfigDataSource: 'sharepoint',
  apiKey: 'f2kEqQewiebidPkHIkqYyNY88HA=',
  assetsPath: '../../SiteAssets/apps/commitments-reader/assets'
}

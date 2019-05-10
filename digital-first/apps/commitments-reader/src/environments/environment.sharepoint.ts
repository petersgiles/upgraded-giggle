import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'sharepoint',
  version: packageJson.version,
  config: '/AppConfig/commitment_delivery_config.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: 'https://programs.cloud9.cabnet/graphql'
  },
  eventDatasource: 'sharepoint',
  apiKey: 'KvMAs2tbscsOmzXzyrSfK67okrM=',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

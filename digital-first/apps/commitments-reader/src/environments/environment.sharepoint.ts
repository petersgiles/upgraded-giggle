import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  config: 'assets/commitment_delivery_config.txt',
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: 'https://programs.cloud9.cabnet/graphql'
  },
  apiKey: 'KvMAs2tbscsOmzXzyrSfK67okrM=',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

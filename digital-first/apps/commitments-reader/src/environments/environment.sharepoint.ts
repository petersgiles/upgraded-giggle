import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  config: '/AppConfig/commitment_delivery_config.txt',
  datasources: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql'
  },
  apiKey: 'KvMAs2tbscsOmzXzyrSfK67okrM=',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

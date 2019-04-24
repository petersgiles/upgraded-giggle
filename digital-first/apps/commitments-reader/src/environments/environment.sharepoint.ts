import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '//programs.cloud9.cabnet/graphql'
  },
  apiKey: '',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

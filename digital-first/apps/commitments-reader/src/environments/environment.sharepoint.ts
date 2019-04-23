import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: ''
  },
  apiKey: '',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

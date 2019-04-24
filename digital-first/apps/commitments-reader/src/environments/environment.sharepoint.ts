import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '//VM-DEV-LBS05.CLOUD9.CABNET:52619/graphql'
  },
  apiKey: '',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

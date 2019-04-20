declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: ''
  },
  apiKey: '',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

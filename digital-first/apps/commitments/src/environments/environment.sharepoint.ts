declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '',
  },
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments/assets'
}

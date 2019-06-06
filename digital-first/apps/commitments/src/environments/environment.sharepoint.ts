declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  commithash: require('../../../../package.json')['commit-hash'],
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '',
  },
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments/assets'
}

declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '//localhost:3008/graphql'
  },
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments/assets'
}

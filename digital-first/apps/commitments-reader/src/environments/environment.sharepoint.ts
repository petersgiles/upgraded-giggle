declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '//VM-DEV-LBS05.CLOUD9.CABNET:52619/graphql'
  },
  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

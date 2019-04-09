declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  config: 'http://vm-dev-lbs13/sites/redigb/SiteAssets/apps/policy-briefs/assets/config.txt',
  datasources: {
    deck: {
      type: 'sharepoint',
      dataServiceUrl: ''
    },
    commitments: {
      type: 'apollo',
      dataServiceUrl: ''
    },
    brief: {
      type: 'sharepoint',
      dataServiceUrl: ''
    }
  }
}

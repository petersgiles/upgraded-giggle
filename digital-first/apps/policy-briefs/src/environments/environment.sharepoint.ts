declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  config: 'http://vm-dev-lbs13/sites/redigb/SiteAssets/apps/policy-briefs/assets/policy_briefs_config.txt',
  datasources: {
    default: {
      type: 'sharepoint',
      dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
    }
  }
}

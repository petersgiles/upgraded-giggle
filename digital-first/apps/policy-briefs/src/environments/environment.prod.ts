declare var require: any

export const environment = {
  production: true,
  version: require('../../../../package.json').version,
  config: '../../AppConfig/policy_briefs_config.txt',
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
    },
    packNavigation: {
      type: 'sharepoint',
      dataServiceUrl: ''
    }
  }
}
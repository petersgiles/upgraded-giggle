// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasources: {
    default: {
      type: 'sharepoint',
      dataServiceUrl: 'http://vm-dev-lbs13/sites/redigb/_api/Web/'
    }
  },
  loggingSource:{
    type: 'seq',
    url: '//programs.cloud9.cabnet/api/events/raw',
    level: 'error',
    source: 'Deck'
  },
  host: 'sharepoint',
  config: '/AppConfig/policy_briefs.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: 'https://programs.cloud9.cabnet/graphql'
  },
  eventDatasource: 'sharepoint',
  appConfigDataSource: 'sharepoint',
  apiKey: 'KvMAs2tbscsOmzXzyrSfK67okrM=',
  assetsPath: '../../SiteAssets/apps/deck/assets'
}
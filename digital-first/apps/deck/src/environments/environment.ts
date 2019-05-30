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
      dataServiceUrl: '//vm-dev-lbs13/sites/redigb/_api/Web/'
    }
  },
  loggingSource:{
    type: 'seq',
    loggingServiceUrl: '//programs.cloud9.cabnet/api/events/raw'
  },
  host: 'local',
  config: '/assets/deck.txt',
  datasource: null,
  eventDatasource: 'sharepoint',
  appConfigDataSource: 'sharepoint',
  apiKey: 'f2kEqQewiebidPkHIkqYyNY88HA=',
  assetsPath: '/assets'
}

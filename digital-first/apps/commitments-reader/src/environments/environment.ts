// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  host: 'local',
  version: packageJson.version,
  config: '/assets/commitments-reader.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  loggingSource: {
    type: 'seq',
    url: '//programs.cloud9.cabnet/api/events/raw',
    level: 'info'
  },
  eventDatasource: 'local',
  appConfigDataSource: 'local',
  // developer's your API KEY here
  apiKey: 'f2kEqQewiebidPkHIkqYyNY88HA=',
  assetsPath: '/assets'
  // datasources: {
  //   data: {
  //     type: 'api',
  //     dataServiceUrl: 'https://localhost:52619/graphql',
  //     apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  //   },
  //   config: {
  //     type: 'app',
  //     uri: '/assets/commitments-reader.txt',
  //     apiKey: null,
  //   },
  //   event: {
  //     type: 'graph',
  //     uri: 'https://localhost:52619',
  //     apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  //   },
  //   assets: {
  //     type: 'app',
  //     uri: '/assets',
  //     apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  //   },
  //   error: {
  //     type: 'api',
  //     uri: 'https://localhost:52619',
  //     apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  //   },
  // },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

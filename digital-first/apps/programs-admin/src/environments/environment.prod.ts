// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  redirectErrors: true,
  version: packageJson.version,
  commitHash: packageJson['commit-hash'],
  datasource: {
    type: 'local',
    dataServiceUrl: '//#{ApiPath}/admin/graphql',
    adminApiUrl: '//#{ApiPath}/admin/api',
    passthroughUrl: '//#{ApiPath}/admin/api/sendmessage'
  },
  federatedLoginApiPath: '//#{ApiPath}/admin',
  appBasePath: '/admin'
}

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

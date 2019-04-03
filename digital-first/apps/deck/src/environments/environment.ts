// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var require: any

export const environment = {
  production: false,
  version: require('../../../../package.json').version,
  datasources: {
    default: {
      type: 'apollo',
      dataServiceUrl: '//localhost:3002/graphql'
    },
    commitments: {
      type: 'apollo',
      dataServiceUrl: '//localhost:3008/graphql'
    },
    brief: {
      type: 'sharepoint',
      dataServiceUrl: '//localhost:3002/graphql'
    }
  }
}

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  // developer's your API KEY here

  apiKey: 'D967pGeq5IHUfJg9k/m5gWlS46g=',
  assetsPath: '/assets'
}

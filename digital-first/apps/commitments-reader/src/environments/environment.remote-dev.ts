import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//localhost:52619/graphql'
  },
  // developer's your API KEY here

  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/assets'
}

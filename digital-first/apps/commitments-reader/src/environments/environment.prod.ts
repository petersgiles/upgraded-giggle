import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  version: packageJson.version,
  datasource: {
    type: 'graph',
    dataServiceUrl: '//#{ApiPath}/graphql',
  },
  apiKey: '',
  assetsPath: '/assets'
}

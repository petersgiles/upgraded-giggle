import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  config: 'assets/commitment_reader_config.txt',
  datasource: {
    type: 'graph',
    dataServiceUrl: 'https://localhost:52619/graphql'
  },
  // developer's your API KEY here

  apiKey: 'gZjvQ4oxl8OgVY39uoEs5uZg31A=',
  assetsPath: '/assets'
}

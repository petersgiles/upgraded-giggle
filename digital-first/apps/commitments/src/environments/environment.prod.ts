import * as packageJson from '../../../../package.json'

export const environment = {
  production: true,
  version: packageJson.version,
  commitHash: packageJson['commit-hash'],
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: '',
  },
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments/assets'
}

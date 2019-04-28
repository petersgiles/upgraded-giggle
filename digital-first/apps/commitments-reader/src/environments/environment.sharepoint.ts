import * as packageJson from '../../../../package.json'

export const environment = {
  production: false,
  version: packageJson.version,
  datasource: {
    type: 'sharepoint',
    dataServiceUrl: 'https://programs.cloud9.cabnet/graphql'
  },
  apiKey: 'Ik5fbJkunTXPpLo/bjVC/aH1QMc=',
  assetsPath: '/sites/commitments/SiteAssets/apps/commitments-reader/assets'
}

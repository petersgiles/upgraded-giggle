import { SharepointJsomService } from '@df/sharepoint'
import { SharePointAppDataService } from './sharepoint/sharepoint-app-data.service'
import { DevelopAppDataService } from './develop/develop-app-data.service'
import { SettingsService } from '../settings.service'
import { AppDataService } from '@digital-first/df-app-core'

const appDataServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.appConfigDataSource) {
    source = settings.appConfigDataSource
  }

  switch (source) {
    case 'sharepoint':
      return new SharePointAppDataService(sharepointlib)
    default:
      return new DevelopAppDataService()
  }
}

export let appDataServiceProvider = {
  provide: AppDataService,
  useFactory: appDataServiceFactory,
  deps: [SettingsService, SharepointJsomService]
}

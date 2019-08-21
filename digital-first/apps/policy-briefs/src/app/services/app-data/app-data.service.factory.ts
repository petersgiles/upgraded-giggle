import { SharepointJsomService } from '@df/sharepoint'
import { SharePointAppDataService } from './sharepoint/sharepoint-app-data.service'
import { DevelopAppDataService } from './develop/develop-app-data.service'

import { AppDataService, AppSettingsService } from '@digital-first/df-app-core'
import { SettingsService } from '../settings.service';

const appDataServiceFactory = (
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService
) => {

  let source = null
  if (settings.host) {
    source = settings.host
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

import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { NavigationDataSharepointService } from './sharepoint/navigation-data.service'
import { NavigationDataLocalService } from './local/navigation-data.service'
import { NavigationDataService } from './navigation-data.service'

const briefDataServiceFactory = (
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new NavigationDataSharepointService(sharepointlib)
    default:
      return new NavigationDataLocalService()
  }
}

export let briefDataServiceProvider = {
  provide: NavigationDataService,
  useFactory: briefDataServiceFactory,
  deps: [AppSettingsService, SharepointJsomService]
}

import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { BriefDataLocalService } from './local/brief-data.service'
import { BriefDataSharepointService } from './sharepoint/brief-data.service'
import { BriefDataService } from './brief-data.service'

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
      return new BriefDataSharepointService(sharepointlib)
    default:
      return new BriefDataLocalService()
  }
}

export let briefDataServiceProvider = {
  provide: BriefDataService,
  useFactory: briefDataServiceFactory,
  deps: [AppSettingsService, SharepointJsomService]
}

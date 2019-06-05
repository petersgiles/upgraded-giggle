import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { BriefDataLocalService } from './local/brief-data.service'
import { BriefDataSharepointService } from './sharepoint/brief-data.service'
import { BriefDataService } from './brief-data.service'
import { HttpClient } from '@angular/common/http';

const briefDataServiceFactory = (
  http: HttpClient,
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new BriefDataSharepointService(http, settings, sharepointlib)
    default:
      return new BriefDataLocalService(http, settings)
  }
}

export let briefDataServiceProvider = {
  provide: BriefDataService,
  useFactory: briefDataServiceFactory,
  deps: [HttpClient, AppSettingsService, SharepointJsomService]
}

import { SharepointJsomService } from '@df/sharepoint'

import { HttpClient } from '@angular/common/http'

import { DevelopConfigService } from './develop/develop-config.service'
import { SharePointConfigService } from './sharepoint/sharepoint-config.service'
import { AppSettingsService, AppConfigService } from '@digital-first/df-app-core'

const configServiceFactory = (
  settings: AppSettingsService,
  http: HttpClient,
  sharepoint: SharepointJsomService
) => {
  if (settings.host === 'sharepoint') {
    return new SharePointConfigService(http, settings, sharepoint)
  }
  return new DevelopConfigService(http, settings)
}

export let configServiceProvider = {
  provide: AppConfigService,
  useFactory: configServiceFactory,
  deps: [AppSettingsService, HttpClient, SharepointJsomService]
}

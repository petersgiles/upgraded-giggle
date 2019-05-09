import { SharepointJsomService } from '@df/sharepoint'
import { SettingsService } from '../settings.service'
import { HttpClient } from '@angular/common/http'
import { AppConfigService } from './config.service'
import { DevelopConfigService } from './develop/develop-config.service'
import { SharePointConfigService } from './sharepoint/sharepoint-config.service'

const configServiceFactory = (settings: SettingsService, http: HttpClient) => {
  if (settings.host === 'sharepoint') {
    return new SharePointConfigService(http, settings)
  }
  return new DevelopConfigService(http, settings)
}

export let configServiceProvider = {
  provide: AppConfigService,
  useFactory: configServiceFactory,
  deps: [SettingsService, HttpClient]
}

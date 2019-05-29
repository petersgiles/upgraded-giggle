import { AppSettingsService } from '../app-settings.service';
import { SharepointJsomService } from '@df/sharepoint';
import { HttpClient } from '@angular/common/http';
import { SharePointConfigService } from './sharepoint/sharepoint-config.service';
import { DevelopConfigService } from './develop/develop-config.service';
import { AppConfigService } from './config.service';

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

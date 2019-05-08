import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { SharepointJsomService } from '@df/sharepoint'
import { SharePointAppDataService } from './sharepoint/sharepoint-app-data.service'
import { DevelopAppDataService } from './develop/develop-app-data.service'
import { SettingsService } from '../settings.service'
import { AppDataService } from './app-data.service';

const appDataServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
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

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { SharepointJsomService } from '@df/sharepoint'
import { SharePointAppDataService } from './sharepoint/sharepoint-app-data.service'
import { DevelopAppDataService } from './develop/develop-app-data.service'
import { SettingsService } from '../settings.service'


export const ROLE_OWNERS = 'ROLE_OWNERS'
export const ROLE_MEMBERS = 'ROLE_MEMBERS'
export const ROLE_VISITORS = 'ROLE_VISITORS'

export const OPERATION_DISCUSSION = 'discussion'

export const OPERATION_RIGHT_READ = 'read'
export const OPERATION_RIGHT_WRITE = 'write'
export const OPERATION_RIGHT_HIDE = 'hide'

export const OPERATION_RIGHTS_PRECEDENT = [OPERATION_RIGHT_HIDE, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ]

export const OPERATION_DEFAULTS = {
  'discussion': OPERATION_RIGHT_WRITE, // Temporary Default
}

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract getBusy(): Observable<boolean>
  abstract get Notification()
  abstract setDrawState(appdrawerOpen: any): any
  abstract getDrawState(): Observable<boolean>
  abstract getCurrentUser(): Observable<any>
  abstract getCurrentUserOperations(roles: {
    groupPermissions: any
  }): Observable<any>
}

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

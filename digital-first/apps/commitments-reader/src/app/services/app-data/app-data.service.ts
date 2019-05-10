import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { SharepointJsomService } from '@df/sharepoint'
import { SharePointAppDataService } from './sharepoint/sharepoint-app-data.service'
import { DevelopAppDataService } from './develop/develop-app-data.service'
import { SettingsService } from '../settings.service'

export const OPERATION_PMO = 'pmohandlingadvice'
export const OPERATION_PMC = 'pmchandlingadvice'

export const OPERATION_RIGHT_READ = 'read'
export const OPERATION_RIGHT_WRITE = 'write'
export const OPERATION_RIGHT_HIDE = 'hide'

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

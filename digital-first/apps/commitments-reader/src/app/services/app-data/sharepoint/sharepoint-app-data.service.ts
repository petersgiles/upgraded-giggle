import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { AppDataService } from '../app-data.service'
import { SharepointJsomService, SPAppUserProfile } from '@df/sharepoint'

export class SharePointAppDataService implements AppDataService {
  getCurrentUserOperations(roles: { groupPermissions: any }): Observable<any> {
    return of(null)
  }
  get UserOperation(): Observable<any> {
    return of(null)
  }
  getDrawState(): Observable<boolean> {
    return of(false)
  }
  setDrawState(appdrawerOpen: any): any {
    return of(false)
  }

  getBusy(): Observable<boolean> {
    return of(false)
  }

  // Notification

  get Notification(): Observable<string> {
    return of(null)
  }

  getCurrentUser(): Observable<SPAppUserProfile> {
    return this.sharepoint.getCurrentUser()
  }

  constructor(private sharepoint: SharepointJsomService) {}
}

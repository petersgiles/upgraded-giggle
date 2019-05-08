import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { AppDataService, ROLE_VISITORS, ROLE_MEMBERS } from '../app-data.service';
import { AppUserProfile } from '@digital-first/df-layouts';

@Injectable({
  providedIn: 'root'
})
export class DevelopAppDataService implements AppDataService {
  getCurrentUserOperations(roles: { groupPermissions: any}): Observable<any> {
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

  constructor() {}

  // Notification

  get Notification(): Observable<string> {
    return of(null)
  }

  getCurrentUser(): Observable<AppUserProfile> {

    const userprofile = {
      userid: 0,
      login: 'guest',
      isSiteAdmin: true,
      systemUserKey: 'guest',
      name: 'Guest User',
      roles: [ROLE_VISITORS, ROLE_MEMBERS]
    }

    return of(
      userprofile
    )
  }
}


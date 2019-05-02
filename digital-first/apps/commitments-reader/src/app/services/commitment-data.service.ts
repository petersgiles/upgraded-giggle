import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { AppDataService } from './app-data.service';

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService implements AppDataService {
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

  getCurrentUser(): Observable<any> {
    return of({roles:[]})
  }
}

const appDataServiceFactory = () => new CommitmentDataService()

export let appDataServiceProvider = {
  provide: AppDataService,
  useFactory: appDataServiceFactory,
  deps: []
}
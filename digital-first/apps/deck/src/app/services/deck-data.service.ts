import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { AppDataService } from './app-data.service'

@Injectable({
  providedIn: 'root'
})
export class DeckDataService implements AppDataService {
  getCurrentUserOperations(roles: any): Observable<any> {
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
    return of(null)
  }
}

import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { AppUserProfile } from '@digital-first/df-layouts'

@Injectable({
  providedIn: 'root'
})
export class DeckDataService {
  _appdrawerOpen: BehaviorSubject<boolean> = new BehaviorSubject(true)

  getCurrentUser(): Observable<AppUserProfile> {
   return of()
  }

  getBusy(): Observable<boolean> {
    return of(false)
  }

   get Notification(): Observable<string> {
    return of()
  }

  getDrawState(): Observable<boolean> {
    return this._appdrawerOpen.asObservable()
  }
  setDrawState(appdrawerOpen: any): any {
    this._appdrawerOpen.next(appdrawerOpen)
  }

}

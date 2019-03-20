import {
  Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'


@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {


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

  constructor() { }

  // Notification

  get Notification(): Observable<string> {
    return of(null)
  }

  getCurrentUser(): Observable<any> {
    return of(null)
  }

  
}

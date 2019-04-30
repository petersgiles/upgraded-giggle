import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDetailService {


  constructor() {}

  // Notification

  get Notification(): Observable<string> {
    return of(null)
  }

  getCurrentUser(action): Observable<any> {
    return of(action)
  }
}

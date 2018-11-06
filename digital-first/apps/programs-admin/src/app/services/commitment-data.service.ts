import {
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {

  constructor(private store: Store<fromRoot.State>) { }

  // Notification

  get Notification(): Observable<string> {
    return this.store.select(fromRoot.getNotification)
  }
}
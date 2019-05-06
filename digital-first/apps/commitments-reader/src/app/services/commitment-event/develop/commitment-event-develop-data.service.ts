import { Injectable } from '@angular/core'

import { Observable, EMPTY } from 'rxjs'

import { DataResult } from '../../../models'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent,
  ExternalEventType
} from '../../../models/commitment-event.model'



import { CommitmentEventDataService } from '../commitment-event-data-service'

@Injectable({
  providedIn: 'root'
})
export class EventDevelopDataService implements CommitmentEventDataService {
  constructor() {}

  getEventsByCommitments(
    commitments: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    return EMPTY
  }

  getEventTypes(): Observable<DataResult<CommitmentEventType[]>> {
    return EMPTY
  }

  getExternalEvents(
    externalEventTypes: any[]
  ): Observable<DataResult<ExternalEvent[]>> {
    return EMPTY
  }

  getExternalEventTypes(): Observable<DataResult<ExternalEventType[]>> {
    return EMPTY
  }

  storeEvent(payload: any): Observable<DataResult<any>> {
    return EMPTY
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    return EMPTY
  }
}

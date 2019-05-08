import { Injectable } from '@angular/core'

import { Observable, EMPTY, of } from 'rxjs'

import { DataResult } from '../../../models'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent,
  ExternalEventType
} from '../../../models/commitment-event.model'
import * as eventTypes from './data/eventTypes.json'
import * as externalEventTypes from './data/timeRanges.json'

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
    return of({ data: eventTypes })
  }

  getExternalEvents(
    externalEventTypes: any[]
  ): Observable<DataResult<ExternalEvent[]>> {
    return of({ data: externalEventTypes })
  }

  getExternalEventTypes(): Observable<DataResult<ExternalEventType[]>> {
    return of({
      data: externalEventTypes.map(e => ({
        id: Math.random().toString(),
        name: e.name,
        cssClass: e.cls
      }))
    })
  }

  storeEvent(payload: any): Observable<DataResult<any>> {
    // write to local storage
    return EMPTY
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    // remove from local storage
    return EMPTY
  }
}

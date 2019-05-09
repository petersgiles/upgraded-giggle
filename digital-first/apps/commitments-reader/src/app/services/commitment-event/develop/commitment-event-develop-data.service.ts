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
import * as externalEvents from './data/timeRanges.json'
import * as externalEventTypes from './data/externalEventType.json'

import { CommitmentEventDataService } from '../commitment-event-data-service'
import { DateHelper } from 'bryntum-scheduler/scheduler.umd.js'

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

  getEventTypes(config: any): Observable<DataResult<CommitmentEventType[]>> {
    return of({ data: eventTypes })
  }

  getExternalEvents(
    externalEventTypes: any[]
  ): Observable<DataResult<ExternalEvent[]>> {
    const types = externalEventTypes
    const data = externalEvents
      .map(e => ({
        name: e.name,
        cls: e.cls,
        startDate: DateHelper.parse(e.startDate, 'yyyy/MM/dd'),
        endDate: DateHelper.parse(e.endDate, 'yyyy/MM/dd'),
        eventTypeId: e.eventTypeId
      }))
      .filter(
        c => types.filter(e => e.id === c.eventTypeId).length > 0
      )
    return of({
      data: data
    })
  }

  getExternalEventTypes(
    config: any
  ): Observable<DataResult<ExternalEventType[]>> {
    return of({
      data: externalEventTypes
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

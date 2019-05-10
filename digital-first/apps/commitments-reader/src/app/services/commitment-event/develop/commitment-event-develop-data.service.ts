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
  private COMMITMENT_DATA_KEY = 'commitmentEvents'
  getEventsByCommitments(
    config: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    return of({
      data: this.getEventDataFromLocalStorage(),
      loading: false,
      error: null
    })
  }

  getEventTypes(payload: any): Observable<DataResult<CommitmentEventType[]>> {
    if (payload && payload.readonly) {
      return of({ data: [] })
    }
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
      .filter(c => types.filter(e => e === c.eventTypeId).length > 0)
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
    if (payload && payload.isReadOnly) {
      throw Error('You do not have permission to add event')
    }
    const existingId = payload.data.id
    let events = this.getEventDataFromLocalStorage()
    if (existingId.indexOf('_generated') < 0) {
      events = events.filter(e => e.id !== existingId)
      events.push(payload.data)
    } else {
      let event = JSON.parse(JSON.stringify(payload.data))
      event.id = Math.random().toString()
      events.push(event)
    }
    this.writeEventDataToLocalStorage(events)
    return of({
      data: events,
      loading: false,
      error: null
    })
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    if (payload && payload.readonly) {
      throw Error('You do not have permission to add event')
    }
    let events = this.getEventDataFromLocalStorage()
    events = events.filter(e => e.id !== payload.data.id)
    this.writeEventDataToLocalStorage(events)
    return of({
      data: events,
      loading: false,
      error: null
    })
  }

  private getEventDataFromLocalStorage() {
    const dataInLocalStorage = localStorage.getItem(this.COMMITMENT_DATA_KEY)
    if (dataInLocalStorage) {
      return JSON.parse(dataInLocalStorage)
    } else {
      const events: any[] = []
      return events
    }
  }

  private writeEventDataToLocalStorage(events: any[]) {
    localStorage.setItem(this.COMMITMENT_DATA_KEY, JSON.stringify(events))
  }
}

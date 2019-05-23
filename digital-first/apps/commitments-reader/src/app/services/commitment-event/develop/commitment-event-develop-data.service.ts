import { Injectable } from '@angular/core'

import { Observable, EMPTY, of, throwError } from 'rxjs'

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
import {
  OPERATION_RIGHT_HIDE,
  OPERATION_RIGHT_WRITE,
  OPERATION_RIGHT_READ
} from '../../app-data/app-operations'

@Injectable({
  providedIn: 'root'
})
export class EventDevelopDataService implements CommitmentEventDataService {
  WRITE = OPERATION_RIGHT_WRITE
  READ = OPERATION_RIGHT_READ
  HIDE = OPERATION_RIGHT_HIDE
  constructor() {}
  private COMMITMENT_DATA_KEY = 'commitmentEvents'
  getEventsByCommitments(
    payload: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    if (
      !payload ||
      payload.permission === this.HIDE ||
      (!payload.commitments || payload.commitments.length === 0)
    ) {
      return of({ data: [] })
    }
    const commitments = payload.commitments.slice(
      payload.pageIndex * payload.pageSize,
      payload.pageSize + payload.pageIndex * payload.pageSize
    )
    const events = this.getEventDataFromLocalStorage().filter(
      e => commitments.filter(c => c.id === e.resourceId).length > 0
    )
    return of({
      data: events,
      loading: false,
      error: null
    })
  }

  getEventTypes(payload: any): Observable<DataResult<CommitmentEventType[]>> {
    if (!payload || payload !== this.WRITE) {
      return of({
        data: [],
        loadding: false,
        error: null
      })
    }
    return of({ data: eventTypes })
  }

  getExternalEvents(payload: any): Observable<DataResult<ExternalEvent[]>> {
    if (
      !payload ||
      payload.permission === this.HIDE ||
      !payload.selectedExternalEventTypes ||
      payload.selectedExternalEventTypes.length === 0
    ) {
      return of({
        data: [],
        loadding: false,
        error: null
      })
    }
    const types = payload.selectedExternalEventTypes
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
    payload: any
  ): Observable<DataResult<ExternalEventType[]>> {
    if (!payload || payload === this.HIDE) {
      return of({ data: [] })
    }
    return of({
      data: externalEventTypes
    })
  }

  storeEvent(payload: any): Observable<DataResult<any>> {
    if (!payload) {
      return of({
        data: [],
        loading: false,
        error: null
      })
    }
    if (payload.permission !== this.WRITE) {
      return throwError('You do not have permission to edit event')
    }
    try {
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
    } catch (error) {
      return throwError(error)
    }
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    if (!payload) {
      return of({
        data: [],
        loading: false,
        error: null
      })
    }
    if (payload.permission !== this.WRITE) {
      return throwError('You do not have permission to edit event')
    }
    try {
      let events = this.getEventDataFromLocalStorage()
      events = events.filter(e => e.id !== payload.data.id)
      this.writeEventDataToLocalStorage(events)
      return of({
        data: events,
        loading: false,
        error: null
      })
    } catch (error) {
      return throwError(error)
    }
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

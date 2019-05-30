import { Injectable } from '@angular/core'

import { Observable, of, forkJoin, EMPTY, throwError } from 'rxjs'
import { concatMap, map, tap, concat } from 'rxjs/operators'
import { SharepointJsomService } from '@df/sharepoint'
import { DataResult } from '../../../models'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent,
  ExternalEventType
} from '../../../models/commitment-event.model'
import { byCommitmentIdsQuery, byExternalEventTypeIdsQuery } from './caml'

import {
  mapCommitmentEvents,
  mapCommitmentEventTypes,
  mapExternalEvents,
  mapExternalEventTypes
} from './mapping'
import { CommitmentEventDataService } from '../commitment-event-data-service'
import {
  OPERATION_RIGHT_HIDE,
  OPERATION_RIGHT_WRITE,
  OPERATION_RIGHT_READ
} from '@digital-first/df-app-core'
import { empty } from 'apollo-link'

@Injectable({
  providedIn: 'root'
})
export class EventSharepointDataService implements CommitmentEventDataService {
  WRITE = OPERATION_RIGHT_WRITE
  READ = OPERATION_RIGHT_READ
  HIDE = OPERATION_RIGHT_HIDE

  constructor(private sharepoint: SharepointJsomService) {}

  getEventsByCommitments(
    payload: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    if (
      !payload ||
      payload.permission === this.HIDE ||
      (!payload.commitments ||  payload.commitments.length === 0)
    ) {
      return of({ data: [], loadding: false, error: null })
    }

    // TODO: check if user has hide permission then return empty
    const commitmentIds = payload.commitments
      .slice(
        payload.pageIndex * payload.pageSize,
        payload.pageSize + payload.pageIndex * payload.pageSize
      )
      .map(c => c.id)
    const viewXml = byCommitmentIdsQuery(commitmentIds)
    return this.sharepoint
      .getItems({ listName: 'CommitmentEvent', viewXml: viewXml })
      .pipe(
        map(events => ({ data: mapCommitmentEvents(events), loading: false }))
      )
  }

  getEventTypes(payload: any): Observable<DataResult<CommitmentEventType[]>> {
    if (!payload || payload !== this.WRITE) {
      return of({
        data: [],
        loadding: false,
        error: null
      })
    } else {
      return this.sharepoint.getItems({ listName: 'CommitmentEventType' }).pipe(
        map((result: any) => ({
          data: mapCommitmentEventTypes(result).sort((a, b) =>
            a.type < b.type ? -1 : 1
          ),
          loading: false,
          error: null
        }))
      )
    }
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
    try {
      const viewXml = byExternalEventTypeIdsQuery(
        payload.selectedExternalEventTypes
      )
      return forkJoin([
        this.sharepoint.getItems({
          listName: 'ExternalEvent',
          viewXml: viewXml
        }),
        this.sharepoint.getItems({ listName: 'ExternalEventType' })
      ]).pipe(
        concatMap(([externalEvents, eventTypes]) =>
          of({
            data: mapExternalEvents(externalEvents, eventTypes),
            loading: false,
            error: null
          })
        )
      )
    } catch (error) {
      return throwError(error)
    }
  }

  getExternalEventTypes(
    payload: any
  ): Observable<DataResult<ExternalEventType[]>> {
    if (!payload || payload === this.HIDE) {
      return of({
        data: [],
        loadding: false,
        error: null
      })
    }
    return this.sharepoint.getItems({ listName: 'ExternalEventType' }).pipe(
      map((result: any) => ({
        data: mapExternalEventTypes(result).sort((a, b) =>
          a.name < b.name ? -1 : 1
        ),
        loading: false,
        error: null
      }))
    )
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
      const spData = {
        Title: payload.data.name,
        CommitmentId: payload.data.resourceId,
        StartDate: payload.data.startDate,
        EndDate: payload.data.endDate,
        EventType: payload.data.eventType,
        CssClass: payload.data.eventCls,
        Colour: payload.data.eventColor,
        Icon: payload.data.iconCls
      }
      const existingEvent = parseInt(payload.data.id, 10) >= 0 // byrntum scheduler will auto assign an id starts wtih _generated

      return this.sharepoint
        .storeItem({
          listName: 'CommitmentEvent',
          data: spData,
          id: existingEvent ? payload.data.id : null
        })
        .pipe(
          map(_ => ({
            data: { name: payload.data.name },
            loading: false
          }))
        )
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
      return this.sharepoint
        .removeItem({
          listName: 'CommitmentEvent',
          id: payload.data.id
        })
        .pipe(
          map(_ => ({
            loading: false,
            data: {
              commitment: payload.id
            }
          }))
        )
    } catch (error) {
      return throwError(error)
    }
  }
}

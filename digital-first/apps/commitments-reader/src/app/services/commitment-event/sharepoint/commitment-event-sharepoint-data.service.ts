import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
import { concatMap, map, tap } from 'rxjs/operators'
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

@Injectable({
  providedIn: 'root'
})
export class EventSharepointDataService implements CommitmentEventDataService {
  constructor(private sharepoint: SharepointJsomService) {}

  getEventsByCommitments(
    payload: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    if (!payload.commitments || payload.commitments.length === 0) {
      return of()
    }
    const commitmentIds = payload.commitments.map(c => c.id)
    const viewXml = byCommitmentIdsQuery(commitmentIds)
    return this.sharepoint
      .getItems({ listName: 'CommitmentEvent' })
      .pipe(
        concatMap(events =>
          of({ data: mapCommitmentEvents(events), loading: false })
        )
      )
  }

  getEventTypes(config: any): Observable<DataResult<CommitmentEventType[]>> {
    if (config && config.isReadOnly) {
      return of({
        data: [],
        loadding: false,
        error: null
      })
    } else {
      return this.sharepoint.getItems({ listName: 'CommitmentEventType' }).pipe(
        concatMap((result: any) =>
          of({
            data: mapCommitmentEventTypes(result).sort((a, b) =>
              a.type < b.type ? -1 : 1
            ),
            loading: false,
            error: null
          })
        )
      )
    }
  }

  getExternalEvents(
    externalEventTypes: any[]
  ): Observable<DataResult<ExternalEvent[]>> {
    const viewXml = byExternalEventTypeIdsQuery(externalEventTypes)
    return forkJoin(
      this.sharepoint.getItems({ listName: 'ExternalEvent', viewXml: viewXml }),
      this.sharepoint.getItems({ listName: 'ExternalEventType' })
    ).pipe(
      concatMap(([externalEvents, eventTypes]) =>
        of({
          data: mapExternalEvents(externalEvents, eventTypes),
          loading: false,
          error: null
        })
      )
    )
  }

  getExternalEventTypes(
    config: any
  ): Observable<DataResult<ExternalEventType[]>> {
    if (config && config.isReadOnly) {
      return of({
        data: [],
        loadding: false,
        error: null
      })
    } else {
      return this.sharepoint.getItems({ listName: 'ExternalEventType' }).pipe(
        concatMap((result: any) =>
          of({
            data: mapExternalEventTypes(result).sort((a, b) =>
              a.name < b.name ? -1 : 1
            ),
            loading: false,
            error: null
          })
        )
      )
    }
  }

  storeEvent(payload: any): Observable<DataResult<any>> {
    if (payload.config && payload.config.isReadOnly) {
      throw Error('You do not have permission to add event')
    }
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
        concatMap(_ =>
          of({
            data: { name: payload.data.name },
            loading: false
          })
        )
      )
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    if (payload.config && payload.config.isReadOnly) {
      throw Error('You do not have permission to delete event')
    }
    return this.sharepoint
      .removeItem({
        listName: 'CommitmentEvent',
        id: payload.data.id
      })
      .pipe(
        concatMap(_ =>
          of({
            loading: false,
            data: {
              commitment: payload.id
            }
          })
        )
      )
  }
}

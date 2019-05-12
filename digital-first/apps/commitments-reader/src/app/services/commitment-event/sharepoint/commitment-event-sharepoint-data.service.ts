import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
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

@Injectable({
  providedIn: 'root'
})
export class EventSharepointDataService implements CommitmentEventDataService {
  constructor(private sharepoint: SharepointJsomService) {}

  getEventsByCommitments(
    payload: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    if (!payload || !payload.commitments || payload.commitments.length === 0) {
      return of()
    }

    // TODO: check if user has hide permission then return empty
    const commitmentIds = payload.commitments.map(c => c.id)
    const viewXml = byCommitmentIdsQuery(commitmentIds)
    return this.sharepoint
      .getItems({ listName: 'CommitmentEvent' })
      .pipe(
        map(events => ({ data: mapCommitmentEvents(events), loading: false }))
      )
  }

  getEventTypes(config: any): Observable<DataResult<CommitmentEventType[]>> {
    if (config && config.readonly) {
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

  getExternalEvents(
    externalEventTypes: any[]
  ): Observable<DataResult<ExternalEvent[]>> {
    if (!externalEventTypes || externalEventTypes.length === 0) {
      return of({
        data: []
      })
    }
    const viewXml = byExternalEventTypeIdsQuery(externalEventTypes)
    return forkJoin([
      this.sharepoint.getItems({ listName: 'ExternalEvent', viewXml: viewXml }),
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
  }

  getExternalEventTypes(
    config: any
  ): Observable<DataResult<ExternalEventType[]>> {
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
    // if (payload && payload.readonly) {
    //   throw Error('You do not have permission to add event')
    // }
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
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    // if (payload && payload.readonly) {
    //   throw Error('You do not have permission to delete event')
    // }
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
  }
}

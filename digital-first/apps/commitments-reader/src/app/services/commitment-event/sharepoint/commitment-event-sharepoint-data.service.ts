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
    commitments: any
  ): Observable<DataResult<CommitmentEvent[]>> {
    if (!commitments || commitments.length === 0) {
      return of()
    }
    const commitmentIds = commitments.map(c => c.id)
    const viewXml = byCommitmentIdsQuery(commitmentIds)
    return this.sharepoint
      .getItems({ listName: 'CommitmentEvent' })
      .pipe(
        concatMap(events =>
          of({ data: mapCommitmentEvents(events), loading: false })
        )
      )
  }

  getEventTypes(): Observable<DataResult<CommitmentEventType[]>> {
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

  getExternalEventTypes(): Observable<DataResult<ExternalEventType[]>> {
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

  storeEvent(payload: any): Observable<DataResult<any>> {
    const spData = {
      Title: payload.name,
      CommitmentId: payload.resourceId,
      StartDate: payload.startDate,
      EndDate: payload.endDate,
      EventType: payload.eventType,
      CssClass: payload.eventCls,
      Colour: payload.eventColor,
      Icon: payload.iconCls
    }
    const existingEvent = parseInt(payload.id, 10) >= 0 // byrntum scheduler will auto assign an id starts wtih _generated
    return this.sharepoint
      .storeItem({
        listName: 'CommitmentEvent',
        data: spData,
        id: existingEvent ? payload.id : null
      })
      .pipe(
        concatMap(_ =>
          of({
            data: { name: payload.name },
            loading: false
          })
        )
      )
  }

  removeEvent(payload: any): Observable<DataResult<any>> {
    return this.sharepoint
      .removeItem({
        listName: 'CommitmentEvent',
        id: payload.id
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

import { Injectable } from '@angular/core'

import { Observable, of, forkJoin } from 'rxjs'
import { concatMap, map, tap } from 'rxjs/operators'
import { SharepointJsomService } from '@df/sharepoint'
import { DataResult } from '../../../models'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent
} from '../../../models/commitment-event.model'
import { byCommitmentIdsQuery } from './caml'
import {
  mapCommitmentEvents,
  mapCommitmentEventTypes,
  mapExternalEvent,
  mapExternalEvents
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
      .getItems({ listName: 'CommitmentEvent', viewXml: viewXml })
      .pipe(
        concatMap(events => of({ data: mapCommitmentEvents(events), loading: false }))
      )
  }

  getEventTypes(): Observable<DataResult<CommitmentEventType[]>> {
    return this.sharepoint.getItems({ listName: 'CommitmentEventType' }).pipe(
      concatMap((result: any) => of({
        data: mapCommitmentEventTypes(result),
        loading: false,
        error: null
      }))
    )
  }

  getExternalEvents(): Observable<DataResult<ExternalEvent[]>> {
    return this.sharepoint.getItems({ listName: 'ExternalEvent' }).pipe(
      concatMap((result: any) => of({
        data: mapExternalEvents(result),
        loading: false,
        error: null
      }))
    )
  }
}

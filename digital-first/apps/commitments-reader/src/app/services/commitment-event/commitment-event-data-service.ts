import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { DataResult } from '../../models'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent,
  ExternalEventType
} from '../../models/commitment-event.model'
import { EventSharepointDataService } from './sharepoint/commitment-event-sharepoint-data.service'
import { SettingsService } from '../settings.service'
import { SharepointJsomService } from '@df/sharepoint'
import { EventDevelopDataService } from './develop/commitment-event-develop-data.service'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentEventDataService {
  abstract getEventsByCommitments(
    commitments: any
  ): Observable<DataResult<CommitmentEvent[]>>
  abstract getEventTypes(): Observable<DataResult<CommitmentEventType[]>>
  abstract getExternalEvents(
    externalEventTypes: any[]
  ): Observable<DataResult<ExternalEvent[]>>
  abstract getExternalEventTypes(): Observable<DataResult<ExternalEventType[]>>
  abstract storeEvent(payload: any): Observable<DataResult<any>>
  abstract removeEvent(payload: any): Observable<DataResult<any>>
}

const commitmentEventDataServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new EventSharepointDataService(sharepointlib)
    default:
      return new EventDevelopDataService()
  }
}

export let commitmentEventDataServiceProvider = {
  provide: CommitmentEventDataService,
  useFactory: commitmentEventDataServiceFactory,
  deps: [SettingsService, SharepointJsomService]
}

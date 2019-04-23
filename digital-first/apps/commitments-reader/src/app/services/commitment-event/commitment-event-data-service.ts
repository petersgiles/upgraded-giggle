import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { DataResult } from '../../models'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent
} from '../../models/commitment-event.model'
import { EventSharepointDataService } from './sharepoint/commitment-event-sharepoint-data.service'
import { SettingsService } from '../settings.service'
import { SharepointJsomService } from '@df/sharepoint'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentEventDataService {
  abstract getEventsByCommitments(
    commitments: any
  ): Observable<DataResult<CommitmentEvent[]>>
  abstract getEventTypes(): Observable<DataResult<CommitmentEventType[]>>
  abstract getExternalEvents(): Observable<DataResult<ExternalEvent[]>>
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
      return new EventSharepointDataService(sharepointlib)
  }
}

export let commitmentEventDataServiceProvider = {
  provide: CommitmentEventDataService,
  useFactory: commitmentEventDataServiceFactory,
  deps: [SettingsService, SharepointJsomService]
}

import { LoggerService } from '@digital-first/df-logging'
import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import {  DataResult, CommitmentActionsResult } from '../../models'
import { CommitmentActionDataSharePointService } from './sharepoint/commitment-action-data.service'
import { CommitmentActionDataApolloService } from './apollo/commitment-action-data.service'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentActionDataService {
  abstract removeActionFromCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract addActionToCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract getActionsByCommitment(commitment: any): Observable<DataResult<CommitmentActionsResult>>
}

const commitmentActionsDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo, logger: LoggerService) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentActionDataSharePointService(sharepointlib, logger)
    default:
      return new CommitmentActionDataApolloService(apollo, logger)
  }

}

export let commitmentActionsDataServiceProvider = {
  provide: CommitmentActionDataService,
  useFactory: commitmentActionsDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo, LoggerService]
}

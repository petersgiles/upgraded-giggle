import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { CommentsResult, DataResult } from '../../models'
import { CommitmentDiscussionDataSharePointService } from './sharepoint/commitment-discussion-data.service'
import { CommitmentDiscussionDataApolloService } from './apollo/commitment-discussion-data.service'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentDiscussionDataService {
  abstract deleteComment(variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>>
  abstract storeComment(comment: {
    commitment: any;
    parent: any;
    comment: any;
    author: any;
  }): Observable<DataResult<{ commitment: number }>>
  abstract getCommentsByCommitment(commitment: any): Observable<DataResult<CommentsResult>>
}

const discussionDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentDiscussionDataSharePointService(sharepointlib)
    default:
      return new CommitmentDiscussionDataApolloService(apollo)
  }

}

export let discussionDataServiceProvider = {
  provide: CommitmentDiscussionDataService,
  useFactory: discussionDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable, of } from 'rxjs'
import { callQuery, callMutate } from '../../services/apollo/apollo-helpers'
import { CommentsResult, DataResult, CommitmentResult } from '../../models'
import { COMMENTS_BY_COMMITMENT, ADD_COMMENT, DELETE_COMMENT } from './apollo/queries'
import { concatMap } from 'rxjs/operators'
import { byCommitmentIdQuery } from '../../services/sharepoint/caml'
import { mapComments } from './sharepoint/maps'

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

export class CommitmentDiscussionDataApolloService implements CommitmentDiscussionDataService {

  deleteComment = (variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>> => callMutate<{ commitment: number }>(
    this.apollo,
    { mutation: DELETE_COMMENT, variables: { ...variables } },
    (result: any) => ({ data: { commitment: result.data.deleteComment.commitment } })
  )

  storeComment = (comment: {
    commitment: any;
    parent: any;
    comment: any;
    author: any;
  }): Observable<DataResult<{ commitment: number }>> => {
    const variables = {
      commitment: comment.commitment,
      parent: comment.parent,
      text: comment.comment,
      author: 'Domenica20',
      created: moment()
    }
    return callMutate<any>(this.apollo, { mutation: ADD_COMMENT, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.addComment.commitment } })
    )

  }
  getCommentsByCommitment = (commitment: any) => callQuery<CommentsResult>(this.apollo, { query: COMMENTS_BY_COMMITMENT, variables: { commitment: commitment } })

  constructor(private apollo: Apollo) { }
}

export class CommitmentDiscussionDataSharePointService implements CommitmentDiscussionDataService {

  deleteComment = (variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>> =>
    this.sharepoint.removeItem({
      listName: 'CommitmentComment',
      id: variables.id,
    })

  storeComment = (comment: {
    commitment: any;
    parent: any;
    comment: any;
    author: any;
  }): Observable<DataResult<{ commitment: number }>> => {

    const spComment = {
      Title: comment.commitment,
      Commitment: comment.commitment,
      Parent: comment.parent,
      Text: comment.comment
    }

    return this.sharepoint.storeItem({
      listName: 'CommitmentComment',
      data: spComment,
    })
  }
  getCommentsByCommitment = (commitment: any): Observable<DataResult<CommentsResult>> =>
    this.sharepoint.getItems({
      listName: 'CommitmentComment',
      viewXml: byCommitmentIdQuery({ id: commitment })
    }).pipe(
      concatMap((comments: any) =>
        of({
          data: { comments: mapComments(comments) },
          loading: false
        }))
    )

  constructor(private sharepoint: SharepointJsomService) { }
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
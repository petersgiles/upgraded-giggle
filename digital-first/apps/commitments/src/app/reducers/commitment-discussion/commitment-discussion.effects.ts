import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError, tap } from 'rxjs/operators'
import { CommitmentDiscussionDataService } from './commitment-discussion-data.service'
import { CommitmentDiscussionActionTypes, RemoveComment, GetCommentsByCommitment, CommentActionFailure, StoreComment, LoadComments, ClearComments } from './commitment-discussion.actions'
import { CommentsResult, DataResult } from '../../models'

@Injectable()
export class CommentDiscussionEffects {

  @Effect()
  getCommentByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentDiscussionActionTypes.GetCommentsByCommitment),
      map((action: GetCommentsByCommitment) => action.payload.commitment),
      // tslint:disable-next-line:no-console
      tap(result => console.log('getCommentByCommitment =>  ', result)),
      switchMap((commitment: any) => this.service.getCommentsByCommitment(commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('getCommentByCommitment', result)),
          map((result: DataResult<CommentsResult>) => new LoadComments(result)),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  @Effect()
  storeComment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentDiscussionActionTypes.StoreComment),
      map((action: StoreComment) => action.payload),
      switchMap((payload: any) => this.service.storeComment(payload)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('storeComment', result)),
          map(result => new GetCommentsByCommitment({ commitment: result.data.commitment })),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  @Effect()
  removeComment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentDiscussionActionTypes.RemoveComment),
      map((action: RemoveComment) => action.payload),
      switchMap((payload: any) => this.service.deleteComment(payload)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('removeComment', result)),
          switchMap((result) => [
            new ClearComments(),
            new GetCommentsByCommitment({ commitment: result.data.commitment })
          ]),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: CommitmentDiscussionDataService) { }
}

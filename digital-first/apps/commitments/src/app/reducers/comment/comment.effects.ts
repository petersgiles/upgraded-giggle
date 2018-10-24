import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommentsResult } from '../../models'
import { CommentActionTypes, LoadComments, GetCommentsByCommitment, CommentActionFailure, StoreComment, RemoveComment } from './comment.actions'

@Injectable()
export class CommentEffects {

  @Effect()
  getCommentByComment$: Observable<Action> = this.actions$
    .ofType(CommentActionTypes.GetCommentsByCommitment)
    .pipe(
      map((action: GetCommentsByCommitment) => action.payload.commitment),
      switchMap((commitment: any) => this.service.getCommentsByCommitment(commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('GetCommentsByCommitment =>', result)),
          map((result: DataResult<CommentsResult>) => new LoadComments(result)),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  @Effect()
  storeComment$: Observable<Action> = this.actions$
    .ofType(CommentActionTypes.StoreComment)
    .pipe(
      map((action: StoreComment) => action.payload),
      switchMap((comment: any) => this.service.upsertComment(comment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('Store Comment =>', result)),
          map(_ => new GetCommentsByCommitment({ commitment: comment.commitment })),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  @Effect()
  removeComment$: Observable<Action> = this.actions$
    .ofType(CommentActionTypes.RemoveComment)
    .pipe(
      map((action: RemoveComment) => action.payload),
      switchMap((comment: any) => this.service.deleteComment(comment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('Remove Comment =>', result)),
          map((result: {commitment: number}) => new GetCommentsByCommitment({ commitment: result.commitment })),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}

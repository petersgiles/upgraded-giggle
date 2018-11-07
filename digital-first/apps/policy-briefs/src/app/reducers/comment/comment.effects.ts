import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommentsResult } from '../../models'
import { CommentActionTypes, LoadComments,  CommentActionFailure, StoreComment, RemoveComment, CommentActionSuccess } from './comment.actions'
import { AppNotification, ClearAppNotification } from '../app.actions'

@Injectable()
export class CommentEffects {

  @Effect()
  storeComment$: Observable<Action> = this.actions$
    .ofType(CommentActionTypes.StoreComment)
    .pipe(
      map((action: StoreComment) => action.payload),
      switchMap((payload: any) => this.service.storeComment(payload)
        .pipe(
          switchMap(result => [
            new AppNotification({ message: 'Comment Saved' }),
            new CommentActionSuccess(result),
            new ClearAppNotification()
          ]),
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
          switchMap(result => [
            new AppNotification({ message: 'Comment Removed' }),
            new CommentActionSuccess(result),
            new ClearAppNotification()
          ]),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}

import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommentsResult } from '../../models'
import { CommentActionTypes, LoadComments, GetCommentsByCommitment, CommentActionFailure } from './comment.actions'

@Injectable()
export class CommentEffects {

  @Effect()
  getCommentByCommitment$: Observable<Action> = this.actions$
    .ofType(CommentActionTypes.GetCommentsByCommitment)
    .pipe(
      map((action: GetCommentsByCommitment) => action.payload.commitment),
      switchMap((commitment: any) => this.service.getCommentsByCommitment(commitment)
        .pipe(
          map((result: DataResult<CommentsResult>) => new LoadComments(result)),
          catchError(error => of(new CommentActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}

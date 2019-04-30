import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CommitmentDetailActionTypes, CommitmentDetailActions } from './commitment-detail.actions';


@Injectable()
export class CommitmentDetailEffects {


  @Effect()
  loadCommitmentDetails$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.LoadCommitmentDetails),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<CommitmentDetailActions>) {}

}

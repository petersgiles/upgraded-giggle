import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, filter, switchMap } from 'rxjs/operators'
import { RouteChange, CHANGE, ofRoute } from '../router.actions'
import { EMPTY } from 'rxjs';
import { CommitmentDetailActionTypes, CommitmentDetailActions, LoadCommitmentDetails } from './commitment-detail.actions';
import {CommitmentDetailService } from './commitment-detail.service'
//import { Observable } from 'apollo-link';
//getCurrentUser

@Injectable()
export class CommitmentDetailEffects {


  @Effect()
  loadCommitmentDetails$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.LoadCommitmentDetails),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );

  @Effect()
  commitmentDetailsRouted$ = this.actions$.pipe(
    ofType(CHANGE),
    filter((routeChangeAction: RouteChange) => routeChangeAction.payload.path === 'commitment/:id'),
     concatMap((action) => this.commitmentDetailService.getCurrentUser({action}))
    //new LoadCommitmentActions({ actions: result.data.commitmentActions })),
  )

  
  @Effect() commitmentRouted = this.actions$.pipe(ofRoute('commitmentDetail/:id'))

  constructor(private actions$: Actions<CommitmentDetailActions>, private commitmentDetailService: CommitmentDetailService) {}

}

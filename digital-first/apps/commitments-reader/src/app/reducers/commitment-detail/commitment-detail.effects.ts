import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, filter, switchMap, map } from 'rxjs/operators'
import { RouteChange, CHANGE, ofRoute } from '../router.actions'
import { EMPTY, of } from 'rxjs';
import { CommitmentDetailActionTypes, CommitmentDetailActions, LoadDetailedCommitment, GetDetailedCommitment } from './commitment-detail.actions';
import {CommitmentDetailService } from './commitment-detail.service'
import { Commitment } from '../../models/commitment.model'

@Injectable()
export class CommitmentDetailEffects {

  @Effect()
  loadCommitments$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.LoadCommitments),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  )


   @Effect()
  loadCommitmentDetails$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.GetDetailedCommitment),
    switchMap((result: any) => {
         
      return of(result)
    }),
    map(result => new LoadDetailedCommitment(result))
  ) 

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

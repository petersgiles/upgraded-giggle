import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, filter, switchMap, map } from 'rxjs/operators'
import { RouteChange, CHANGE, ofRoute } from '../router.actions'
import { EMPTY, of } from 'rxjs';
import { CommitmentDetailActionTypes, CommitmentDetailActions, LoadDetailedCommitment, LoadHandlingAdvices } from './commitment-detail.actions';
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
    map((action: any) => action.payload),
    map(result => new LoadDetailedCommitment(result))
  ) 

  @Effect()
  loadHandlinfAdvices$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.GetHandlingAdvices),
    switchMap((result: any) => {
         
      return of(result)
    }),
    map((action: any) => action.payload),
    map(result => new LoadHandlingAdvices(result))
  ) 

  @Effect()
  updatePMOHandlingAdvice$ = this.actions$
    .pipe(
      ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdvice),
      map((action: any) => action.payload),
      switchMap((value: any) => [this.commitmentDetailService.updatePmoHandlingAdviceCommitment(value)]
 
    ))

    @Effect()
  updatePMCHandlingAdvice$ = this.actions$
    .pipe(
      ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
      map((action: any) => action.payload),
      switchMap((value: any) => [this.commitmentDetailService.updatePmcHandlingAdviceCommitment(value)]
 
    ))


  /*@Effect()
  updatePMOHandlingAdvice$ = this.actions$
    .pipe(
      ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdvice),
      map((action: any) => action.payload),
      switchMap((value: any) => 
        {
          return this.commitmentDetailService.updatePmoHandlingAdviceCommitment(value)
          .pipe( map((result: Commitment) => new LoadDetailedCommitment({commitment: result}))
          )}  
    ))

  @Effect()
  updatePMCHandlingAdvice$ = this.actions$
    .pipe(
      ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
      map((action: any) => action.payload),
      switchMap((value: any) => 
        {
          return this.commitmentDetailService.updatePmcHandlingAdviceCommitment(value)
          .pipe( map((result: Commitment) => new LoadDetailedCommitment({commitment: result}))
          )}  
    ))*/

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

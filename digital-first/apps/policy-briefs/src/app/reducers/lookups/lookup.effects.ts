import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  concatMap,
  map,
  catchError,
  tap
} from 'rxjs/operators'
import { of, EMPTY } from 'rxjs'
import {
  LookupActionTypes,
  LookupActions,
  LoadLookupPolicies,
  LoadLookupSubPolicies,
  LoadLookupCommitments,
  LoadLookupClassifications,
  LoadLookupDLMs,
  LoadLookupStatuses,
  LoadLookupActivities,
  LoadLookupDivisions
} from './lookup.actions'

import { LookupDataService } from './lookup-data.service'

@Injectable()
export class LookupEffects {
  @Effect()
  getPolicies$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupPolicies),
    concatMap(_ => this.service.getPolicies()),
    map((result: any[]) => new LoadLookupPolicies({data: result, loading: false}))
  )

  @Effect()
  getSubPolicies$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupSubPolicies),
    concatMap(_ => this.service.getSubPolicies()),
    map((result: any[]) => new LoadLookupSubPolicies({data: result, loading: false}))
  )

  @Effect()
  getCommitments$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupCommitments),
    concatMap(_ => this.service.getCommitments()),
    map((result: any[]) => new LoadLookupCommitments({data: result, loading: false}))
  )

  @Effect()
  getClassifications$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupClassifications),
    concatMap(_ => this.service.getClassifications()),
    map((result: any[]) => new LoadLookupClassifications({data: result, loading: false}))
  )

  @Effect()
  getDLMs$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupDLMs),
    concatMap(_ => this.service.getDLMs()),
    map((result: any[]) => new LoadLookupDLMs({data: result, loading: false}))
  )

  @Effect()
  getLookupStatuses$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupStatuses),
    concatMap(_ => this.service.getLookupStatuses()),
    map((result: any[]) => new LoadLookupStatuses({data: result, loading: false}))
  )

  @Effect()
  getLookupActivities$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupActivities),
    concatMap(_ => this.service.getLookupActivities()),
    map((result: any[]) => new LoadLookupActivities({data: result, loading: false}))
  )
  
  @Effect()
  getLookupDivisions$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetLookupDivisions),
    concatMap(_ => this.service.getLookupDivisions()),
    map((result: any[]) => new LoadLookupDivisions({data: result, loading: false}))
  )

  constructor(
    private actions$: Actions<LookupActions>,
    private service: LookupDataService
  ) {}
}

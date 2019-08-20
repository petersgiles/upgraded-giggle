import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, map, switchMap, catchError, tap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'
import {
  BriefActionTypes,
  BriefActions,
  SetActiveBrief,
  LoadBrief,
  GetActiveBriefFailure,
  SetActiveBriefStatus,
  SetBriefPolicy,
  SetBriefPolicySuccess,
  SetBriefSecurityClassification,
  SetBriefDLM,
  SetBriefRecommendedDirection
} from './brief.actions'


import { BriefDataService } from './brief-data.service'
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { GetNavigations } from '../navigation/navigation.actions';
@Injectable()
export class BriefEffects {
  @Effect()
  loadBriefs$ = this.actions$.pipe(
    ofType(BriefActionTypes.LoadBrief),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  )

  @Effect()
  setActiveBrief$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetActiveBrief),
    map((action: SetActiveBrief) => action),
    tap(action => console.log(`SetActiveBrief`, action)),
    concatMap(action =>
      this.service.getActiveBrief(action.payload.activeBriefId)
    ),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadBrief({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )

  @Effect()
  setActiveBriefStatus$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetActiveBriefStatus),
    map((action: SetActiveBriefStatus) => action),
    concatMap(action =>
      this.service.updateBrief(action.payload.activeBriefId, {
        BriefStatus: +action.payload.status 
      })
    ),
    switchMap((result: { briefId: any; loading: boolean }) => [
      new SetActiveBrief({
        activeBriefId: result.briefId
      })
    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )

  @Effect()
  setBriefPolicy$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetBriefPolicy),
    map((action: SetBriefPolicy) => action),
    concatMap(action =>
      this.service.updateBrief(action.payload.activeBriefId, {
        Policy: +action.payload.policy,
        SubPolicy: +action.payload.subpolicy     
      } )
    ),
    switchMap((result: { briefId: any; loading: boolean }) => [
      new SetBriefPolicySuccess(),
      new GetNavigations(),
      new SetActiveBrief({
        activeBriefId: result.briefId
      }),

    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )


  @Effect()
  setBriefSecurityClassification$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetBriefSecurityClassification),
    map((action: SetBriefSecurityClassification) => action),
    concatMap(action =>
      this.service.updateBrief(action.payload.activeBriefId, {
        SecurityClassification: action.payload.securityClassification 
      })
    ),
    switchMap((result: { briefId: any; loading: boolean }) => [
      new SetActiveBrief({
        activeBriefId: result.briefId
      })
    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )
  
  @Effect()
  setBriefDLM$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetBriefDLM),
    map((action: SetBriefDLM) => action),
    concatMap(action =>
      this.service.updateBrief(action.payload.activeBriefId, {
        DLM: action.payload.dLM
      })
    ),
    switchMap((result: { briefId: any; loading: boolean }) => [
      new SetActiveBrief({
        activeBriefId: result.briefId
      })
    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )

  @Effect()
  stBriefRecommendedDirection$ = this.actions$.pipe(
    ofType(BriefActionTypes.SetBriefRecommendedDirection),
    map((action: SetBriefRecommendedDirection) => action),
    concatMap(action => this.service.updateBrief(action.payload.activeBriefId, { recommendedDirection: action.payload.text}, 'RecommendedDirection')),
    switchMap((result: { briefId: any; loading: boolean }) => [
      new SetActiveBrief({
        activeBriefId: result.briefId
      })
    ]),
    catchError(error => of(new GetActiveBriefFailure(error)))
  )
  

  constructor(
    private actions$: Actions<BriefActions>,
    private service: BriefDataService
  ) {}
}

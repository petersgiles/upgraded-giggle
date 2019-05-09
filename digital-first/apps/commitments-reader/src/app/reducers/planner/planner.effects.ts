import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  concatMap,
  withLatestFrom,
  map,
  switchMap,
  catchError,
  first
} from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'
import {
  PlannerActionTypes,
  PlannerActions,
  GetPlannerDataFailure,
  GetCommitmentEvents,
  LoadExternalEvents,
  LoadCommitmentEvents,
  LoadEventTypes,
  LoadExternalEventTypes,
  GetCommitmentEventsFailure,
  LoadPlannerPermission,
  GetExternalEvents,
  GetExternalEventsFailure,
  LoadSelectedExternalEventTypes,
  GetEventTypes,
  GetExternalEventTypes,
  GetEventTypesFailure,
  GetExternalEventTypesFailure
} from './planner.actions'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import { CommitmentEventDataService } from '../../services/commitment-event/commitment-event-data-service'
@Injectable()
export class PlannerEffects {
  @Effect()
  getPlannerData$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetPlannerData),
    withLatestFrom(this.rootStore$),
    map(([_, s]) => {
      const rootStore = <any>s
      const refinedCommitments = rootStore.overview.commitments
      const appConfig = rootStore.app.config
      return {
        commitments: refinedCommitments,
        appConfig: appConfig
      }
    }),
    switchMap(config => [
      new GetCommitmentEvents(config),
      new LoadPlannerPermission(config.appConfig)
    ]),
    catchError(error => of(new GetPlannerDataFailure(error)))
  )

  @Effect()
  getCommitmentsEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetCommitmentEvents),
    withLatestFrom(this.rootStore$),
    map(([action, s]) => {
      const rootStore = <any>s
      const refinedCommitments = rootStore.overview.commitments
      return {
        commitments: refinedCommitments
      }
    }),
    switchMap(config =>
      this.commitmentEventDataService
        .getEventsByCommitments(config)
        .pipe(concatMap(data => [new LoadCommitmentEvents(data)]))
    ),
    catchError(error => of(new GetCommitmentEventsFailure(error)))
  )

  @Effect()
  getEventsReferenceData$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventReferenceData),
    switchMap(_ => [new GetEventTypes(null), new GetExternalEventTypes(null)]),
  )

  @Effect()
  getEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventTypes),
    withLatestFrom(this.rootStore$),
    map(([_, s]) => {
      const rootStore = <any>s
      const appConfig = rootStore.app.config
      return appConfig
    }),
    switchMap(config =>
      this.commitmentEventDataService.getEventTypes(config).pipe(
        first(),
        concatMap(data => [new LoadEventTypes(data)])
      )
    ),
    catchError(error => of(new GetEventTypesFailure(error)))
  )

  @Effect()
  getExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEventTypes),
    withLatestFrom(this.rootStore$),
    map(([_, s]) => {
      const rootStore = <any>s
      const appConfig = rootStore.app.config
      return appConfig
    }),
    switchMap(config =>
      this.commitmentEventDataService.getExternalEventTypes(config).pipe(
        first(),
        concatMap(data => [new LoadExternalEventTypes(data)])
      )
    ),
    catchError(error => of(new GetExternalEventTypesFailure(error)))
  )

  @Effect()
  getExternalEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEvents),
    withLatestFrom(this.rootStore$),
    map(([action, s]) => {
      const rootStore = <any>s
      const selectedExternalEeventTypes =
        rootStore.planner.selectedExternalEeventTypes
      if (action.payload) {
        return action.payload
      } else {
        return selectedExternalEeventTypes
      }
    }),
    switchMap(selectedExternalEeventTypes =>
      this.commitmentEventDataService
        .getExternalEvents(selectedExternalEeventTypes)
        .pipe(concatMap(data => [new LoadExternalEvents(data)]))
    ),
    catchError(error => of(new GetExternalEventsFailure(error)))
  )
  @Effect()
  storeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, s]) => {
      const rootStore = <any>s
      const appConfig = rootStore.app.config
      return {
        appConfig: appConfig,
        data: action.payload
      }
    }),
    switchMap(config =>
      this.commitmentEventDataService
        .storeEvent(config)
        .pipe(concatMap(result => [new GetCommitmentEvents(null)]))
    )
  )

  @Effect()
  removeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.RemoveCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, s]) => {
      const rootStore = <any>s
      const appConfig = rootStore.app.config
      return {
        appConfig: appConfig,
        data: action.payload
      }
    }),
    switchMap(config =>
      this.commitmentEventDataService
        .removeEvent(config)
        .pipe(concatMap(result => [new GetCommitmentEvents(null)]))
    )
  )

  @Effect()
  storeSelectedExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreSelectedExternalEventTypes),
    switchMap(action => [
      new LoadSelectedExternalEventTypes(action.payload),
      new GetExternalEvents(action.payload)
    ])
  )

  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}
}

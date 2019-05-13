import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  map,
  switchMap,
  catchError,
  first,
  withLatestFrom,
  concatMap,
  mergeAll,
  mergeMap
} from 'rxjs/operators'
import {
  PlannerActionTypes,
  PlannerActions,
  GetCommitmentEvents,
  LoadExternalEvents,
  LoadCommitmentEvents,
  LoadEventTypes,
  LoadExternalEventTypes,
  LoadPlannerPermission,
  LoadSelectedExternalEventTypes,
  GetEventTypes,
  GetExternalEventTypes,
  ErrorInPlanner,
  GetExternalEvents
} from './planner.actions'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import { CommitmentEventDataService } from '../../services/commitment-event/commitment-event-data-service'
import { of } from 'rxjs'
import {
  OPERATION_PLANNER,
  OPERATION_RIGHT_WRITE
} from '../../services/app-data/app-operations'
@Injectable()
export class PlannerEffects {
  @Effect()
  getCommitmentsEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetCommitmentEvents),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      return {
        commitments: action.payload
          ? action.payload
          : rootStore.overview.commitments,
        readonly: rootStore.user.readonly
      }
    }),
    switchMap(payload =>
      this.commitmentEventDataService
        .getEventsByCommitments(payload)
        .pipe(map(data => new LoadCommitmentEvents(data)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )

  @Effect()
  getEventsReferenceData$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventReferenceData),
    switchMap(config => [
      new GetEventTypes(null),
      new GetExternalEventTypes(null),
      new GetExternalEvents([])
    ])
  )

  @Effect()
  getEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventTypes),
    withLatestFrom(this.rootStore$),
    map(([_, store]) => {
      const rootStore = <any>store
      return {
        readonly: rootStore.user.readonly
      }
    }),
    switchMap(config =>
      this.commitmentEventDataService
        .getEventTypes(config)
        .pipe(map(data => new LoadEventTypes(data)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )

  @Effect()
  getExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEventTypes),
    switchMap(action =>
      this.commitmentEventDataService
        .getExternalEventTypes(action.payload)
        .pipe(map(data => new LoadExternalEventTypes(data)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )

  @Effect()
  getExternalEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEvents),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      if (!action.payload && action.payload.length > 0) {
        return action.payload
      } else {
        return rootStore.planner.selectedExternalEeventTypes
      }
    }),
    switchMap(selectedExternalEventTypes =>
      this.commitmentEventDataService
        .getExternalEvents(selectedExternalEventTypes)
        .pipe(map(data => new LoadExternalEvents(data)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )
  @Effect()
  storeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      return {
        readonly: rootStore.user.readonly,
        data: action.payload
      }
    }),
    concatMap(config =>
      this.commitmentEventDataService
        .storeEvent(config)
        .pipe(map(result => new GetCommitmentEvents(null)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )

  @Effect()
  removeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.RemoveCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      return {
        readonly: rootStore.user,
        data: action.payload
      }
    }),
    concatMap(config =>
      this.commitmentEventDataService
        .removeEvent(config)
        .pipe(
          map(
            result => new GetCommitmentEvents(null),
            catchError(error => [new ErrorInPlanner(error)])
          )
        )
    )
  )

  @Effect()
  storeSelectedExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreSelectedExternalEventTypes),
    concatMap(action => [
      new LoadSelectedExternalEventTypes(action.payload),
      new GetExternalEvents(action.payload)
    ])
  )

  @Effect()
  getPlannerPermission$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetPlannerPermission),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      const user = rootStore.user.currentUser
      const operations = rootStore.user.operations
      if (user && user.isSiteAdmin) {
        return false
      } else if (
        operations &&
        operations[OPERATION_PLANNER] === OPERATION_RIGHT_WRITE
      ) {
        return false
      } else {
        return true
      }
    }),
    map(readonly => new LoadPlannerPermission(readonly))
  )

  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}
}

import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  map,
  switchMap,
  catchError,
  first,
  withLatestFrom,
  concatMap
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
      new GetExternalEventTypes(null)
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
    switchMap(action =>
      this.commitmentEventDataService
        .getExternalEvents(action.payload)
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
        .pipe(map(result => new GetCommitmentEvents(null)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
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

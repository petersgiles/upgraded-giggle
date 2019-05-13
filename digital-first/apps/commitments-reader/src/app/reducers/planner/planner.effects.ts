import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  map,
  switchMap,
  catchError,
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
import {
  OPERATION_PLANNER,
  OPERATION_RIGHT_WRITE,
  OPERATION_RIGHT_READ,
  OPERATION_RIGHT_HIDE
} from '../../services/app-data/app-operations'
@Injectable()
export class PlannerEffects {
  @Effect()
  getCommitmentsEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetCommitmentEvents),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      const currentUserPlannerOperation = PlannerOpearationHelper(rootStore)
      return {
        commitments: action.payload
          ? action.payload
          : rootStore.overview.commitments,
        currentUserPlannerOperation: currentUserPlannerOperation
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
    switchMap(() => [
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
      const currentUserPlannerOperation = PlannerOpearationHelper(rootStore)
      return {
        currentUserPlannerOperation: currentUserPlannerOperation
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
    withLatestFrom(this.rootStore$),
    map(([_, store]) => {
      const rootStore = <any>store
      const currentUserPlannerOperation = PlannerOpearationHelper(rootStore)
      return {
        currentUserPlannerOperation: currentUserPlannerOperation
      }
    }),
    switchMap(config =>
      this.commitmentEventDataService
        .getExternalEventTypes(config)
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
      const currentUserPlannerOperation = PlannerOpearationHelper(rootStore)
      return {
        currentUserPlannerOperation: currentUserPlannerOperation,
        selectedExternalTypes:
          action.payload && action.payload.length > 0
            ? action.payload
            : rootStore.planner.selectedExternalEeventTypes
      }
    }),
    switchMap(config =>
      this.commitmentEventDataService
        .getExternalEvents(config)
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
      const currentUserPlannerOperation = PlannerOpearationHelper(rootStore)
      return {
        currentUserPlannerOperation: currentUserPlannerOperation,
        data: action.payload
      }
    }),
    concatMap(config =>
      this.commitmentEventDataService
        .storeEvent(config)
        .pipe(map(() => new GetCommitmentEvents(null)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )

  @Effect()
  removeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.RemoveCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, store]) => {
      const rootStore = <any>store
      const currentUserPlannerOperation = PlannerOpearationHelper(rootStore)
      return {
        currentUserPlannerOperation: currentUserPlannerOperation,
        data: action.payload
      }
    }),
    concatMap(config =>
      this.commitmentEventDataService
        .removeEvent(config)
        .pipe(
          map(
            () => new GetCommitmentEvents(null),
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
    map(([_, store]) => {
      const rootStore = <any>store
      const plannerOperation = PlannerOpearationHelper(rootStore)
      return plannerOperation === 'read' || plannerOperation === 'hide'
    }),
    map(readonly => new LoadPlannerPermission(readonly))
  )

  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}
}

export function PlannerOpearationHelper(rootStore: any) {
  if (rootStore.user) {
    const user = rootStore.user.currentUser
    const operations = rootStore.user.operations
    if (user && user.isSiteAdmin) {
      return OPERATION_RIGHT_WRITE
    } else if (operations) {
      if (operations[OPERATION_PLANNER] === OPERATION_RIGHT_WRITE) {
        return OPERATION_RIGHT_WRITE
      } else if (
        operations &&
        operations[OPERATION_PLANNER] === OPERATION_RIGHT_WRITE
      ) {
        return OPERATION_RIGHT_READ
      } else {
        return OPERATION_RIGHT_HIDE
      }
    }
  }
}

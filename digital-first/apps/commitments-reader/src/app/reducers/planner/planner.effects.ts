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
    switchMap(action =>
      this.commitmentEventDataService
        .getEventsByCommitments(action.payload)
        .pipe(map(data => new LoadCommitmentEvents(data)))
    ),
    catchError(error => [new ErrorInPlanner(error)])
  )

  @Effect()
  getEventsReferenceData$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventReferenceData),
    switchMap(action => [
      new GetEventTypes(action.payload),
      new GetExternalEventTypes(action.payload)
    ])
  )

  @Effect()
  getEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventTypes),
    switchMap(action =>
      this.commitmentEventDataService
        .getEventTypes(action.payload)
        .pipe(map(data => new LoadEventTypes(data)))
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return [new ErrorInPlanner(error)]
    })
  )

  @Effect()
  getExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEventTypes),
    switchMap(action =>
      this.commitmentEventDataService
        .getExternalEventTypes(action.payload)
        .pipe(map(data => new LoadExternalEventTypes(data)))
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return [new ErrorInPlanner(error)]
    })
  )

  @Effect()
  getExternalEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEvents),
    withLatestFrom(this.rootStore$),
    map(([action, root]) => {
      const rootStore = <any>root
      const selectedExternalEventTypes =
        rootStore.planner.selectedExternalEventTypes
      if (action.payload.selectedExternalEventTypes) {
        return {
          permission: action.payload.permission,
          selectedExternalEventTypes: action.payload.selectedExternalEventTypes
        }
      } else {
        return {
          permission: action.payload.permission,
          selectedExternalEventTypes: selectedExternalEventTypes
        }
      }
    }),
    switchMap(payload =>
      this.commitmentEventDataService
        .getExternalEvents(payload)
        .pipe(map(data => new LoadExternalEvents(data)))
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return [new ErrorInPlanner(error)]
    })
  )
  @Effect()
  storeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, root]) => {
      const rootStore = <any>root
      return {
        permission: rootStore.planner.permission,
        data: action.payload.data
      }
    }),
    concatMap(payload =>
      this.commitmentEventDataService
        .storeEvent(payload)
        .pipe(map(() => new GetCommitmentEvents(payload.permission)))
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return [new ErrorInPlanner(error)]
    })
  )

  @Effect()
  removeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.RemoveCommitmentEvent),
    withLatestFrom(this.rootStore$),
    map(([action, root]) => {
      const rootStore = <any>root
      return {
        permission: rootStore.planner.permission,
        data: action.payload.data
      }
    }),
    concatMap(payload =>
      this.commitmentEventDataService
        .removeEvent(payload)
        .pipe(
          map(
            () => new GetCommitmentEvents(payload.permission),
            catchError(error => [new ErrorInPlanner(error)])
          )
        )
    )
  )

  @Effect()
  storeSelectedExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreSelectedExternalEventTypes),
    concatMap(action => [new LoadSelectedExternalEventTypes(action.payload)])
  )

  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}
}

export function plannerOperationHelper(rootStore: any) {
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

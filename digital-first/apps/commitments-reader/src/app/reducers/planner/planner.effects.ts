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
    switchMap(action => [
      new GetEventTypes(action.payload),
      new GetExternalEventTypes(action.payload),
      new GetExternalEvents({
        permission: action.payload,
        selectedExternalEventTypes: []
      })
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
    switchMap(action =>
      this.commitmentEventDataService
        .getExternalEvents(action.payload)
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
    concatMap(action =>
      this.commitmentEventDataService
        .storeEvent(action.payload)
        .pipe(map(() => new GetCommitmentEvents(null)))
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
    concatMap(action =>
      this.commitmentEventDataService
        .removeEvent(action.payload)
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
      new LoadSelectedExternalEventTypes(action.payload)
    ])
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

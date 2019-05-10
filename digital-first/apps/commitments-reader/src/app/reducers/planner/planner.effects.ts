import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  map,
  switchMap,
  catchError,
  first
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
  ErrorInPlanner
} from './planner.actions'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import { CommitmentEventDataService } from '../../services/commitment-event/commitment-event-data-service'
@Injectable()
export class PlannerEffects {
  @Effect()
  getPlannerData$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetPlannerData),
    switchMap(action => [
      new GetCommitmentEvents(action.payload),
      new LoadPlannerPermission({ isReadonly: false })
    ]),
    catchError(error => [new ErrorInPlanner(error)])
  )

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
    switchMap(_ => [new GetEventTypes(null), new GetExternalEventTypes(null)])
  )

  @Effect()
  getEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventTypes),
    switchMap(action =>
      this.commitmentEventDataService
        .getEventTypes(action.payload)
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
    switchMap(action =>
      this.commitmentEventDataService
        .storeEvent(action)
        .pipe(map(result => new GetCommitmentEvents(null)))
    )
  )

  @Effect()
  removeCommitmentEvent$ = this.actions$.pipe(
    ofType(PlannerActionTypes.RemoveCommitmentEvent),
    switchMap(action =>
      this.commitmentEventDataService
        .removeEvent(action.payload)
        .pipe(map(result => new GetCommitmentEvents(null)))
    )
  )

  @Effect()
  storeSelectedExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreSelectedExternalEventTypes),
    switchMap(action => [new LoadSelectedExternalEventTypes(action.payload)])
  )

  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}
}

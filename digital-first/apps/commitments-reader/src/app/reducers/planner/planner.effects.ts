import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { map, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
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
  ErrorInPlanner
} from './planner.actions'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import { CommitmentEventDataService } from '../../services/commitment-event/commitment-event-data-service'
@Injectable()
export class PlannerEffects {
  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}

  @Effect()
  getCommitmentsEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetCommitmentEvents),
    withLatestFrom(this.rootStore$),
    map(([_, root]) => {
      const rootStore = <any>root
      const pageIndex = rootStore.planner.schedulerPageIndex
      return {
        pageIndex: pageIndex,
        pageSize: 100,
        permission: rootStore.planner.permission,
        commitments: rootStore.overview.commitments
      }
    }),
    concatMap(config =>
      this.commitmentEventDataService.getEventsByCommitments(config).pipe(
        concatMap(data => [new LoadCommitmentEvents(data)]),
        catchError(error => [new ErrorInPlanner(error)])
      )
    )
  )

  @Effect()
  getEventsReferenceData$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventReferenceData),
    concatMap(action => [
      new GetEventTypes(action.payload),
      new GetExternalEventTypes(action.payload)
    ])
  )

  @Effect()
  getEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetEventTypes),
    concatMap(action =>
      this.commitmentEventDataService.getEventTypes(action.payload).pipe(
        map(data => new LoadEventTypes(data)),
        catchError(error => [new ErrorInPlanner(error)])
      )
    )
  )

  @Effect()
  getExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetExternalEventTypes),
    concatMap(action =>
      this.commitmentEventDataService
        .getExternalEventTypes(action.payload)
        .pipe(
          map(data => new LoadExternalEventTypes(data)),
          catchError(error => [new ErrorInPlanner(error)])
        )
    )
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
    concatMap(payload =>
      this.commitmentEventDataService.getExternalEvents(payload).pipe(
        map(data => new LoadExternalEvents(data)),
        catchError(error => [new ErrorInPlanner(error)])
      )
    )
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
      this.commitmentEventDataService.storeEvent(payload).pipe(
        map(() => new GetCommitmentEvents(null)),
        catchError(error => [
          new ErrorInPlanner(error),
          new GetCommitmentEvents(null)
        ])
      )
    )
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
      this.commitmentEventDataService.removeEvent(payload).pipe(
        map(() => new GetCommitmentEvents(null)),
        catchError(error => [
          new ErrorInPlanner(error),
          new GetCommitmentEvents(null)
        ])
      )
    )
  )

  @Effect()
  storeSelectedExternalEventTypes$ = this.actions$.pipe(
    ofType(PlannerActionTypes.StoreSelectedExternalEventTypes),
    concatMap(action => [new LoadSelectedExternalEventTypes(action.payload)])
  )
}

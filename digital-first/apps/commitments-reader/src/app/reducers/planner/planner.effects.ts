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
  LoadRefinedCommitments
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
      console.log(refinedCommitments)
      return {
        commitments: refinedCommitments
        // TODO: Add readonly flag here
      }
    }),
    switchMap(config => [
      new LoadRefinedCommitments(config.commitments),
      // new GetCommitmentEvents(config)
    ]),
    catchError(error => of(new GetPlannerDataFailure(error)))
  )

  @Effect()
  getCommitmentsEvents$ = this.actions$.pipe(
    ofType(PlannerActionTypes.GetCommitmentEvents),
    switchMap(action =>
      this.commitmentEventDataService
        .getEventsByCommitments(action.payload.commitments)
        .pipe(concatMap(data => [new LoadCommitmentEvents(data)]))
    )
  )

  constructor(
    private actions$: Actions<PlannerActions>,
    private rootStore$: Store<fromRoot.State>,
    private commitmentEventDataService: CommitmentEventDataService
  ) {}
}

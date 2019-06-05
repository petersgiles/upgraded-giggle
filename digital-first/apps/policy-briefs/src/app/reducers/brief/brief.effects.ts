import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, map, switchMap, catchError, tap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'
import {
  BriefActionTypes,
  BriefActions,
  SetActiveBrief,
  LoadBrief,
  GetActiveBriefFailure
} from './brief.actions'


import { BriefDataService } from './brief-data.service'
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

  constructor(
    private actions$: Actions<BriefActions>,
    private service: BriefDataService
  ) {}
}

import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  concatMap,
  map,
  catchError,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { of, Observable, EMPTY } from 'rxjs'
import { LookupActionTypes, LookupActions } from './lookup.actions'
import { idFromLookup, fromUser, SharepointJsomService } from '@df/sharepoint'
import { pickColor } from '../../utils/colour'
import { LookupDataService } from './lookup-data.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../index'

@Injectable()
export class LookupEffects {
  @Effect()
  getPolicies$ = this.actions$.pipe(
    ofType(LookupActionTypes.GetPolicies),
    tap(result => console.log(`💬 `, result)),
    switchMap(result => [EMPTY]),
    catchError(error => of(EMPTY))
  )

  constructor(
    private actions$: Actions<LookupActions>,
    private service: LookupDataService,
    private store$: Store<fromRoot.State>
  ) {}
}

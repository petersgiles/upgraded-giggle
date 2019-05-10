import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import * as fromRoot from '../../reducers'
import { Config } from '../../services/config/config-model'
import {
  switchMap,
  first,
  catchError,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { of, EMPTY } from 'rxjs'
import {
  RefinerActionTypes,
  RefinerActions,
  GetRefinersFailure,
  LoadRefinerGroups
} from './refiner.actions'
import { GetRefinerTagsGQL } from '../../generated/graphql'
import { CRMenu } from './refiner.models'
import { buildRefiner } from './refiner-utils'

import { Store } from '@ngrx/store'
@Injectable()
export class RefinerEffects {
  @Effect()
  getRefinerGroups$ = this.actions$.pipe(
    ofType(RefinerActionTypes.GetRefinerGroups),
    withLatestFrom(this.store$),
    switchMap(([_, s]) => {
      const store = <any>s
      const config: Config = store.app.config
      return this.getRefinerTagsGQL.fetch({ siteId: config.siteId }).pipe(
        first(),
        switchMap((result: any) => {
          const refiners: CRMenu[] = buildRefiner(result.data)
          // tslint:disable-next-line: no-console
          console.log(`🐷 getRefinerGroups$ `, refiners)
          return of(refiners)
        }),
        switchMap(result => [new LoadRefinerGroups(result)])
      )
    }),
    catchError(error => of(new GetRefinersFailure(error)))
  )

  constructor(
    private actions$: Actions<RefinerActions>,
    private store$: Store<fromRoot.State>,
    private getRefinerTagsGQL: GetRefinerTagsGQL
  ) {}
}

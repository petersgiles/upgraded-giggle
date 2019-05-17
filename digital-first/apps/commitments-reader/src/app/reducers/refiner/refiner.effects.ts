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
  withLatestFrom,
  delay,
  concatMap
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
    concatMap(([_, s]) => {
      const store = <any>s
      const config: Config = store.app.config
      return this.getRefinerTagsGQL.fetch({ siteId: config.siteId }).pipe(
        first(),
        switchMap((result: any) => {
          const refiners: CRMenu[] = buildRefiner(result.data)
          return of(refiners)
        }),
        switchMap(result => [new LoadRefinerGroups(result)])
      )
    }),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return of(new GetRefinersFailure(error))})
  )

  constructor(
    private actions$: Actions<RefinerActions>,
    private store$: Store<fromRoot.State>,
    private getRefinerTagsGQL: GetRefinerTagsGQL
  ) {}
}

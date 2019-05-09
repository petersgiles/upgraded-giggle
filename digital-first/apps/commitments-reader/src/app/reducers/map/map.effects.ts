import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  concatMap,
  switchMap,
  first,
  map,
  catchError,
  withLatestFrom,
  tap
} from 'rxjs/operators'
import { of, EMPTY } from 'rxjs'
import {
  MapActionTypes,
  MapActions,
  LoadMapPoints,
  GetMapPointsFailure
} from './map.actions'
import * as fromRoot from '../../reducers'
import { Config } from '../../services/config.service'
import { Store } from '@ngrx/store'
import { MapPointsSearchGQL } from '../../generated/graphql'

@Injectable()
export class MapEffects {
  @Effect()
  getRefinedMapPoints$ = this.actions$.pipe(
    ofType(MapActionTypes.GetRefinedMapPoints),
    withLatestFrom(this.store$),
    // tslint:disable-next-line: no-console
    map(([_, s]) => {
      const store = <any>s
      const config: Config = store.app.config
      const bookType = config.header.bookType
      const selectedRefiners: any = store.refiner.selectedRefiners

      const selectedRefinerGroup = selectedRefiners.reduce(
        (acc, item) => {
          acc[item.group].push(item.id)
          return acc
        },
        {
          commitmentTypes: [],
          criticalDates: [],
          portfolioLookups: [],
          deckItemBriefSummaries: []
        }
      )

      return {
        refiner: selectedRefinerGroup,
        bookType: bookType
      }
    }),
    switchMap(config =>
      this.mapPointSearchGQL.fetch(config).pipe(
        first(),
        concatMap(result => [new LoadMapPoints(result)])
      )
    ),
    catchError(error => of(new GetMapPointsFailure(error)))
  )

  constructor(
    private actions$: Actions<MapActions>,
    private store$: Store<fromRoot.State>,
    private mapPointSearchGQL: MapPointsSearchGQL
  ) {}
}

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
import { of } from 'rxjs'
import {
  OverviewActionTypes,
  OverviewActions,
  LoadRefinedCommitments,
  GetRefinedCommitmentsFailure
} from './overview.actions'
import { CommitmentsSearchGQL } from '../../generated/graphql'
import * as fromRoot from '../../reducers'
import { Config } from '../../services/config.service'
import { Store } from '@ngrx/store'
import { refinerMap } from '../../models'

@Injectable()
export class OverviewEffects {
  @Effect()
  getRefinedCommitments$ = this.actions$.pipe(
    ofType(OverviewActionTypes.GetRefinedCommitments),
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

      // // tslint:disable-next-line: no-console
      // console.log(`🐲 `, store, selectedRefiners)
      // // tslint:disable-next-line: no-console
      // console.log(`🐲 selectedRefinerGroup `, selectedRefinerGroup)
      // // tslint:disable-next-line: no-console
      // console.log(`🐲 config `, config)
      // // tslint:disable-next-line: no-console
      // console.log(`🐲 bookType `, bookType)

      return {
        refiner: selectedRefinerGroup,
        bookType: bookType
      }
    }),
    switchMap(config =>
      this.getRefinedCommitmentsGQL.fetch(config).pipe(
        first(),
        concatMap(result => [new LoadRefinedCommitments(result)])
      )
    ),
    catchError(error => of(new GetRefinedCommitmentsFailure(error)))
  )

  constructor(
    private actions$: Actions<OverviewActions>,
    private getRefinedCommitmentsGQL: CommitmentsSearchGQL,
    private store$: Store<fromRoot.State>
  ) {}
}

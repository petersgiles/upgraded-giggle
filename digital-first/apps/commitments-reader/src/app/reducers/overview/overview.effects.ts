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
import { Store } from '@ngrx/store'
import { Config } from '../../services/config/config-model'
import { sortBy } from '@df/utils'

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
      const textRefiner: any = store.refiner.textRefiner
      const webId: any = config.webId
      const siteId: any = config.siteId

      const selectedRefinerGroup = selectedRefiners.reduce(
        (acc, item) => {
          acc[item.group].push(item.id)
          return acc
        },
        {
          commitmentTypes: [],
          criticalDates: [],
          portfolioLookups: [],
          deckItemBriefSummaries: [],
          text: null
        }
      )

      if (textRefiner) {
        selectedRefinerGroup.text = textRefiner
      }

      return {
        refiner: selectedRefinerGroup,
        book: bookType,
        webId: webId,
        siteId: siteId
      }
    }),
    switchMap(config =>
      this.getRefinedCommitmentsGQL.fetch(config).pipe(
        first(),
        concatMap(result => {
          const commitments = result.data.commitments
          if (commitments.length > 0) {
            result.data.commitments = commitments.sort((a, b) => {
              const aDisplayOrder = a.displayOrder ? a.displayOrder : 'null'
              const bDisplayOrder = b.displayOrder ? b.displayOrder : 'null'
              return aDisplayOrder < bDisplayOrder ? -1 : 1
            })
          }
          return [new LoadRefinedCommitments(result)]
        }),
        catchError(error => [new GetRefinedCommitmentsFailure(error)])
      )
    )
  )

  constructor(
    private actions$: Actions<OverviewActions>,
    private getRefinedCommitmentsGQL: CommitmentsSearchGQL,
    private store$: Store<fromRoot.State>
  ) {}
}

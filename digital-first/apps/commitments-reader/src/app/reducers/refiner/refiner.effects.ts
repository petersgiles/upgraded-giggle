import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, switchMap, first, catchError, map } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'
import { RefinerActionTypes, RefinerActions, GetRefinersFailure, LoadRefinerGroups, LoadRefinedCommitments } from './refiner.actions'
import { GetRefinerTagsGQL,   
  CommitmentsSearchGQL,
  CommitmentRefinerGraph,
  CommitmentGraph,
  MapPointGraph,
  CommitmentMapPointGQL } from '../../generated/graphql'
import { CRMenu } from './refiner.models'
import { buildRefiner } from './refiner-utils'

@Injectable()
export class RefinerEffects {
  @Effect()
  getRefinerGroups$ = this.actions$.pipe(
    ofType(RefinerActionTypes.GetRefinerGroups),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    switchMap(() => this.getRefinerTagsGQL
      .fetch({ input: {} })
      .pipe(
        first(),
        switchMap((result: any) => {
          const refiners: CRMenu[] = buildRefiner(
            result.data.commitmentTypes,
            result.data.criticalDates,
            result.data.portfolioLookups
          )
          // tslint:disable-next-line: no-console
          console.log(`🐷 `, refiners)
          return of(refiners)
        }),
        map(result => new LoadRefinerGroups(result))
      )
    ),
    catchError(error => of(new GetRefinersFailure(error)))
  )

  @Effect()
  getRefinedCommitments$ = this.actions$.pipe(
    ofType(RefinerActionTypes.GetRefinedCommitments),
    switchMap(() => this.getRefinedCommitmentsGQL
      .fetch({ refiner: {commitmentTypes: [], criticalDates: [], portfolioLookups: []},
        bookType: 'red' })
      .pipe(
        first(),
        switchMap((result: any) => {
         
          return of(result)
        }),
        map(result => new LoadRefinedCommitments(result))
      )
    ),
    catchError(error => of(new GetRefinersFailure(error)))
  )


  constructor(
    private actions$: Actions<RefinerActions>,
    private getRefinerTagsGQL: GetRefinerTagsGQL,
    private getRefinedCommitmentsGQL: CommitmentsSearchGQL
  ) {}
}

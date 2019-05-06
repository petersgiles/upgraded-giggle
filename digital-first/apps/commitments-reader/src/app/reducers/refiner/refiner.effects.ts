import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { switchMap, first, catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { RefinerActionTypes, RefinerActions, GetRefinersFailure, LoadRefinerGroups } from './refiner.actions'
import { GetRefinerTagsGQL } from '../../generated/graphql'
import { CRMenu } from './refiner.models'
import { buildRefiner } from './refiner-utils'
import { GetRefinedCommitments } from '../overview/overview.actions';

@Injectable()
export class RefinerEffects {
  @Effect()
  getRefinerGroups$ = this.actions$.pipe(
    ofType(RefinerActionTypes.GetRefinerGroups),
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
        switchMap(result => [
          new LoadRefinerGroups(result)
        ])
      )
    ),
    catchError(error => of(new GetRefinersFailure(error)))
  )

  constructor(
    private actions$: Actions<RefinerActions>,
    private getRefinerTagsGQL: GetRefinerTagsGQL
  ) {}
}

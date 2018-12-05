import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { CommentsResult, DataResult, MapPointsResult } from '../../models'
import { CommitmentOverviewMapActionTypes, CommentOverviewMapActionFailure, GetCommitmentOverviewMapPoints, LoadCommitmentOverviewMapPoints } from './commitment-overview-map.actions'
import { CommitmentOverviewMapDataService } from './commitment-overview-map-data.service'

@Injectable()
export class CommentOverviewMapEffects {

    @Effect()
    getOverviewMapPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapPoints),
            map((action: GetCommitmentOverviewMapPoints) => action.payload),
            // tslint:disable-next-line:no-console
            tap(r => console.log(r)),
            concatMap((filter: any) => this.service.getMapPoints(filter)
                .pipe(
                    // tslint:disable-next-line:no-console
                    tap(r => console.log('getOverviewMapPoints', r)),
                    concatMap((result) => [new LoadCommitmentOverviewMapPoints(result)]),
                    catchError(error => of(new CommentOverviewMapActionFailure(error)))
                )
            ))

    constructor(private actions$: Actions, private service: CommitmentOverviewMapDataService) { }
}

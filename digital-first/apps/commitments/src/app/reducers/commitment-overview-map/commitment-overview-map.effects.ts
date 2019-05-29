
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { map, catchError, tap, concatMap } from 'rxjs/operators'
import {
    CommitmentOverviewMapActionTypes, CommentOverviewMapActionFailure,
    GetCommitmentOverviewMapPoints, LoadCommitmentOverviewMapPoints,
    GetCommitmentOverviewMapCommitments, LoadCommitmentOverviewMapCommitments, GetCommitmentOverviewCommitmentMapPoints, LoadCommitmentOverviewCommitmentMapPoints
} from './commitment-overview-map.actions'
import { CommitmentOverviewMapDataService } from './commitment-overview-map-data.service'

@Injectable()
export class CommentOverviewMapEffects {

    @Effect()
    getOverviewMapPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapPoints),
            map((action: GetCommitmentOverviewMapPoints) => action.payload),

            concatMap((filter: any) => this.service.getMapPoints(filter)
                .pipe(

                    concatMap((result) => [new LoadCommitmentOverviewMapPoints(result)]),
                    catchError(error => of(new CommentOverviewMapActionFailure(error)))
                )
            ))

    @Effect()
    getOverviewMapCommitment$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapCommitments),
            map((action: GetCommitmentOverviewMapCommitments) => action.payload),

            concatMap((filter: any) => this.service.getCommitmentOverviewMapCommitments(filter)
                .pipe(

                    concatMap((result) => [new LoadCommitmentOverviewMapCommitments(result)]),
                    catchError(error => of(new CommentOverviewMapActionFailure(error)))
                )
            ))

    @Effect()
    getOverviewMapCommitmentMapPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentOverviewMapActionTypes.GetCommitmentOverviewCommitmentMapPoints),
            map((action: GetCommitmentOverviewCommitmentMapPoints) => action.payload),

            concatMap((filter: any) => this.service.getCommitmentOverviewCommitmentMapPoints(filter)
                .pipe(

                    concatMap((result) => [new LoadCommitmentOverviewCommitmentMapPoints(result)]),
                    catchError(error => of(new CommentOverviewMapActionFailure(error)))
                )
            ))

    constructor(private actions$: Actions, private service: CommitmentOverviewMapDataService, ) { }
}

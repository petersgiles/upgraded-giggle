import { LoggerService } from '@digital-first/df-logging'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { map, catchError, tap, concatMap } from 'rxjs/operators'
import {
    CommitmentOverviewMapActionTypes, CommentOverviewMapActionFailure,
    GetCommitmentOverviewMapPoints, LoadCommitmentOverviewMapPoints,
    GetCommitmentOverviewMapCommitments, LoadCommitmentOverviewMapCommitments
} from './commitment-overview-map.actions'
import { CommitmentOverviewMapDataService } from './commitment-overview-map-data.service'

@Injectable()
export class CommentOverviewMapEffects {

    @Effect()
    getOverviewMapPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapPoints),
            map((action: GetCommitmentOverviewMapPoints) => action.payload),
            tap(r => this.logger.info(r)),
            concatMap((filter: any) => this.service.getMapPoints(filter)
                .pipe(
                    tap(r => this.logger.info('getOverviewMapPoints', r)),
                    concatMap((result) => [new LoadCommitmentOverviewMapPoints(result)]),
                    catchError(error => of(new CommentOverviewMapActionFailure(error)))
                )
            ))

    @Effect()
    getOverviewMapCommitment$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapCommitments),
            map((action: GetCommitmentOverviewMapCommitments) => action.payload),
            tap(r => this.logger.info(r)),
            concatMap((filter: any) => this.service.getCommitmentOverviewMapCommitments(filter)
                .pipe(
                    tap(r => this.logger.info('LoadCommitmentOverviewMapCommitments', r)),
                    concatMap((result) => [new LoadCommitmentOverviewMapCommitments(result)]),
                    catchError(error => of(new CommentOverviewMapActionFailure(error)))
                )
            ))

    constructor(private actions$: Actions, private service: CommitmentOverviewMapDataService, private logger: LoggerService) { }
}

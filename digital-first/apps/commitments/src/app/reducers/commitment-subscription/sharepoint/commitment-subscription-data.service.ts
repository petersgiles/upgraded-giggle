import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Observable, of } from 'rxjs'
import { SubscriptionResult, DataResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { byCommitmentIdQuery } from '../../../services/sharepoint/caml'
import { mapSubscription, mapCommitmentComment } from './maps'
import { CommitmentSubscriptionDataService } from '../commitment-subscription-data.service'

@Injectable({
    providedIn: 'root'
})
export class CommitmentSubscriptionDataSharePointService implements CommitmentSubscriptionDataService {

    deleteSubscription = (variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>> =>
        this.sharepoint.removeItem({
            listName: 'CommitmentComment',
            id: variables.id,
        }).pipe(
            concatMap((result: any) =>
                of({
                    data: { commitment: variables.commitment },
                    loading: false
                }))
        )

    storeSubscription = (comment: {
        commitment: any;
        parent: any;
        comment: any;
        author: any;
    }): Observable<DataResult<{ commitment: number }>> => {

        const spComment = {
            Title: comment.commitment,
            Commitment: comment.commitment,
            Parent: comment.parent,
            Text: comment.comment
        }

        return this.sharepoint.storeItem({
            listName: 'CommitmentComment',
            data: spComment,
        }).pipe(
            map(mapCommitmentComment),
            concatMap((result: any) =>
                of({
                    data: { commitment: result.commitment },
                    loading: false
                }))
        )
    }
    getSubscriptionByCommitment = (commitment: any): Observable<DataResult<SubscriptionResult>> =>
        this.sharepoint.getItems({
            listName: 'CommitmentComment',
            viewXml: byCommitmentIdQuery({ id: commitment })
        }).pipe(
            concatMap((comments: any) =>
                of({
                    data: { comments: mapSubscription(comments) },
                    loading: false
                }))
        )

    constructor(private sharepoint: SharepointJsomService) { }
}

import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { SubscriptionResult, DataResult } from '../../../models'
import { SUBSCRIPTION_BY_COMMITMENT, ADD_SUBSCRIPTION, DELETE_SUBSCRIPTION } from './queries'
import { CommitmentSubscriptionDataService } from '../commitment-subscription-data.service'

@Injectable({
    providedIn: 'root'
})
export class CommitmentSubscriptionDataApolloService implements CommitmentSubscriptionDataService {

  unsubscribeFromCommitment = (variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>> => callMutate<{ commitment: number }>(
        this.apollo,
        { mutation: DELETE_SUBSCRIPTION, variables: { ...variables } },
        (result: any) => ({ data: { commitment: result.data.deleteComment.commitment } })
    )

    subscribeToCommitment = (comment: {
        commitment: any;
        parent: any;
        comment: any;
        author: any;
    }): Observable<DataResult<{ commitment: number }>> => {
        const variables = {
            commitment: comment.commitment,
            parent: comment.parent,
            text: comment.comment,
            author: 'Domenica20',
            created: moment()
        }
        return callMutate<any>(this.apollo, { mutation: ADD_SUBSCRIPTION, variables: { ...variables } },
            (result: any) => ({ data: { commitment: result.data.addComment.commitment } })
        )

    }
    getSubscriptionsByCommitment = (commitment: any) => callQuery<SubscriptionResult>(this.apollo, { query: SUBSCRIPTION_BY_COMMITMENT, variables: { commitment: commitment } })

    constructor(private apollo: Apollo) { }
}

import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { SubscriptionResult, DataResult } from '../../../models'
import { SUBSCRIPTION_BY_COMMITMENT, ADD_COMMENT, DELETE_COMMENT } from './queries'
import { CommitmentSubscriptionDataService } from '../commitment-subscription-data.service'

@Injectable({
    providedIn: 'root'
})
export class CommitmentSubscriptionDataApolloService implements CommitmentSubscriptionDataService {

    deleteSubscription = (variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>> => callMutate<{ commitment: number }>(
        this.apollo,
        { mutation: DELETE_COMMENT, variables: { ...variables } },
        (result: any) => ({ data: { commitment: result.data.deleteComment.commitment } })
    )

    storeSubscription = (comment: {
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
        return callMutate<any>(this.apollo, { mutation: ADD_COMMENT, variables: { ...variables } },
            (result: any) => ({ data: { commitment: result.data.addComment.commitment } })
        )

    }
    getSubscriptionByCommitment = (commitment: any) => callQuery<SubscriptionResult>(this.apollo, { query: SUBSCRIPTION_BY_COMMITMENT, variables: { commitment: commitment } })

    constructor(private apollo: Apollo) { }
}

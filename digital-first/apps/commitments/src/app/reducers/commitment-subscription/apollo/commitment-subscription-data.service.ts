import { Injectable } from '@angular/core'
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

  getUserSubscription(subscription: { user: any; commitment: any }): Observable<any> {
    const variables = { commitment: subscription.commitment, user: subscription.user.userid}
    return callQuery<SubscriptionResult>(this.apollo,
      { query: SUBSCRIPTION_BY_COMMITMENT,
        variables: variables})
  }

  unsubscribeFromCommitment = (subscription: { user: any; commitment: any }): Observable<DataResult<{ commitment: number }>> => {

    const variables = {
      commitment: subscription.commitment,
      subscriber: subscription.user.userid
    }

   return callMutate<{ commitment: number }>(
        this.apollo,
        { mutation: DELETE_SUBSCRIPTION, variables: { ...variables } },
        (result: any) => ({ data: { commitment: result.data.deleteCommitmentSubscription.id } })
    )
  }

    subscribeToCommitment = (subscription: {
        commitment: any;
        user: any;
    }): Observable<DataResult<{ commitment: number }>> => {
      const variables = {
        commitment: subscription.commitment,
        subscriber: subscription.user.userid
        }
        return callMutate<any>(this.apollo, { mutation: ADD_SUBSCRIPTION, variables: { ...variables } },
            (result: any) =>
              ({ data: { commitment: result.data.storeCommitmentSubscription.id } })
        )

    }
    // getSubscriptionsByCommitment = (commitment: any) => callQuery<SubscriptionResult>(this.apollo, { query: SUBSCRIPTION_BY_COMMITMENT, variables: { commitment: commitment } })

    constructor(private apollo: Apollo) { }
}

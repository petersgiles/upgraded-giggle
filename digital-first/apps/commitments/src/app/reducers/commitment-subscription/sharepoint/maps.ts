import { fromLookup, idFromLookup, fromUser } from '@digital-first/df-sharepoint'
import { Subscription } from '../subscription.model'

export const mapCommitmentSubscription = (subscription): any => {

    const spAuthor = fromUser(subscription.Author)

    return {
        id: subscription.ID,
        commitment: fromLookup(subscription.Commitment),
        subscription: fromUser(subscription.Subscriber),
    }
}

export const mapSubscriptions = (subscription): [] => subscription.map(mapCommitmentSubscription)


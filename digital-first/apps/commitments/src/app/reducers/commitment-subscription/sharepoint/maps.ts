import { fromLookup, idFromLookup, fromUser } from '@digital-first/df-sharepoint'
import { Subscription } from '../subscription.model'

export const mapSubscription = (subscription): any => {

    const spAuthor = fromUser(subscription.Author)

    return {
        id: subscription.ID,
        parent: idFromLookup(subscription.Parent),
        commitment: fromLookup(subscription.Commitment),
        text: subscription.Text,
        author: spAuthor,
        created: subscription.Created_x0020_Date
    }
}

export const mapSubscriptions = (subscription): [] => subscription.map(mapSubscription)

export const mapCommitmentSubscription = (item): any =>
    ({
        id: item.ID,
        commitment: idFromLookup(item.Commitment),
        comment: idFromLookup(item.Subscription),
    })

export const mapCommitmentSubscriptions = (items): any[] => items.map(mapCommitmentSubscription)

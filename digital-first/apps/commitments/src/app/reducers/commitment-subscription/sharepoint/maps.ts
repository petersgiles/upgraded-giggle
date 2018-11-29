import { fromLookup, idFromLookup, fromUser } from '@digital-first/df-sharepoint'
import { Comment } from '../subscription.model'

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

export const mapComments = (subscription): Comment[] => subscription.map(mapSubscription)

export const mapCommitmentComment = (item): any =>
    ({
        id: item.ID,
        commitment: idFromLookup(item.Commitment),
        comment: idFromLookup(item.Comment),
    })

export const mapCommitmentComments = (items): any[] => items.map(mapCommitmentComment)

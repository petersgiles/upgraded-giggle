import { fromLookup, idFromLookup, fromUser } from '@df/sharepoint'
import { Comment } from '../comment.model'

export const mapComment = (comment): any => {

    const spAuthor = fromUser(comment.Author)

    return {
        id: comment.ID,
        parent: idFromLookup(comment.Parent),
        commitment: fromLookup(comment.Commitment),
        text: comment.Text,
        author: spAuthor,
        created: comment.Created_x0020_Date
    }
}

export const mapComments = (comments): Comment[] => comments.map(mapComment)

export const mapCommitmentComment = (item): any =>
    ({
        id: item.ID,
        commitment: idFromLookup(item.Commitment),
        comment: idFromLookup(item.Comment),
    })

export const mapCommitmentComments = (items): any[] => items.map(mapCommitmentComment)
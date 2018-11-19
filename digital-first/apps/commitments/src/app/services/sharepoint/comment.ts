import { fromLookup, idFromLookup, fromUser } from '@digital-first/df-sharepoint'

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
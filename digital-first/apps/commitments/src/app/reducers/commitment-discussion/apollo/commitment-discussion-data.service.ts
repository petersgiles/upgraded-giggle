import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { CommentsResult, DataResult } from '../../../models'
import { COMMENTS_BY_COMMITMENT, ADD_COMMENT, DELETE_COMMENT } from './queries'
import { CommitmentDiscussionDataService } from '../commitment-discussion-data.service'

@Injectable({
    providedIn: 'root'
})
export class CommitmentDiscussionDataApolloService implements CommitmentDiscussionDataService {

    deleteComment = (variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>> => callMutate<{ commitment: number }>(
        this.apollo,
        { mutation: DELETE_COMMENT, variables: { ...variables } },
        (result: any) => ({ data: { commitment: result.data.deleteComment.commitment } })
    )

    storeComment = (comment: {
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
    getCommentsByCommitment = (commitment: any) => callQuery<CommentsResult>(this.apollo, { query: COMMENTS_BY_COMMITMENT, variables: { commitment: commitment } })

    constructor(private apollo: Apollo) { }
}

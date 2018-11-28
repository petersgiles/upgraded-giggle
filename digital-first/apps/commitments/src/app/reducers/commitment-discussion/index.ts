import { createSelector } from '@ngrx/store'

import * as fromCommitmentDiscussion from './commitment-discussion.reducer'
import { toTree } from '@digital-first/df-utils'

export const getCommitmentDiscussionState = state => state.commitmentDiscussion

export const getAllDiscussionComments = createSelector(
    getCommitmentDiscussionState,
    state => state.comments
)

export const getDiscussionCommentLoading = createSelector(
    getCommitmentDiscussionState,
    state => state.loading
)

export const getDiscussionCommentError = createSelector(
    getCommitmentDiscussionState,
    state => state.error
)

export const getDiscussionActiveComment = createSelector(
    getCommitmentDiscussionState,
    state => state.activeComment
)

export const getCommitmentDiscussionPanelExpanded = createSelector(
    getCommitmentDiscussionState,
    state => state.expanded
)

export const getCommitmentDiscussionTimeFormat = createSelector(
    getCommitmentDiscussionState,
    state => state.timeFormat
)

export const getCurrentCommitmentDiscussion = createSelector(
    getAllDiscussionComments,
    (comments) => {

        // tslint:disable-next-line:no-console
        console.log('getCurrentCommitmentDiscussion', comments)

        const discussionItems = (comments || []).map(c => ({ ...c })) // creating mutatable list

        const discussion = toTree(discussionItems, {
            id: 'id',
            parentId: 'parent',
            children: 'children',
            level: 'level',
            firstParentId: null
        })

        return discussion

    }
)
import { createSelector } from '@ngrx/store'

export const getCommitmentContactState = state => state.commitmentContact

export const getAllContactContacts = createSelector(
    getCommitmentContactState,
    state => state.contacts
)

export const getContactCommentLoading = createSelector(
    getCommitmentContactState,
    state => state.loading
)

export const getContactCommentError = createSelector(
    getCommitmentContactState,
    state => state.error
)

export const getContactActiveComment = createSelector(
    getCommitmentContactState,
    state => state.activeComment
)

export const getCommitmentContactPanelExpanded = createSelector(
    getCommitmentContactState,
    state => state.expanded
)
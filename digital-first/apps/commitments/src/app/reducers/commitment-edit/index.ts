import { createSelector } from '@ngrx/store'

import * as fromCommitmentEdit from './commitment-edit.reducer'

export const getCommitmentEditState = state => state.commitmentEdit

export const getCommitmentEditExpandedPanels = createSelector(
    getCommitmentEditState,
    fromCommitmentEdit.getExpandedPanels
)

export const getCommitmentEditDiscussionTimeFormat = createSelector(
    getCommitmentEditState,
    fromCommitmentEdit.getTimeFormat
)
import { createSelector } from '@ngrx/store';
import { getCommitmentDetailsState, CommitmentDetailsState } from './commitment-detail.reducer'
  
export const getCommitment = createSelector(
    getCommitmentDetailsState,
    (state: CommitmentDetailsState) => state.commitments
  )
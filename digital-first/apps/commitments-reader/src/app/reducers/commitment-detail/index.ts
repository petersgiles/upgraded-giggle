import { createSelector, createFeatureSelector } from '@ngrx/store';
//import { getCommitmentDetailsState, CommitmentDetailsState } from './commitment-detail.reducer'
import * as fromReducer from './commitment-detail.reducer'
  
export const getCommitmentDetailsState = createFeatureSelector('commitmentDetail')
export const getCommitment = createSelector(
    getCommitmentDetailsState,
    (state: fromReducer.CommitmentDetailsState) => state.commitment
  )

  export const getHandlingAdvice = createSelector(
    getCommitmentDetailsState,
    (state: fromReducer.CommitmentDetailsState) => state.handlingAdvices
  )
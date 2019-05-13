import { createSelector, createFeatureSelector } from '@ngrx/store';
//import * as commitmentDetail from './commitment-detail.reducer'
import * as fromReducer from './commitment-detail.reducer'

//export import CommitmentDetail = commitmentDetail
  
export const getCommitmentDetailsState = createFeatureSelector('commitmentDetail')
export const getCommitment = createSelector(
    getCommitmentDetailsState,
    (state: fromReducer.CommitmentDetailsState) => state.commitment
  )

  export const getHandlingAdvice = createSelector(
    getCommitmentDetailsState,
    (state: fromReducer.CommitmentDetailsState) => state.handlingAdvices
  )

  export const getPMCUpdatedState = createSelector(
    getCommitmentDetailsState,
    (state: fromReducer.CommitmentDetailsState) => state.PMCHandlingAdvice
  )

  export const getPMOUpdatedState = createSelector(
    getCommitmentDetailsState,
    (state: fromReducer.CommitmentDetailsState) => state.PMOHandlingAdvice
  )
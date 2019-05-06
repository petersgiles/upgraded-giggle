import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromRefinerReducer from './refiner.reducer'

export const selectAllCommitments= createSelector(
    fromRefinerReducer.selectRefinedCommitmentsState,
    (commitments =>{
      return commitments
    }))
import { OverviewActions, OverviewActionTypes } from './overview.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DataTableColumn } from '../../models/data-table-column'

export interface State {
  commitments: any[]
  columns: DataTableColumn[]
  error: any
}

export const initialState: State = {
  commitments: [],
  columns: [
    { prop: 'id', name: 'Id' },
    // { prop: 'displayOrder', name: 'DisplayOrder' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    // { prop: 'commitmentType', name: 'Type of Commitment' },
    { prop: 'criticalDate', name: 'Critical Date' }
  ],
  error: {}
}

export function reducer(state = initialState, action: OverviewActions): State {
  switch (action.type) {
    case OverviewActionTypes.LoadRefinedCommitments: {
      return {
        ...state,
        commitments: action.payload.data.commitments
      }
    }
    case OverviewActionTypes.GetRefinedCommitmentsFailure:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
export const overviewState = createFeatureSelector<State>('overview')

export const selectRefinedCommitmentsState = createSelector(
  overviewState,
  (state: State) => state.commitments
)

export const selectRefinedCommitmentsColumnsState = createSelector(
  overviewState,
  (state: State) => state.columns
)

export const selectFilteredCommitmentsState = createSelector(
  selectRefinedCommitmentsState,
  commitments =>
    (commitments || []).map(row => ({
      id: row.id,
      title: row.title,
      commitmentType: row.commitmentType ? row.commitmentType.title : '',
      criticalDate: row.criticalDate ? row.criticalDate.title : '',
      portfolio: row.portfolioLookup ? row.portfolioLookup.title : ''
    }))
)
export const selectErrorInOverviewState = createSelector(
  overviewState,
  (state: State) => state.error
)

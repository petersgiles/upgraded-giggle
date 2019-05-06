import { OverviewActions, OverviewActionTypes } from './overview.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DataTableColumn } from '../../models/data-table-column'

export interface State {
  commitments: any[]
  columns: DataTableColumn[]
}

export const initialState: State = {
  commitments: [],
  columns: [
    { prop: 'id', name: 'Id' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    { prop: 'announcementType', name: 'Type of Commitment' },
    { prop: 'criticalDate', name: 'Critical Date' }
  ]
}

export function reducer(state = initialState, action: OverviewActions): State {
  // tslint:disable-next-line: no-console
  console.log(`🐨 `, action)
  switch (action.type) {
    case OverviewActionTypes.LoadRefinedCommitments: {
      return {
        ...state,
        commitments: action.payload.data.commitments
      }
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
    (commitments || []).map(row =>  ({
      id: row.id,
      title: row.title,
      politicalParty: row.politicalParty,
      announcedBy: row.announcedBy,
      announcementType: row.announcementType ? row.announcementType.title : '',
      criticalDate: row.criticalDate ? row.criticalDate.title : '',
      portfolio: row.portfolioLookup ? row.portfolioLookup.title : ''
    }))
)

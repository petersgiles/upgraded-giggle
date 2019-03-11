import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'
import * as fromCommitmentTheme from './commitment-theme.reducer'

export const getCommitmentThemeState = (state) =>  {
  console.log(state)
  return state.commitmentTheme
}

export const getAllCommitmentThemes = createSelector(
    getCommitmentThemeState,
    fromCommitmentTheme.selectAll
)

export const getCommitmentThemePanelExpanded = createSelector(
    getCommitmentThemeState,
    state => state.expanded
)

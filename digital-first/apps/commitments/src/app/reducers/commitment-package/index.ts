import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'
import * as fromCommitmentPackage from './commitment-package.reducer'

export const getCommitmentPackageState = state => state.commitmentPackage

export const getAllCommitmentPackages = createSelector(
    getCommitmentPackageState,
    fromCommitmentPackage.selectAll
)

export const getCommitmentPackagePanelExpanded = createSelector(
    getCommitmentPackageState,
    state => state.expanded
)

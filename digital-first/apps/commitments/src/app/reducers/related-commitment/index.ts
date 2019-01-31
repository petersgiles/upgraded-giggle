import * as fromRelatedCommitment from './related-commitment.reducer'
import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'
import { formatCommitmentTitle } from '../../formatters'

import * as fromCommitmentRelatedCommitments from './related-commitment.reducer'
export const getRelatedCommitmentEntitiesState = state => state.relatedCommitment

export const getAllRelatedCommitments = createSelector(
    getRelatedCommitmentEntitiesState,
    fromCommitmentRelatedCommitments.selectAll
)

export const getRelatedCommitmentLoading = createSelector(
    getRelatedCommitmentEntitiesState,
    fromCommitmentRelatedCommitments.getLoading
)

export const getRelatedCommitmentError = createSelector(
    getRelatedCommitmentEntitiesState,
    fromCommitmentRelatedCommitments.getError
)

export const getCommitmentRelatedCommitmentsPanelExpanded = createSelector(
    getRelatedCommitmentEntitiesState,
    fromCommitmentRelatedCommitments.getExpanded
)

export const getRelatedCommitmentsTableData = createSelector(
    getAllRelatedCommitments,
    (commitments) => {

        const rows = commitments &&
           commitments.map(c => ({
                id: c.id,
                cells: [{
                    value: formatCommitmentTitle(c)
                }]
            }))

        const dtc: DataTableConfig = {
            title: 'related commitments',

            headings: [
                { caption: 'Commitment' }
            ],
            rows: rows
        }
        return dtc

    }
)
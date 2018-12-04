import * as fromRelatedCommitment from './related-commitment.reducer'
import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'
import { formatCommitmentTitle } from '../../formatters'
export const getRelatedCommitmentEntitiesState = state => state.relatedCommitment

export const {
    selectIds: getRelatedCommitmentIds,
    selectEntities: getRelatedCommitmentEntities,
    selectAll: getAllRelatedCommitments,
    selectTotal: getTotalRelatedCommitments,
} = fromRelatedCommitment.adapter.getSelectors(getRelatedCommitmentEntitiesState)

export const getRelatedCommitmentLoading = createSelector(
    getRelatedCommitmentEntitiesState,
    state => state.loading
)

export const getRelatedCommitmentError = createSelector(
    getRelatedCommitmentEntitiesState,
    state => state.error
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
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Commitment' }
            ],
            rows: rows
        }
        return dtc

    }
)
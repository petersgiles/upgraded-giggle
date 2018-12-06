import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'

import * as fromCommitmentOverviewMap from './commitment-overview-map.reducer'

export const getCommitmentOverviewMapState = state => state.commitmentOverviewMap

export const getCommitmentOverviewMapMapPoints = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewMapPoints
)

export const getCommitmentOverviewMapCommitments = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewCommitments
)

export const getCommitmentOverviewMapCommitmentsTableData = createSelector(
    getCommitmentOverviewMapCommitments,
    (items) => {

        const rows = (items || []).map(c =>
                ({
                    id: c.id,
                    cells: [{
                        value: `${c.title}`
                    }]
                }))

        const dtc: DataTableConfig = {
            title: 'commitments',
            hasDeleteItemButton: false,
            headings: [
                { caption: 'Title' }
            ],
            rows: rows
        }

        return dtc

    }
)
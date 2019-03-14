import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'

import * as fromCommitmentOverviewMap from './commitment-overview-map.reducer'
import { formatCommitmentTitle } from '../../formatters'
import { getFilteredOverviewCommitments } from '../commitment-overview'

export const getCommitmentOverviewMapState = state => state.commitmentOverviewMap

export const getCommitmentOverviewMapMapPoints = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewMapPoints
)

export const getCommitmentOverviewMapCommitments = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewCommitments
)

export const getCommitmentOverviewCommitmentsMapPoints = createSelector(
    getCommitmentOverviewMapCommitments,
    getCommitmentOverviewMapMapPoints,
    getFilteredOverviewCommitments,
    (ovmc, mp, oc) => {
        console.log(ovmc, mp, oc)

        return mp
    }
)

export const getCommitmentOverviewMapCommitmentsTableData = createSelector(
    getCommitmentOverviewMapCommitments,
    (items) => {

        const rows = (items || []).map(c =>
                ({
                    id: c.id,
                    cells: [{
                        value: `${formatCommitmentTitle(c)}`
                    }]
                }))

        const dtc: DataTableConfig = {
            title: 'commitments',
            headings: [
                { caption: 'Title' }
            ],
            rows: rows
        }

        return dtc

    }
)
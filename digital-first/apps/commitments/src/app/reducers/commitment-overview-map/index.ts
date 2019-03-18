import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'

import * as fromCommitmentOverviewMap from './commitment-overview-map.reducer'
import { formatCommitmentTitle } from '../../formatters'
import { getFilteredOverviewCommitments } from '../commitment-overview'
import { arrayToHash, arrayToIndex } from '@digital-first/df-utils';

export const getCommitmentOverviewMapState = state => state.commitmentOverviewMap

export const getCommitmentOverviewMapMapPoints = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewMapPoints
)

export const getCommitmentOverviewMapCommitments = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewCommitments
)

export const getCommitmentOverviewCommitmentMapPoints = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewCommitmentMapPoints
)

export const getCommitmentOverviewCommitmentsMapPoints = createSelector(
    getFilteredOverviewCommitments,
    getCommitmentOverviewCommitmentMapPoints,
    getCommitmentOverviewMapMapPoints,
    (foc, ovmc, mps) => {

        const filtered = arrayToIndex(foc)

        const cmpFiltered = arrayToIndex((ovmc || []).filter((cmp: any) => cmp.commitment && filtered.includes(cmp.commitment.id)).map(cf => cf.mapPoint), 'place_id')
        const pointsFiltered = (mps || []).filter((mp: any) => cmpFiltered.includes(mp.place_id))

        return pointsFiltered
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
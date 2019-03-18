import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'

import * as fromCommitmentOverviewMap from './commitment-overview-map.reducer'
import { formatCommitmentTitle, formatCommitmentId } from '../../formatters'
import { getFilteredOverviewCommitments } from '../commitment-overview'
import { arrayToHash, arrayToIndex } from '@digital-first/df-utils'
import { getAllParties } from '../commitment-lookup';

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

const DEFAULT_PARTY_ICON = 'beachFlag.png'

export const getCommitmentOverviewCommitmentsMapPoints = createSelector(
    getFilteredOverviewCommitments,
    getCommitmentOverviewCommitmentMapPoints,
    getCommitmentOverviewMapMapPoints,
    getAllParties,
    (foc, ovmc, mps, parties) => {

        const refinedCommitmentIds = arrayToIndex(foc)
        const refinedCommitments = arrayToHash(foc)
        const mapPointHash = arrayToHash(mps, 'place_id')
        const partyHash = arrayToHash(parties, 'id')

        const refinedMapPoints = (ovmc || [])
            .filter((cmp: any) => cmp.commitment && refinedCommitmentIds.includes(cmp.commitment.id))
            .map((cmp: any) => {

                const currentcommitment = refinedCommitments[cmp.commitment.id]
                const iconName = partyHash[currentcommitment.party.id].icon || DEFAULT_PARTY_ICON
           
                return {
                    ...mapPointHash[cmp.mapPoint.place_id],
                    iconUrl:  iconName 
                }
            })
           
console.log('refinedMapPoints', mps, refinedCommitments, partyHash)

        return refinedMapPoints
    }
)

export const getCommitmentOverviewMapCommitmentsTableData = createSelector(
    getCommitmentOverviewMapCommitments,
    (items) => {
        const rows = (items || []).map(c => ({
            id: c.id,
            commitmentId: formatCommitmentId(c),
            title: formatCommitmentTitle(c),
            party: c.party && c.party.title,
            portfolio: c.portfolio && c.portfolio.title,
            commitmentType: c.commitmentType && c.commitmentType.title,
            criticalDate: c.criticalDate && c.criticalDate.title
          }))

        return rows

    }

)

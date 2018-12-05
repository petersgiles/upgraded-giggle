import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'

import * as fromCommitmentOverviewMap from './commitment-overview-map.reducer'

export const getCommitmentOverviewMapState = state => state.commitmentOverviewMap

export const getCommitmentOverviewMapMapPoints = createSelector(
    getCommitmentOverviewMapState,
    fromCommitmentOverviewMap.getOverviewMapPoints
)
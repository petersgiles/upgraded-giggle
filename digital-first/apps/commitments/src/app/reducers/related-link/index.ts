import * as fromRelatedLink from './related-link.reducer'
import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'

import * as fromCommitmentRelatedLinks from './related-link.reducer'

export const getRelatedLinkEntitiesState = state => state.relatedLink

export const {
    selectIds: getRelatedLinkIds,
    selectEntities: getRelatedLinkEntities,
    selectAll: getAllRelatedLinks,
    selectTotal: getTotalRelatedLinks,
} = fromRelatedLink.adapter.getSelectors(getRelatedLinkEntitiesState)

export const getRelatedLinkLoading = createSelector(
    getRelatedLinkEntitiesState,
    fromCommitmentRelatedLinks.getLoading
)

export const getRelatedLinkError = createSelector(
    getRelatedLinkEntitiesState,
    fromCommitmentRelatedLinks.getError
)

export const getCommitmentRelatedLinksPanelExpanded = createSelector(
    getRelatedLinkEntitiesState,
    fromCommitmentRelatedLinks.getExpanded
)

export const getRelatedLinksTableData = createSelector(
    getAllRelatedLinks,
    (links) => {

        const rows = links &&
        links.map(c => ({
                id: c.id,
                cells: [{
                    value: c.url
                }]
            }))
            // tslint:disable-next-line:no-console
            console.log('getAllRelatedLinks', links, rows)
        const dtc: DataTableConfig = {
            title: 'related links',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Link' }
            ],
            rows: rows
        }
        return dtc

    }
)
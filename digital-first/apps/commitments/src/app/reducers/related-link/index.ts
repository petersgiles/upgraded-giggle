import * as fromRelatedLink from './related-link.reducer'
import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'
export const getRelatedLinkEntitiesState = state => state.relatedCommitment

export const {
    selectIds: getRelatedLinkIds,
    selectEntities: getRelatedLinkEntities,
    selectAll: getAllRelatedLinks,
    selectTotal: getTotalRelatedLinks,
} = fromRelatedLink.adapter.getSelectors(getRelatedLinkEntitiesState)

export const getRelatedLinkLoading = createSelector(
    getRelatedLinkEntitiesState,
    state => state.loading
)

export const getRelatedLinkError = createSelector(
    getRelatedLinkEntitiesState,
    state => state.error
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
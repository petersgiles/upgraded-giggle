import * as fromRelatedLink from './related-link.reducer'
import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'

import * as fromCommitmentRelatedLinks from './related-link.reducer'

export const getRelatedLinkEntitiesState = state => state.relatedLink

export const getRelatedLinkLoading = createSelector(
    getRelatedLinkEntitiesState,
    fromCommitmentRelatedLinks.getLoading
)

export const getAllRelatedLinks = createSelector(
    getRelatedLinkEntitiesState,
    fromCommitmentRelatedLinks.selectAll
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
    (data) => {
        const rows = data &&
        data.map(c => ({
                id: c.id,
                cells: [{
                    value: c.title,
                    type: 'url',
                    data: c.url
                }]
            }))
        // tslint:disable-next-line:no-console
        console.log('getAllRelatedLinks', data, rows)
        const dtc: DataTableConfig = {
            title: 'related links',
            headings: [
                { caption: 'Link' }
            ],
            rows: rows
        }
        return dtc

    }
)
import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'
import * as fromCommitmentAction from './commitment-action.reducer'

export const getCommitmentActionState = state => state.commitmentAction

export const getAllCommitmentActions = createSelector(
    getCommitmentActionState,
    fromCommitmentAction.selectAll
)

export const getCommitmentActionPanelExpanded = createSelector(
    getCommitmentActionState,
    state => state.expanded
)

export const getCommitmentActionsTableData = createSelector(
    getAllCommitmentActions,
    (actions) => {

        const rows = (actions || []).map(c => {

            const portfolio = c.portfolio ? c.portfolio.title : 'unknown'
            // tslint:disable-next-line:no-console
            console.log(c)
            return {
                id: c.id,
                cells: [{
                    value: `${c.title}`
                }, {
                    value: `${c.description}`
                }, {
                    value: `${portfolio}`
                }]
            }
        })

        const dtc: DataTableConfig = {
            title: 'contacts',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Title' },
                { caption: 'Description' },
                { caption: 'Portfolio' }
            ],
            rows: rows
        }

        return dtc

    }
)
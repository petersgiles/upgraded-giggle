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
                    value: `${portfolio}`
                }, {
                    truncate: 70,
                    value: `${c.description}`
                }]
            }
        })

        const dtc: DataTableConfig = {
            title: 'contacts',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Portfolio' },
                { caption: 'Description' }
            ],
            rows: rows
        }

        return dtc

    }
)
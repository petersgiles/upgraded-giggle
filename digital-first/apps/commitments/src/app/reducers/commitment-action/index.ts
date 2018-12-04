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

                const fullname = []
                // if (c.firstName) {
                //     fullname.push(c.firstName)
                // }

                // if (c.name) {
                //     fullname.push(c.name)
                // }

                return {
                    id: c.id,
                    cells: [{
                        value: `${fullname.join(' ')}`
                    }]
                }
            })

        const dtc: DataTableConfig = {
            title: 'contacts',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Name' }
            ],
            rows: rows
        }

        return dtc

    }
)
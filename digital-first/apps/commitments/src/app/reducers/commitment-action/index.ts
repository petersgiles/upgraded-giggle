import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-components'
import * as fromCommitmentAction from './commitment-action.reducer'
import { arrayToHash } from '@digital-first/df-utils'

export const getCommitmentActionState = state => state.commitmentAction

export const getAllCommitmentActions = createSelector(
    getCommitmentActionState,
    fromCommitmentAction.selectAll
)

export const getSelectedCommitmentAction = createSelector(
    getCommitmentActionState,
    fromCommitmentAction.getSelectedAction
)

export const getCommitmentActionPanelExpanded = createSelector(
    getCommitmentActionState,
    fromCommitmentAction.getExpanded
)

export const getCurrentCommitmentAction = createSelector(
    getAllCommitmentActions,
    getSelectedCommitmentAction,
    (actions, selected) => {
        const hash = arrayToHash(actions)
        const found = hash[selected]
        // tslint:disable-next-line:no-console
        console.log('getCurrentCommitmentAction', actions, selected, hash, found)
        return found
    })

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
                    value: `${c.costing}`
                }, {
                    truncate: 70,
                    value: `${c.description}`
                }]
            }
        })

        const dtc: DataTableConfig = {
            title: 'contacts',
            headings: [
                { caption: 'Portfolio' },
                { caption: 'Costing' },
                { caption: 'Description' }
            ],
            rows: rows
        }

        return dtc

    }
)
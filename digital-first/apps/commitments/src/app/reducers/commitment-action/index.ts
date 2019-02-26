import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'
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
                    truncate: 70,
                    value: `${c.id}`
                }, {
                    value: `${portfolio}`
                }, {
                    truncate: 70,
                    value: `${c.description}`
                }, {
                    truncate: 70,
                    value: `${c.costing}`
                }]
            }
        })

        const dtc: DataTableConfig = {
            title: 'Costing',
            headings: [
                { caption: 'Costing Id' },
                { caption: 'Costing By' },
                { caption: 'Costing Detail' },
                { caption: 'Additional Costing' }
            ],
            rows: rows
        }

        return dtc

    }
)
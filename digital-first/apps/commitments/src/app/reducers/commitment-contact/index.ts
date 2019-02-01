import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'
import * as fromCommitmentContact from './commitment-contact.reducer'

export const getCommitmentContactState = state => state.commitmentContact

export const getAllCommitmentContacts = createSelector(
    getCommitmentContactState,
    fromCommitmentContact.selectAll
)

export const getCommitmentContactPanelExpanded = createSelector(
    getCommitmentContactState,
    state => state.expanded
)

export const getCommitmentContactsTableData = createSelector(
    getAllCommitmentContacts,
    (contacts) => {

        const rows = (contacts || []).map(c => {

                const fullname = []
                if (c.firstName) {
                    fullname.push(c.firstName)
                }

                if (c.name) {
                    fullname.push(c.name)
                }

                return {
                    id: c.id,
                    cells: [{
                        value: `${fullname.join(' ')}`
                    }, {
                        value: c.jobTitle
                    }, {
                        value: c.phone
                    }, {
                        value: c.email
                    }, {
                        value: c.portfolio ? c.portfolio.title : ''
                    }]
                }
            })

        const dtc: DataTableConfig = {
            title: 'contacts',

            headings: [
                { caption: 'Name' },
                { caption: 'Job Title' },
                { caption: 'Phone' },
                { caption: 'Email' },
                { caption: 'Portfolio' }
            ],
            rows: rows
        }

        return dtc

    }
)
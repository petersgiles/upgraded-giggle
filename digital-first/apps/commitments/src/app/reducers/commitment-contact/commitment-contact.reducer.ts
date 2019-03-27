import { CommitmentContactActionTypes, CommitmentContactActions } from './commitment-contact.actions'
import { Contact } from '../../models/contact.model'

export interface State {
  expanded: boolean
  contacts: Contact[]
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  contacts: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentContactActions
): State {
  switch (action.type) {

    case CommitmentContactActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentContactActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentContactActionTypes.LoadCommitmentContacts: {
      const contacts = [...action.payload.contacts]
      return {
        ...state,
        contacts: contacts
      }
    }

    case CommitmentContactActionTypes.ClearCommitmentContacts: {
      return {
        ...state,
        contacts: []
      }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => state.contacts
export const getExpanded = (state: State) => state.expanded
export const getContactLoading = (state: State) => state.loading
export const getContactError = (state: State) => state.error
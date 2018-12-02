import { CommitmentContactActionTypes, CommitmentContactActions } from './commitment-contact.actions'

export interface State {
  expanded: boolean
  contacts: []
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

    default:
      return state
  }
}

export const selectAll = (state: State) => state.contacts
export const getExpanded = (state: State) => state.expanded
export const getContactLoading = (state: State) => state.loading
export const getContactError = (state: State) => state.error
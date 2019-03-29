import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Contact } from '../../models/contact.model'
import { ContactActions, ContactActionTypes } from './contact.actions'

export interface State extends EntityState<Contact> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: ContactActions
): State {
  switch (action.type) {
    case ContactActionTypes.AddContact: {
      return adapter.addOne(action.payload.contact, state)
    }

    case ContactActionTypes.UpsertContact: {
      return adapter.upsertOne(action.payload.contact, state)
    }

    case ContactActionTypes.AddContacts: {
      return adapter.addMany(action.payload.contacts, state)
    }

    case ContactActionTypes.UpsertContacts: {
      return adapter.upsertMany(action.payload.contacts, state)
    }

    case ContactActionTypes.UpdateContact: {
      return adapter.updateOne(action.payload.contact, state)
    }

    case ContactActionTypes.UpdateContacts: {
      return adapter.updateMany(action.payload.contacts, state)
    }

    case ContactActionTypes.DeleteContact: {
      return adapter.removeOne(action.payload.id, state)
    }

    // case ContactActionTypes.DeleteContacts: {
    //   return adapter.removeMany(action.payload.ids, state)
    // }

    case ContactActionTypes.LoadContacts: {
      return adapter.upsertMany(action.payload.data.contacts, {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      })
    }

    case ContactActionTypes.ClearContacts: {
      return adapter.removeAll(state)
    }

    case ContactActionTypes.GetContacts: {
      return {...state, loading: true, error: null}
    }

    case ContactActionTypes.GetAllContacts: {
      return {...state, loading: true, error: null}
    }

    case ContactActionTypes.ContactsActionFailure: {
      return {...state, loading: false, error: action.payload.error}
    }
    default: {
      return state
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()

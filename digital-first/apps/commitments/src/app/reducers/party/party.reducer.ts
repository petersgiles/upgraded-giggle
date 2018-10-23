import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Party } from './party.model'
import { PartyActions, PartyActionTypes } from './party.actions'

export interface State extends EntityState<Party> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<Party> = createEntityAdapter<Party>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: PartyActions
): State {
  switch (action.type) {
    case PartyActionTypes.AddParty: {
      return adapter.addOne(action.payload.party, state)
    }

    case PartyActionTypes.UpsertParty: {
      return adapter.upsertOne(action.payload.party, state)
    }

    case PartyActionTypes.AddPartys: {
      return adapter.addMany(action.payload.partys, state)
    }

    case PartyActionTypes.UpsertPartys: {
      return adapter.upsertMany(action.payload.partys, state)
    }

    case PartyActionTypes.UpdateParty: {
      return adapter.updateOne(action.payload.party, state)
    }

    case PartyActionTypes.UpdatePartys: {
      return adapter.updateMany(action.payload.partys, state)
    }

    case PartyActionTypes.DeleteParty: {
      return adapter.removeOne(action.payload.id, state)
    }

    case PartyActionTypes.DeletePartys: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case PartyActionTypes.LoadPartys: {
      return adapter.addAll(action.payload.data.parties, {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      })
    }

    case PartyActionTypes.ClearPartys: {
      return adapter.removeAll(state)
    }

    case PartyActionTypes.GetPartys: {
      return {...state, loading: true, error: null}
    }

    case PartyActionTypes.GetAllPartys: {
      return {...state, loading: true, error: null}
    }

    case PartyActionTypes.PartysActionFailure: {
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

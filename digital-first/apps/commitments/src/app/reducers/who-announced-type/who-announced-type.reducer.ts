import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { WhoAnnouncedType } from './who-announced-type.model'
import { WhoAnnouncedTypeActions, WhoAnnouncedTypeActionTypes } from './who-announced-type.actions'

export interface State extends EntityState<WhoAnnouncedType> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<WhoAnnouncedType> = createEntityAdapter<WhoAnnouncedType>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: WhoAnnouncedTypeActions
): State {
  switch (action.type) {
    // case WhoAnnouncedTypeActionTypes.AddWhoAnnouncedType: {
    //   return adapter.addOne(action.payload.whoAnnouncedType, state)
    // }

    // case WhoAnnouncedTypeActionTypes.UpsertWhoAnnouncedType: {
    //   return adapter.upsertOne(action.payload.whoAnnouncedType, state)
    // }

    // case WhoAnnouncedTypeActionTypes.AddWhoAnnouncedTypes: {
    //   return adapter.addMany(action.payload.whoAnnouncedTypes, state)
    // }

    // case WhoAnnouncedTypeActionTypes.UpsertWhoAnnouncedTypes: {
    //   return adapter.upsertMany(action.payload.whoAnnouncedTypes, state)
    // }

    // case WhoAnnouncedTypeActionTypes.UpdateWhoAnnouncedType: {
    //   return adapter.updateOne(action.payload.whoAnnouncedType, state)
    // }

    // case WhoAnnouncedTypeActionTypes.UpdateWhoAnnouncedTypes: {
    //   return adapter.updateMany(action.payload.whoAnnouncedTypes, state)
    // }

    // case WhoAnnouncedTypeActionTypes.DeleteWhoAnnouncedType: {
    //   return adapter.removeOne(action.payload.id, state)
    // }

    // case WhoAnnouncedTypeActionTypes.DeleteWhoAnnouncedTypes: {
    //   return adapter.removeMany(action.payload.ids, state)
    // }

    case WhoAnnouncedTypeActionTypes.LoadWhoAnnouncedTypes: {
      return adapter.upsertMany(action.payload.data.whoAnnouncedTypes, {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      })
    }

    case WhoAnnouncedTypeActionTypes.ClearWhoAnnouncedTypes: {
      return adapter.removeAll(state)
    }

    case WhoAnnouncedTypeActionTypes.GetWhoAnnouncedTypes: {
      return {...state, loading: true, error: null}
    }

    case WhoAnnouncedTypeActionTypes.GetAllWhoAnnouncedTypes: {
      return {...state, loading: true, error: null}
    }

    case WhoAnnouncedTypeActionTypes.WhoAnnouncedTypesActionFailure: {
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

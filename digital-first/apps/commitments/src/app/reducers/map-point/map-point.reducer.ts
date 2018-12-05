import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { MapPoint } from './map-point.model'
import { MapPointActions, MapPointActionTypes } from './map-point.actions'

export interface State extends EntityState<MapPoint> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<MapPoint> = createEntityAdapter<MapPoint>({
  selectId: entitiy => entitiy.place_id
})

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: MapPointActions
): State {
  switch (action.type) {

    case MapPointActionTypes.LoadMapPoints: {

      if (action.payload.data.mapPoints) {
        return adapter.upsertMany(action.payload.data.mapPoints, {
          ...state,
          loading: action.payload.loading,
          error: action.payload.error
        })
      }

      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      }
    }

    case MapPointActionTypes.ClearMapPoints: {
      return adapter.removeAll(state)
    }

    case MapPointActionTypes.GetMapPoints: {
      return { ...state, loading: true, error: null }
    }

    case MapPointActionTypes.GetAllMapPoints: {
      return { ...state, loading: true, error: null }
    }

    case MapPointActionTypes.MapPointsActionFailure: {
      return { ...state, loading: false, error: action.payload.error }
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

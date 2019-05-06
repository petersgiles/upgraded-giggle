import { MapActions, MapActionTypes } from './map.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  selectedMapPoint: []
  mapPoints: []
  mapPointCommitments: []
}

export const initialState: State = {
  selectedMapPoint: [],
  mapPoints: [],
  mapPointCommitments: []
}

export function reducer(state = initialState, action: MapActions): State {
  // tslint:disable-next-line: no-console
  console.log(`🐨 `, action)

  switch (action.type) {
    case MapActionTypes.LoadMapPoints:
      return state

    default:
      return state
  }
}

export const mapPointState = createFeatureSelector<State>('map')

export const selectRefinedMapPointsState = createSelector(
  mapPointState,
  (state: State) => state.mapPoints
)

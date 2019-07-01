import { LookupActions, LookupActionTypes } from './lookup.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {

}

export const initialState: State = {

}

export function reducer(
  state = initialState,
  action: LookupActions
): State {
  switch (action.type) {
   
    default:
      return state
  }
}

export const lookupState = createFeatureSelector<State>('lookups')

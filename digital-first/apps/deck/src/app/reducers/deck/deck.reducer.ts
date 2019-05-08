import { DeckActions, DeckActionTypes } from './deck.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DeckItem } from '@df/components'
import { sortBy } from '@df/utils';

export interface State {
  deckItems: DeckItem[]
  selectedCard: any
  currentParent: any
}

export const initialState: State = {
  deckItems: [],
  selectedCard: null,
  currentParent: null
}

export function reducer(state = initialState, action: DeckActions): State {
  // tslint:disable-next-line: no-console
  console.log(`🐀 `, action)

  switch (action.type) {
    case DeckActionTypes.GoBack:
      return state

    case DeckActionTypes.EditDeckItem:
      const nextDeck = JSON.parse(JSON.stringify(state.deckItems))
      
      if(!action.payload.id){
        nextDeck.push(action.payload)
      }

      return {
        ...state,
        deckItems: nextDeck,
        selectedCard: action.payload
      }

    case DeckActionTypes.SetActiveParent:
      return {
        ...state,
        selectedCard: null,
        currentParent: action.payload.id
      }

    case DeckActionTypes.SetSelectedDeckItem:
      return {
        ...state,
        selectedCard: null
      }

    case DeckActionTypes.LoadDeck:

      return {
        ...state,
        deckItems: action.payload.data
      }

    default:
      return state
  }
}

export const deckState = createFeatureSelector<State>('deck')

export const selectDeckItemsState = createSelector(
  deckState,
  (state: State) => state.deckItems
)

export const selectSelectedCardState = createSelector(
  deckState,
  (state: State) => state.selectedCard
)

export const selectCurrentParentState = createSelector(
  deckState,
  (state: State) => state.currentParent
)

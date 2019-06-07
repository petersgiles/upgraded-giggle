import { DeckActions, DeckActionTypes } from './deck.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { DeckItem, CardType } from '../../components/deck';

export interface State {
  deckItems: DeckItem[]
  briefs: any[]
  selectedCard: any
  currentParent: any
}

export const initialState: State = {
  deckItems: [],
  briefs: [],
  selectedCard: null,
  currentParent: null
}

export function reducer(state = initialState, action: DeckActions): State {
  switch (action.type) {
    case DeckActionTypes.GoBack:
      return state

    case DeckActionTypes.EditDeckItem:
      const nextDeck = JSON.parse(JSON.stringify(state.deckItems))

      if (!action.payload.id) {
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

    case DeckActionTypes.LoadBriefs:
      return {
        ...state,
        briefs: action.payload.data
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

export const selectCurrentBriefsState = createSelector(
  deckState,
  (state: State) => state.briefs
)

export const selectCardsByParentState = createSelector(
  selectCurrentParentState,
  selectDeckItemsState,
  (parent, cards) =>
    parent
      ? (cards || []).filter(p => p.parent === parent)
      : (cards || []).filter(p => p.parent === null)
)

export const selectEligibleParentsState = createSelector(
  selectDeckItemsState,
  (cards) =>
    (cards || []).filter(p => p.cardType === CardType.Parent)
)

export const selectCurrentParentCardState = createSelector(
  selectCurrentParentState,
  selectDeckItemsState,
  (parent, cards) => parent ? (cards || []).find(p => p.id === parent) : null
  )
import { DeckActions, DeckActionTypes } from './deck.actions'

export interface State {
  deckItems: any[]
  selectedCard: any
  parent: any
}

export const initialState: State = {
  deckItems: [],
  selectedCard: null,
  parent: null
}

export function reducer(state = initialState, action: DeckActions): State {
  switch (action.type) {
    case DeckActionTypes.LoadDeck:
      return state

    default:
      return state
  }
}

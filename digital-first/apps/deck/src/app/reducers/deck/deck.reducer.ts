
import { DeckActions, DeckActionTypes } from './deck.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: DeckActions): State {
  switch (action.type) {

    case DeckActionTypes.LoadDecks:
      return state;

    default:
      return state;
  }
}

import { Action } from '@ngrx/store';

export enum DeckActionTypes {
  LoadDecks = '[Deck] Load Decks',
  
  
}

export class LoadDecks implements Action {
  readonly type = DeckActionTypes.LoadDecks;
}


export type DeckActions = LoadDecks;

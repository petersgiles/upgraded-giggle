import { Action } from '@ngrx/store'

export enum DeckActionTypes {
  LoadDeck = '[Deck] Load Deck',
  GetDeckItems = '[Deck] Get DeckItems',
  GetDeckItemsFailure = '[Deck] Get DeckItems Failure',
  AddDeckItem = '[Deck] AddDeckItem',
  UpdateDeckItem = '[Deck] UpdateDeckItem',
  RemoveDeckItem = '[Deck] RemoveDeckItem'
}

export class LoadDeck implements Action {
  readonly type = DeckActionTypes.LoadDeck
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetDeckItems implements Action {
  readonly type = DeckActionTypes.GetDeckItems
  constructor(public payload?: { parent: string}) {}
}

export class AddDeckItem implements Action {
  readonly type = DeckActionTypes.AddDeckItem
  constructor(public payload?: any) {}
}

export class UpdateDeckItem implements Action {
  readonly type = DeckActionTypes.UpdateDeckItem
  constructor(public payload?: any) {}
}

export class RemoveDeckItem implements Action {
  readonly type = DeckActionTypes.RemoveDeckItem
  constructor(public payload?: any) {}
}

export class GetDeckItemsFailure implements Action {
  readonly type = DeckActionTypes.GetDeckItemsFailure
  constructor(public payload: any) {}
}

export type DeckActions = LoadDeck | GetDeckItems | GetDeckItemsFailure | AddDeckItem | UpdateDeckItem | RemoveDeckItem

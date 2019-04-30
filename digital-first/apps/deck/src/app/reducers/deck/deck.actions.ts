import { Action } from '@ngrx/store'

export enum DeckActionTypes {
  LoadDeck = '[Deck] Load Deck',
  GetDeckItems = '[Deck] Get DeckItems',
  GetDeckItemsFailure = '[Deck] Get DeckItems Failure',
  AddDeckItem = '[Deck] AddDeckItem',
  UpdateDeckItem = '[Deck] UpdateDeckItem',
  RemoveDeckItem = '[Deck] RemoveDeckItem',
  SetActiveParent = '[Deck] SetActiveParent',
  SetSelectedDeckItem = '[Deck] SetSelectedDeckItem'
}

export class LoadDeck implements Action {
  readonly type = DeckActionTypes.LoadDeck
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetDeckItems implements Action {
  readonly type = DeckActionTypes.GetDeckItems
  constructor(public payload?: { parent: string }) {}
}

export class AddDeckItem implements Action {
  readonly type = DeckActionTypes.AddDeckItem
  constructor(public payload: any) {}
}

export class UpdateDeckItem implements Action {
  readonly type = DeckActionTypes.UpdateDeckItem
  constructor(public payload: any) {}
}

export class RemoveDeckItem implements Action {
  readonly type = DeckActionTypes.RemoveDeckItem
  constructor(public payload: { id: string}) {}
}

export class GetDeckItemsFailure implements Action {
  readonly type = DeckActionTypes.GetDeckItemsFailure
  constructor(public payload: any) {}
}

export class SetActiveParent implements Action {
  readonly type = DeckActionTypes.SetActiveParent
  constructor(public payload: { id: string}) {}
}

export class SetSelectedDeckItem implements Action {
  readonly type = DeckActionTypes.SetSelectedDeckItem
  constructor(public payload: { id: string}) {}
}

export type DeckActions =
    LoadDeck
  | GetDeckItems
  | GetDeckItemsFailure
  | AddDeckItem
  | UpdateDeckItem
  | RemoveDeckItem
  | SetActiveParent
  | SetSelectedDeckItem

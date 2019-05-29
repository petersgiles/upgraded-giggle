import { Action } from '@ngrx/store'
import { DeckItem } from '@df/components';

export enum DeckActionTypes {
  LoadDeck = '[Deck] Load Deck',
  GetDeckItems = '[Deck] Get DeckItems',
  GetDeckItemsFailure = '[Deck] Get DeckItems Failure',
  EditDeckItem = '[Deck] EditDeckItem',
  AddDeckItem = '[Deck] AddDeckItem',
  UpdateDeckItem = '[Deck] UpdateDeckItem',
  RemoveDeckItem = '[Deck] RemoveDeckItem',
  SetActiveParent = '[Deck] SetActiveParent',
  GoBack= '[Deck] GoBack',
  SetSelectedDeckItem = '[Deck] SetSelectedDeckItem',
  GetBriefs = '[Deck] GetBriefs',
  LoadBriefs = '[Deck] LoadBriefs',
  GetBriefsFailure = '[Deck] GetBriefsFailure'
}

export class LoadDeck implements Action {
  readonly type = DeckActionTypes.LoadDeck
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class LoadBriefs implements Action {
  readonly type = DeckActionTypes.LoadBriefs
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetDeckItems implements Action {
  readonly type = DeckActionTypes.GetDeckItems
  constructor(public payload?: { parent: string }) {}
}

export class EditDeckItem implements Action {
  readonly type = DeckActionTypes.EditDeckItem
  constructor(public payload: DeckItem) {}
}

export class AddDeckItem implements Action {
  readonly type = DeckActionTypes.AddDeckItem
  constructor(public payload: DeckItem) {}
}

export class UpdateDeckItem implements Action {
  readonly type = DeckActionTypes.UpdateDeckItem
  constructor(public payload: DeckItem) {}
}

export class RemoveDeckItem implements Action {
  readonly type = DeckActionTypes.RemoveDeckItem
  constructor(public payload: { id: string}) {}
}

export class GetDeckItemsFailure implements Action {
  readonly type = DeckActionTypes.GetDeckItemsFailure
  constructor(public payload: any) {}
}

export class GoBack implements Action {
  readonly type = DeckActionTypes.GoBack
}

export class SetActiveParent implements Action {
  readonly type = DeckActionTypes.SetActiveParent
  constructor(public payload: { id: string}) {}
}

export class SetSelectedDeckItem implements Action {
  readonly type = DeckActionTypes.SetSelectedDeckItem
  constructor(public payload: { id: string}) {}
}

export class GetBriefs implements Action {
  readonly type = DeckActionTypes.GetBriefs
  constructor(public payload: any) {}
}

export class GetBriefsFailure implements Action {
  readonly type = DeckActionTypes.GetBriefsFailure
  constructor(public payload: any) {}
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
  | GoBack
  | EditDeckItem
  | GetBriefs
  | LoadBriefs
  | GetBriefsFailure
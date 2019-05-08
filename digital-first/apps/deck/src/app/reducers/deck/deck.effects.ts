import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, catchError, switchMap, tap, map } from 'rxjs/operators'
import { EMPTY, of, Observable, forkJoin } from 'rxjs'
import {
  DeckActionTypes,
  DeckActions,
  GetDeckItemsFailure,
  LoadDeck,
  GetDeckItems,
  AddDeckItem,
  RemoveDeckItem,
  UpdateDeckItem
} from './deck.actions'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint'
import { byParentIdQuery } from '../../services/sharepoint/caml'
import { DeckItem, DeckItemAction } from '@df/components'
import { sortBy } from '@df/utils';

export const tryParseJSON = (jsonString) => {
  try {
      const o = JSON.parse(jsonString);

      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object", 
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === 'object') {
          return JSON.parse(jsonString)
      }
  } catch (e) { }

  return false
};

export const mapDeckItem = (item): DeckItem => {
  const allActions = (item.Actions || '').split(';').map(a => {
    const [url, title] = a.split('|')
    return { title, url }
  })

// tslint:disable-next-line: no-console
  console.log(tryParseJSON(item.Data))

  return {
    id: item.ID,
    title: item.Title,
    parent: idFromLookup(item.Parent),
    supportingText: item.SupportingText,
    size: item.Size,
    cardType: item.CardType,
    actions: allActions,
    sortOrder: item.SortOrder,
    colour: item.Colour,
    titleClass: item.Colour,
    media: null,
    data: tryParseJSON(item.Data)
  }
}

export const mapDeckItems = (items): any[] => (items || []).map(mapDeckItem)

const DECK_ITEM_LIST_NAME = 'DeckItems'

@Injectable()
export class DeckEffects {
  addDeckItem = (deckItem: any): Observable<any> =>
    this.sharepoint
      .storeItem({
        listName: DECK_ITEM_LIST_NAME,
        data: {}
      })
      .pipe(concatMap(_ => of({})))

  updateDeckItem = (item: any): Observable<any> => {
    const allActions = item.actions.map((deckItemAction: DeckItemAction) => `${deckItemAction.url}|${deckItemAction.title}`)
    const actionList = allActions.join(';')
    return this.sharepoint
      .storeItem({
        listName: DECK_ITEM_LIST_NAME,
        data: {
          Title: item.title,
          SupportingText: item.supportingText,
          Size: item.size,
          CardType: item.cardType,
          Actions: actionList,
          SortOrder: item.sortOrder,
          Colour: item.colour,
          Data: JSON.stringify(item.data)
        },
        id: item.id
      })
      .pipe(concatMap(_ => of({})))
  }

  removeDeckItem = (deckItem: { id: string }): Observable<any> =>
    this.sharepoint
      .removeItem({
        listName: DECK_ITEM_LIST_NAME,
        id: deckItem.id
      })
      .pipe(concatMap(_ => of({})))

  getDeckItems = (
    parent
  ): Observable<{
    data: any
    loading: boolean
  }> =>
    forkJoin([
      this.sharepoint.getItems({
        listName: DECK_ITEM_LIST_NAME
      })
    ]).pipe(
      map(([spDeckItems]) => [...mapDeckItems(spDeckItems)]),
      map(result => (result || []).sort(sortBy('sortOrder'))),
      concatMap(result =>
        of({
          data: result,
          loading: false
        })
      )
    )

  @Effect()
  getDeckItems$ = this.actions$.pipe(
    ofType(DeckActionTypes.GetDeckItems),
    map((action: GetDeckItems) => action),
    concatMap(action => this.getDeckItems(action.payload.parent)),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`🍺 `, result)),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadDeck({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  @Effect()
  addDeckItem$ = this.actions$.pipe(
    ofType(DeckActionTypes.AddDeckItem),
    map((action: AddDeckItem) => action),
    concatMap(action => this.addDeckItem(action.payload)),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`🍺 `, result)),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadDeck({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  @Effect()
  removeDeckItem$ = this.actions$.pipe(
    ofType(DeckActionTypes.RemoveDeckItem),
    map((action: RemoveDeckItem) => action),
    concatMap(action => this.removeDeckItem(action.payload)),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`🍺 `, result)),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadDeck({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  @Effect()
  updateDeckItem$ = this.actions$.pipe(
    ofType(DeckActionTypes.UpdateDeckItem),
    map((action: UpdateDeckItem) => action),
    concatMap(action => this.updateDeckItem(action.payload)),
    // tslint:disable-next-line: no-console
    tap(result => console.log(`🍺 `, result)),
    switchMap((result: { data: any; loading: boolean }) => [
      new GetDeckItems({ parent: null })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  constructor(
    private actions$: Actions<DeckActions>,
    private sharepoint: SharepointJsomService
  ) {}
}

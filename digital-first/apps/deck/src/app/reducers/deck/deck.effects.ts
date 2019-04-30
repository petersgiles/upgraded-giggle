import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, catchError, switchMap, tap, map } from 'rxjs/operators'
import { EMPTY, of, Observable, forkJoin } from 'rxjs'
import { DeckActionTypes, DeckActions, GetDeckItemsFailure, LoadDeck, GetDeckItems, AddDeckItem, RemoveDeckItem, UpdateDeckItem } from './deck.actions'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint';
import { byParentIdQuery } from '../../services/sharepoint/caml'

export const mapDeckItem = (item): any => {
  return {
    id: item.ID,
    title: item.Title
  }
}

export const mapDeckItems = (items): any[] => (items || []).map(mapDeckItem)

const DECK_ITEM_LIST_NAME = 'DeckItem'

@Injectable()
export class DeckEffects {

  addDeckItem = (deckItem: any): Observable<any> => {
    return this.sharepoint.storeItem({
      listName: DECK_ITEM_LIST_NAME,
      data: {  }
    })
    .pipe(
      concatMap(_ => of({ }))
    )
  }

  updateDeckItem = (deckItem: any): Observable<any> => {
    return this.sharepoint.storeItem({
      listName: DECK_ITEM_LIST_NAME,
      data: {  },
      id: deckItem.id
    })
    .pipe(
      concatMap(_ => of({ }))
    )
  }

  removeDeckItem = (deckItem: {
    id: string
  }): Observable<any> => {
    return this.sharepoint.removeItem({
      listName: DECK_ITEM_LIST_NAME,
      id: deckItem.id
    })
    .pipe(
      concatMap(_ => of({  }))
    )
  }

  getDeckItems = (parent): Observable<{
    data: any,
    loading: boolean
  }> => {
    const parentIdViewXml = byParentIdQuery({ id: parent })

    return forkJoin([
      this.sharepoint.getItems({
        listName: DECK_ITEM_LIST_NAME,
        viewXml: parentIdViewXml
      })
    ]).pipe(
      map(([spDeckItems]) => [...mapDeckItems(spDeckItems)]),
      concatMap(result =>
        of({
          data: { nodes: result },
          loading: false
        })
      )
    )
  }

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
      new LoadDeck({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  constructor(private actions$: Actions<DeckActions>,
    private sharepoint: SharepointJsomService) {}
}

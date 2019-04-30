import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, catchError, switchMap, tap, map } from 'rxjs/operators'
import { EMPTY, of, Observable, forkJoin } from 'rxjs'
import { DeckActionTypes, DeckActions, GetDeckItemsFailure, LoadDeck, GetDeckItems } from './deck.actions'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint';
import { byParentIdQuery } from '../../services/sharepoint/caml'

export const mapDeckItem = (item): any => {
  return {
    id: item.ID,
    title: item.Title
  }
}

export const mapDeckItems = (items): any[] => (items || []).map(mapDeckItem)

@Injectable()
export class DeckEffects {

  getDeckItems = (parent): Observable<{
    data: any,
    loading: boolean
  }> => {
    const parentIdViewXml = byParentIdQuery({ id: parent })

    return forkJoin([
      this.sharepoint.getItems({
        listName: 'DeckItem',
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
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  )

  @Effect()
  removeDeckItem$ = this.actions$.pipe(
    ofType(DeckActionTypes.RemoveDeckItem),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  )

  @Effect()
  updateDeckItem$ = this.actions$.pipe(
    ofType(DeckActionTypes.UpdateDeckItem),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  )

  constructor(private actions$: Actions<DeckActions>,
    private sharepoint: SharepointJsomService) {}
}

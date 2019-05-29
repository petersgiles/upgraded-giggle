import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { concatMap, catchError, switchMap, tap, map } from 'rxjs/operators'
import { of, Observable, forkJoin } from 'rxjs'
import {
  DeckActionTypes,
  DeckActions,
  GetDeckItemsFailure,
  LoadDeck,
  GetDeckItems,
  AddDeckItem,
  RemoveDeckItem,
  UpdateDeckItem,
  GetBriefs,
  GetBriefsFailure,
  LoadBriefs
} from './deck.actions'
import { DeckDataService } from './deck-data.service'

@Injectable()
export class DeckEffects {
  @Effect()
  getDeckItems$ = this.actions$.pipe(
    ofType(DeckActionTypes.GetDeckItems),
    map((action: GetDeckItems) => action),
    concatMap(action => this.service.getDeckItems(action.payload.parent)),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadDeck({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  @Effect()
  getBriefs$ = this.actions$.pipe(
    ofType(DeckActionTypes.GetBriefs),
    map((action: GetBriefs) => action),
    concatMap(action => this.service.getBriefs()),
    switchMap((result: { data: any; loading: boolean }) => [
      new LoadBriefs({
        data: result.data,
        loading: result.loading
      })
    ]),
    catchError(error => of(new GetBriefsFailure(error)))
  )

  @Effect()
  addDeckItem$ = this.actions$.pipe(
    ofType(DeckActionTypes.AddDeckItem),
    map((action: AddDeckItem) => action),
    concatMap(action => this.service.addDeckItem(action.payload)),
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
    concatMap(action => this.service.removeDeckItem(action.payload)),
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
    concatMap(action => this.service.updateDeckItem(action.payload)),
    switchMap((result: { data: any; loading: boolean }) => [
      new GetDeckItems({ parent: null })
    ]),
    catchError(error => of(new GetDeckItemsFailure(error)))
  )

  constructor(
    private actions$: Actions<DeckActions>,
    private service: DeckDataService
  ) {}
}

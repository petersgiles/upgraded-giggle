import { Injectable } from '@angular/core'
import { Observable, of, forkJoin } from 'rxjs'
import { SharepointJsomService, idFromLookup } from '@df/sharepoint'
import { DeckDataService } from '../deck-data.service'
import { concatMap, map, tap } from 'rxjs/operators'
import { DeckItemAction, DeckItem } from '../../../components/deck'
import { tryParseJSON } from '../utils'
import { sortBy } from '../../../utils'

const DECK_ITEM_LIST_NAME = 'DeckItems'
const BRIEF_ITEM_LIST_NAME = 'Brief'

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


export const mapBrief = (item): { id: string; name: string } => {
  
  // tslint:disable-next-line: no-console
  console.log(tryParseJSON(item.Data))

  return {
    id: item.ID,
    name: item.Title,
  }
}

export const mapBriefs = (items): any[] => (items || []).map(mapBrief)


@Injectable({
  providedIn: 'root'
})
export class DeckDataSharepointService implements DeckDataService {
  addDeckItem = (item: any): Observable<any> => {
    // tslint:disable-next-line: no-console
    console.log(`🍄 addDeckItem`, item)
    return this.sharepoint
      .storeItem({
        listName: DECK_ITEM_LIST_NAME,
        data: {}
      })
      .pipe(concatMap(_ => of({})))
  }

  updateDeckItem = (item: any): Observable<any> => {
    // tslint:disable-next-line: no-console
    console.log(`🍄 updateDeckItem`, item)

    const allActions = item.actions.map(
      (deckItemAction: DeckItemAction) =>
        `${deckItemAction.url}|${deckItemAction.title}`
    )
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

  removeDeckItem = (deckItem: { id: string }): Observable<any> => {
    // tslint:disable-next-line: no-console
    console.log(`🍄 removeDeckItem`, deckItem)
    return this.sharepoint
      .removeItem({
        listName: DECK_ITEM_LIST_NAME,
        id: deckItem.id
      })
      .pipe(concatMap(_ => of({})))
  }

  getDeckItems = (
    parent
  ): Observable<{
    data: any
    loading: boolean
  }> => {
    // tslint:disable-next-line: no-console
    console.log(`🍄 getDeckItems`, parent)

    return forkJoin([
      this.sharepoint.getItems({
        listName: DECK_ITEM_LIST_NAME
      })
    ]).pipe(
      map(([spDeckItems]) => [...mapDeckItems(spDeckItems)]),
      map(result => (result || []).sort(sortBy('sortOrder'))),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`🍄 getDeckItems`, result)),
      concatMap(result =>
        of({
          data: result,
          loading: false
        })
      )
    )
  }

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return forkJoin([
      this.sharepoint.getItems({
        listName: BRIEF_ITEM_LIST_NAME
      })
    ]).pipe(
      map(([spBriefs]) => [...mapBriefs(spBriefs)]),
      map(result => (result || []).sort(sortBy('sortOrder'))),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`🍄 getBriefs`, result)),
      concatMap(result =>
        of({
          data: result,
          loading: false
        })
      )
    )
  }

  constructor(private sharepoint: SharepointJsomService) {}
}

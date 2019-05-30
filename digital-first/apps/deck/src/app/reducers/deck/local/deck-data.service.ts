import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { DeckDataService } from '../deck-data.service'
import { deckData, briefs } from './data'
import { generateGUID } from '../../../utils'
@Injectable({
  providedIn: 'root'
})
export class DeckDataLocalService implements DeckDataService {
  fakeBackend: Subject<any[]> = new Subject()
  fakeBackendSubscription$: Subscription
  deckItems: BehaviorSubject<any> = new BehaviorSubject(null)

  fakeBriefBackend: Subject<any[]> = new Subject()
  fakeBriefBackendSubscription$: Subscription
  briefItems: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() {
    this.fakeBackendSubscription$ = this.fakeBackend.subscribe(next =>
      this.deckItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeBackend.next(deckData.data)

    this.fakeBriefBackendSubscription$ = this.fakeBriefBackend.subscribe(next =>
      this.briefItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeBriefBackend.next(briefs)
  }

  public addDeckItem(deckItem: any): Observable<{ data: any; loading: boolean }> {
    const item = JSON.parse(JSON.stringify(deckItem))

    const items = this.deckItems.getValue()

    const next = JSON.parse(JSON.stringify(items.data))

    // tslint:disable-next-line: no-console
    console.log(`🙈`, item)

    if (!item.id) {
      const newId = generateGUID()
      // tslint:disable-next-line: no-console
      console.log(`🙈`, newId)
      item.id = newId
    }

    // tslint:disable-next-line: no-console
    console.log(`🙈`, next, item)
    next.push(item)
    // tslint:disable-next-line: no-console
    console.log(`🙈`, next, item)

    this.deckItems.next({
      data: next,
      loading: false
    })

    return of({
      data: next,
      loading: false
    })
  }
  public updateDeckItem(deckItem: any): Observable<any> {
    const item = JSON.parse(JSON.stringify(deckItem))

    const items = this.deckItems.getValue()

    const next = JSON.parse(JSON.stringify(items.data))

    // tslint:disable-next-line: no-console
    console.log(`🙈`, next, item)
    const filtered = next.filter(p => p.id !== item.id)
    filtered.push(item)
    // tslint:disable-next-line: no-console
    console.log(`🙈`, filtered, item)

    this.deckItems.next({
      data: filtered,
      loading: false
    })

    return of({
      data: filtered,
      loading: false
    })
  }
  
  public removeDeckItem(deckItem: { id: string }): Observable<any> {
    return of(null)
  }

  public getDeckItems = (): Observable<{ data: any; loading: boolean }> =>
    this.deckItems

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.briefItems
  }
}

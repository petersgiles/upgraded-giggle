import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { DeckDataService } from '../deck-data.service'
import { deckData, briefs } from './data'
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

  public addDeckItem(deckItem: any): Observable<any> {
    return of(null)
  }
  public updateDeckItem(deckItem: any): Observable<any> {
    return of(null)
  }
  public removeDeckItem(deckItem: { id: string }): Observable<any> {
    return of(null)
  }

  public getDeckItems = (): Observable<{ data: any; loading: boolean }> => {
    const deckItems = this.deckItems
    return this.deckItems
  }

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.briefItems
  }
}

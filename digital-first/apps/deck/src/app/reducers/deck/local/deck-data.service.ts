import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { DeckDataService } from '../deck-data.service'
import { deckData } from './data'
import { DeckItem } from '../../../components/deck';
@Injectable({
  providedIn: 'root'
})
export class DeckDataLocalService implements DeckDataService {
  fakeBackend: Subject<any[]> = new Subject()
  fakeBackendSubscription$: Subscription
  deckItems: Subject<any> = new Subject()


  constructor() {
    this.fakeBackendSubscription$ = this.fakeBackend.subscribe(next => this.deckItems.next({
      data: next,
      loading: false
    }))

    this.fakeBackend.next(deckData.data)
  }

  public addDeckItem(deckItem: any): Observable<any> {
    // tslint:disable-next-line: no-console
    console.log(`🍄 addDeckItem`, deckItem)
    return of(null)
  }
  public updateDeckItem(deckItem: any): Observable<any> {
    // tslint:disable-next-line: no-console
    console.log(`🍄 updateDeckItem`, deckItem)
    return of(null)
  }
  public removeDeckItem(deckItem: { id: string }): Observable<any> {
    // tslint:disable-next-line: no-console
    console.log(`🍄 removeDeckItem`, deckItem)
    return of(null)
  }

  public getDeckItems = (): Observable<{ data: any; loading: boolean }> => this.deckItems
}

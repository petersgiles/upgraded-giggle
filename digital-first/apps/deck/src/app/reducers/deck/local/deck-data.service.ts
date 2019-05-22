import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { DeckDataService } from '../deck-data.service'
import { deckItems } from './data'
@Injectable({
  providedIn: 'root'
})
export class DeckDataLocalService implements DeckDataService {
  fakeBackend: BehaviorSubject<any[]> = new BehaviorSubject(deckItems.data)

  public addDeckItem(deckItem: any): Observable<any> {
    return of(null)
  }
  public updateDeckItem(item: any): Observable<any> {
    return of(null)
  }
  public removeDeckItem(deckItem: { id: string }): Observable<any> {
    return of(null)
  }
  public getDeckItems(
    parent: any
  ): Observable<{ data: any; loading: boolean }> {

    const cards = parent ? this.fakeBackend.getValue().filter(p => p.parent === parent) : this.fakeBackend.getValue().filter(p => p.parent === null)

    return of({
      data: cards,
      loading: false
    })
  }
}

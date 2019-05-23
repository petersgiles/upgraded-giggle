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
  ): Observable<{ data: any; loading: boolean }> {

    const cards =  this.fakeBackend.getValue()

    return of({
      data: cards,
      loading: false
    })
  }
}

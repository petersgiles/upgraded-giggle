import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class DeckDataService {
  abstract addDeckItem(deckItem: any): Observable<any>
  abstract updateDeckItem(item: any): Observable<any>
  abstract removeDeckItem(deckItem: { id: string }): Observable<any>
  abstract getDeckItems(parent: any): Observable<{data: any, loading: boolean }>
  abstract getBriefs(): Observable<{
    data: any
    loading: boolean
  }>
}

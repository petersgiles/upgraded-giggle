import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract storeComment(comment: { artifact: any; parent: any; comment: any; }): Observable<any>
  abstract deleteComment(comment: { id: any }): any
  abstract filterContacts(filter?: any): Observable<any>
}

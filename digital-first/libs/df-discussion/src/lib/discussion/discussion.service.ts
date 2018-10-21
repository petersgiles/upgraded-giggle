import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class DiscussionService {

  abstract upsertComment(comment: { commitment: any; parent: any; comment: any; author: any }): Observable<any>
  abstract deleteComment(comment: { id: any, commitment: any }): any
}

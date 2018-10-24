import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Commitment } from '../reducers/commitment'

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract storeCommitment(commitment: Commitment): Observable<any>

  abstract getCommitment(criteria: { id: number; }): Observable<any>
  abstract filterCommitments(filter?: { party?: string; type?: string; portfolio?: string; }): Observable<any>
  abstract storeComment(comment: { commitment: any; parent: any; comment: any; }): Observable<any>
  abstract deleteComment(comment: { id: any }): any

  abstract filterAnnouncementTypes(filter?: any): Observable<any>
  abstract getCommentsByCommitment(commitment: number): Observable<any>
  abstract filterPortfolios(filter?: any): Observable<any>
  abstract filterPartys(filter?: any): Observable<any>
  abstract filterContacts(filter?: any): Observable<any>
  abstract filterLocations(filter?: any): Observable<any>
  abstract filterCommitmentTypes(filter?: any): Observable<any>
  abstract filterParties(filter?: any): Observable<any>
}

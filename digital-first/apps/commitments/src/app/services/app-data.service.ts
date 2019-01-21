import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Commitment } from '../reducers/commitment'

export const ROLE_READ = 'ROLE_READ'
export const ROLE_WRITE = 'ROLE_WRITE'

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {

  abstract getCurrentUser(): Observable<any>
  abstract getCurrentUserOperations(roles: any): Observable<any>

  abstract removeElectorateFromCommitment(payload: any): Observable<any>
  abstract addElectorateToCommitment(payload: any): Observable<any>

  abstract storeMapPoint(mapPoint: any): Observable<any>
  abstract removeMapPoint(placeId: any): Observable<any>

  abstract removeMapPointFromCommitment(payload: any): Observable<any>
  abstract addMapPointToCommitment(payload: any): Observable<any>
  abstract getMapPointsByCommitment(commitment: any): Observable<any>

  abstract storeCommitment(commitment: Commitment): Observable<any>

  abstract getCommitment(criteria: { id: any; }): Observable<any>

  abstract storeContact(contact: any): Observable<any>

  abstract filterContacts(filter?: any): Observable<any>
  abstract filterMapPoints(filter: any): Observable<any>
  abstract filterCommitments(filter?: { party?: string; type?: string; portfolio?: string; }): Observable<any>

}

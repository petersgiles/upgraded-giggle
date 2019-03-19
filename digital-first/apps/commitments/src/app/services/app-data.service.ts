import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Commitment } from '../reducers/commitment'

export const ROLE_OWNERS = 'ROLE_OWNERS'
export const ROLE_MEMBERS = 'ROLE_MEMBERS'
export const ROLE_VISITORS = 'ROLE_VISITORS'

export const OPERATION_COMMITMENT = 'commitment'
export const OPERATION_LOCATION = 'location'
export const OPERATION_CONTACTS = 'contacts'
export const OPERATION_COSTING = 'costing'
export const OPERATION_RELATEDLINKS = 'relatedLinks'
export const OPERATION_RELATEDCOMMITMENTS = 'relatedCommitments'
export const OPERATION_DISCUSSION = 'discussion'
export const OPERATION_COMMITMENT_PORTFOLIO = 'relatedPortfolios'
export const OPERATION_COMMITMENT_THEME = 'relatedThemes'
export const OPERATION_COMMITMENT_PACKAGE = 'relatedPackages'
export const OPERATION_COMMITMENT_STATUS = 'relatedStatuses'

export const OPERATION_RIGHT_READ = 'read'
export const OPERATION_RIGHT_WRITE = 'write'
export const OPERATION_RIGHT_HIDE = 'hide'

export const OPERATION_RIGHTS_PRECEDENT = [OPERATION_RIGHT_HIDE, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ]

export const OPERATION_DEFAULTS = {
  'commitment': OPERATION_RIGHT_READ,
  'location': OPERATION_RIGHT_READ,
  'contacts': OPERATION_RIGHT_READ,
  'costing': OPERATION_RIGHT_READ,
  'relatedLinks': OPERATION_RIGHT_READ,
  'relatedCommitments': OPERATION_RIGHT_READ,
  'relatedPortfolios': OPERATION_RIGHT_WRITE,
  'relatedPackages': OPERATION_RIGHT_WRITE,
  'relatedThemes': OPERATION_RIGHT_WRITE,
  'relatedStatuses': OPERATION_RIGHT_WRITE,
  'discussion': OPERATION_RIGHT_WRITE, // Temporary Default
}
@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract getCurrentUser(): Observable<any>
  abstract getCurrentUserOperations(roles: any): Observable<any>
  abstract storeCommitment(commitment: Commitment): Observable<any>
  abstract getCommitment(criteria: { id: any; }): Observable<any>
  abstract storeContact(contact: any): Observable<any>
  abstract filterContacts(filter?: any): Observable<any>
  abstract filterCommitments(filter?: { party?: string; type?: string; portfolio?: string; }): Observable<any>

}

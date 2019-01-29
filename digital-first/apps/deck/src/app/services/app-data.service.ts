import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

export const ROLE_OWNERS = 'ROLE_OWNERS'
export const ROLE_MEMBERS = 'ROLE_MEMBERS'
export const ROLE_VISITORS = 'ROLE_VISITORS'

export const OPERATION_DECK = 'deck'

export const OPERATION_RIGHT_READ = 'read'
export const OPERATION_RIGHT_WRITE = 'write'
export const OPERATION_RIGHT_HIDE = 'hide'

export const OPERATION_RIGHTS_PRECEDENT = [OPERATION_RIGHT_HIDE, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ]

export const OPERATION_DEFAULTS = {

}
@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract getCurrentUser(): Observable<any>
  abstract getCurrentUserOperations(roles: any): Observable<any>
}

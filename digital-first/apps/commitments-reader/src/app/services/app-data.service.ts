import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract getCurrentUser(): Observable<any>
  abstract getCurrentUserOperations(roles: any): Observable<any>
}

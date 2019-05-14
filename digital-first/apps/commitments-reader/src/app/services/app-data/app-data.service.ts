import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class AppDataService {
  abstract getBusy(): Observable<boolean>
  abstract get Notification()
  abstract setDrawState(appdrawerOpen: any): any
  abstract getDrawState(): Observable<boolean>
  abstract getCurrentUser(): Observable<any>
  abstract getCurrentUserOperations(): Observable<any>
}

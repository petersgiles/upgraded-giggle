import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { BriefDataService } from '../brief-data.service'
import { briefs } from './data'

@Injectable({
  providedIn: 'root'
})
export class BriefDataLocalService implements BriefDataService {
  fakeBriefBackend: Subject<any[]> = new Subject()
  fakeBriefBackendSubscription$: Subscription
  briefItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addBrief(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  updateBrief(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  removeBrief(item: { id: string }): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public getBriefs(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.briefItems
  }

  constructor() {
    this.fakeBriefBackendSubscription$ = this.fakeBriefBackend.subscribe(next =>
      this.briefItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeBriefBackend.next(briefs)
  }
}

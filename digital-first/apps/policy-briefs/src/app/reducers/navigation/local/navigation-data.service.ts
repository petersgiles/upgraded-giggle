import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs'

import { navigation } from './data'
import { NavigationDataService } from '../navigation-data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationDataLocalService implements NavigationDataService {
  fakeNavigationBackend: Subject<any[]> = new Subject()
  fakeNavigationBackendSubscription$: Subscription
  navigationItems: BehaviorSubject<any> = new BehaviorSubject(null)

  addNavigation(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  updateNavigation(item: any): Observable<any> {
    throw new Error('Method not implemented.')
  }
  removeNavigation(item: { id: string }): Observable<any> {
    throw new Error('Method not implemented.')
  }

  public getNavigations(): Observable<{
    data: any
    loading: boolean
  }> {
    return this.navigationItems
  }

  constructor() {
    this.fakeNavigationBackendSubscription$ = this.fakeNavigationBackend.subscribe(next =>
      this.navigationItems.next({
        data: next,
        loading: false
      })
    )

    this.fakeNavigationBackend.next(navigation)
  }
}

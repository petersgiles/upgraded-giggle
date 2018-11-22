import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { CommitmentDataService } from './services/commitment-data.service'
import { Observable, of, Subscription } from 'rxjs'
import { SideBarItem, AppUserProfile } from '@digital-first/df-layouts'
import { delay, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
  _profile: any
  profileSubscription$: Subscription
  _notification: string
  notificationSubscription$: Subscription

  get version(): string {
    return environment.version
  }

  get title(): string {
    return 'Election Commitments'
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([{
      caption: 'Settings',
      icon: 'settings',
      routerLink: ['/']
    }])
  }

  get notification$(): Observable<string> {
    return this.service.Notification
  }

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }
  constructor(private service: CommitmentDataService) {
  }
}
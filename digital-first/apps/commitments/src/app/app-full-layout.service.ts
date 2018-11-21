import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { CommitmentDataService } from './services/commitment-data.service'
import { Observable, of, Subscription } from 'rxjs'
import { SideBarItem, AppUserProfile } from '@digital-first/df-layouts'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService implements OnInit, OnDestroy {
  _profile: any
  profileSubscription$: Subscription

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

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }
  constructor(private service: CommitmentDataService) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}
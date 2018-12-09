import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { CommitmentDataService } from './services/commitment-data.service'
import { Observable, of, Subscription } from 'rxjs'
import { SideBarItem, AppUserProfile } from '@digital-first/df-layouts'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
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
      caption: 'Overview',
      icon: 'home',
      routerLink: ['/']
    }, {
      caption: 'Map Overview',
      icon: 'near_me',
      routerLink: ['/commitment', 'map']
    }, {
      divider: true
    }, {
      caption: 'About this App',
      icon: 'info',
      routerLink: ['/about']
    }])
  }

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return 'dismissible'
  }

  get drawOpen$(): Observable<boolean> {
    return this.service.getDrawState()
  }

  setDrawState(appdrawerOpen: any): any {
    return this.service.setDrawState(appdrawerOpen)
  }

  get notification$(): Observable<string> {
    return this.service.Notification
  }

  get open$(): Observable<boolean>  {
    return this.service.getBusy()
  }

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }
  constructor(private service: CommitmentDataService) {
  }
}
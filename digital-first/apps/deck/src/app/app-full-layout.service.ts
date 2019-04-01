import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { DeckDataService } from './services/deck-data.service'
import { Observable, of, Subscription } from 'rxjs'
import { SideBarItem, AppUserProfile, AppItem } from '@digital-first/df-layouts'

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
    return 'Deck'
  }

  get appItems$(): Observable<AppItem[]> {
    return of([
      {
        caption: 'Admin',
        icon: 'home',
        routerLink: ['/']
      },  {
        caption: 'Dashboard',
        icon: 'dashboard',
        routerLink: ['/']
      },  {
        caption: 'Settings',
        icon: 'settings',
        routerLink: ['/']
      },  {
        caption: 'Inbox',
        icon: 'all_inbox',
        routerLink: ['/']
      },  {
        caption: 'Calendar',
        icon: 'calendar_today',
        routerLink: ['/']
      }
    ])
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([
      {
        caption: 'Home',
        icon: 'home',
        routerLink: ['/']
      }
    ])
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

  get protectiveMarking$(): Observable<any> {
    return of('UNCLASSIFIED')
  }

  get open$(): Observable<boolean> {
    return this.service.getBusy()
  }

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }
  constructor(private service: DeckDataService) {}
}

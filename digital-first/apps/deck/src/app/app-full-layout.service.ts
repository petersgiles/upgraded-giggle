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
    return 'The Department of Bloop de Bloop - Yellow IGB - Home Deck'
  }

  get appItems$(): Observable<AppItem[]> {
    return of([
      {
        caption: 'Dashboard',
        icon: 'dashboard',
        url: '//vm-dev-lbs13/sites/redigb/SitePages/deck.aspx/deck'
      },  {
        caption: 'Activity',
        icon: 'timeline',
        url: '//vm-dev-lbs13/sites/redigb/SitePages/index.aspx/recent'
      },  {
        caption: 'Alerts',
        icon: 'notifications',
        url: '//vm-dev-lbs13/sites/redigb/SitePages/index.aspx/notifications'
      }, {
        caption: 'Permissions',
        icon: 'supervisor_account',
        url: '//vm-dev-lbs13/sites/redigb/_layouts/15/user.aspx',
        target: '_blank'
      },  {
        caption: 'Admin',
        icon: 'settings',
        url: '//vm-dev-lbs13/sites/redigb/SitePages/admin.aspx/admin'
      },
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

  get logo$(): Observable<any> { return of('assets/crest.png') }

  get homeUrl$(): Observable<any> { return of(['/']) }

  get open$(): Observable<boolean> {
    return this.service.getBusy()
  }

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }
  constructor(private service: DeckDataService) {}
}

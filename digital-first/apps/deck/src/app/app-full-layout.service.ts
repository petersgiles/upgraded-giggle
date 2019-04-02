import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { DeckDataService } from './services/deck-data.service'
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs'
import { SideBarItem, AppUserProfile, AppItem } from '@digital-first/df-layouts'
import { AppConfigService, Config, App, Logo } from './services/config.service'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
  _profile: any
  configSubscription$: Subscription
  appItems$: BehaviorSubject<App[]> = new BehaviorSubject(null)
  _title: string
  logo$: BehaviorSubject<Logo> = new BehaviorSubject(null)
  protectiveMarking$: BehaviorSubject<string> = new BehaviorSubject(null)
  bookType$: BehaviorSubject<string> = new BehaviorSubject(null)

  get version(): string {
    return environment.version
  }

  get title(): string {
    return this._title
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

  get open$(): Observable<boolean> {
    return this.service.getBusy()
  }

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }

  constructor(
    private service: DeckDataService,
    private configuration: AppConfigService
  ) {
    this.configSubscription$ = this.configuration.config.subscribe(c => {
      // tslint:disable-next-line:no-console
      console.log(c)
      this.appItems$.next(c.header.apps)
      this.logo$.next(c.header.logo)
      this._title = c.header.title
      this.bookType$.next(c.header.bookType)
      this.protectiveMarking$.next(c.header.classification)
    })
  }
}

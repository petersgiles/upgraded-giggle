import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs'
import { SideBarItem, AppUserProfile } from '@digital-first/df-layouts'
import { App, Logo } from '@digital-first/df-app-core'
import { Router } from '@angular/router'
import {
  AppState,
  selectAppConfigState,
  selectNotification,
  NotificationMessage,
  AppDataService
} from '@digital-first/df-app-core'

import { Store, select } from '@ngrx/store'
import { ToggleRefinerDrawer } from './reducers/refiner/refiner.actions'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
  _profile: any
  _title: string

  appItems$: BehaviorSubject<App[]> = new BehaviorSubject(null)
  bookType$: BehaviorSubject<string> = new BehaviorSubject(null)
  bookColour$: BehaviorSubject<string> = new BehaviorSubject(null)
  configSubscription$: Subscription
  logo$: BehaviorSubject<Logo> = new BehaviorSubject(null)
  protectiveMarking$: BehaviorSubject<string> = new BehaviorSubject(null)

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
      },
      {
        caption: 'Map',
        icon: 'place',
        routerLink: ['/map']
      },
      {
        caption: 'Overview',
        icon: 'table_chart',
        routerLink: ['/overview']
      },
      {
        caption: 'Planner',
        icon: 'calendar_today',
        routerLink: ['/planner']
      }
      // {
      //   caption: 'Display Order',
      //   icon: 'home',
      //   routerLink: ['/displayorder']
      // }
    ])
  }

  public handleAvatarClicked($event) {
    this.router.navigate(['/userprofile'])
  }

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return 'dismissible'
  }

  get drawOpen$(): Observable<boolean> {
    return of(null)
  }
  get showMenu(): boolean {
    return true
  }

  setDrawState(appdrawerOpen: any): any {
    this.store.dispatch(new ToggleRefinerDrawer(null))
  }

  get notification$(): Observable<NotificationMessage> {
    return this.store.pipe(select(selectNotification))
  }

  get open$(): Observable<boolean> {
    return this.service.getBusy()
  }

  get profile(): Observable<AppUserProfile> {
    return this.service.getCurrentUser()
  }

  constructor(
    private router: Router,
    private service: AppDataService,
    private store: Store<AppState>
  ) {
    this.configSubscription$ = this.store
      .pipe(select(selectAppConfigState))
      .subscribe(config => {
        this._title = config.header.title

        this.appItems$.next(config.header.apps)
        this.bookType$.next(config.header.bookType)
        this.bookColour$.next(config.header.bookColour)
        this.logo$.next(config.header.logo)
        this.protectiveMarking$.next(config.header.classification)
      })
  }
}

import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core'
import { Subject, Observable, Subscription, of } from 'rxjs'
import { Router, NavigationEnd } from '@angular/router'
import { takeUntil, filter, delay, tap, concatMap } from 'rxjs/operators'
import {
  FullLayoutService
} from './full-layout.service'
import { MdcTopAppBar } from '@angular-mdc/web'
import { AppUserProfile, SideBarItem } from '../models'

const SMALL_WIDTH_BREAKPOINT = 1240

@Component({
  selector: 'digital-first-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  drawOpen: boolean
  drawOpenSubscription$: Subscription
  protectiveMarking$: Observable<any>

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return this.service.drawerStyle || 'modal'
  }

  matcher: MediaQueryList
  private _destroy = new Subject<void>()
  _profile: AppUserProfile
  sidebarItems$: Observable<SideBarItem[]>
  notification$: Observable<string>
  open$: Observable<boolean>

  @ViewChild('topAppBar', { static: true }) topAppBar: MdcTopAppBar

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private service: FullLayoutService
  ) {}

  isScreenSmall(): boolean {
    return this.matcher.matches
  }

  get version(): string {
    return this.service.version
  }

  get title(): string {
    return this.service.title
  }

  get profile(): AppUserProfile {
    return this._profile
  }

  drawOpenToggleClicked(appdrawerOpen) {
    this.service.setDrawState(appdrawerOpen)
  }

  handleOpened($event: void) {
    this.service.setDrawState(true)
  }

  handleClosed($event: void) {
    this.service.setDrawState(false)
  }

  ngOnInit() {
    this.matcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
    this.matcher.addListener((event: MediaQueryListEvent) =>
      this.ngZone.run(() => event.matches)
    )

    this.router.events
      .pipe(
        takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(_ => {})

    this.service.profile.subscribe(p => {
      this._profile = p
    })

    this.drawOpenSubscription$ = this.service.drawOpen$.subscribe(
      p => (this.drawOpen = p)
    )
    this.sidebarItems$ = this.service.sidebarItems$
    this.notification$ = this.service.notification$.pipe(
      concatMap(result =>
        result ? of(result.message) : of(null).pipe(delay(2750))
      ),
      // tslint:disable-next-line:no-console
      tap(result => console.log(result))
    )

    this.protectiveMarking$ = this.service.protectiveMarking$

    this.open$ = this.service.open$
  }
  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
    this.drawOpenSubscription$.unsubscribe()
  }
}

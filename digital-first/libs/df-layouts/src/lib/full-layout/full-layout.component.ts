import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core'
import { Subject, Observable, Subscription, BehaviorSubject, interval, of } from 'rxjs'
import { Router, NavigationEnd } from '@angular/router'
import { takeUntil, filter, delay, tap, throttle, map, concatMap } from 'rxjs/operators'
import { FullLayoutService, AppUserProfile, SideBarItem } from './full-layout.service'

@Component({
  selector: 'digital-first-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  drawOpen: boolean
  drawOpenSubscription$: Subscription

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return this.service.drawerStyle || 'modal'
  }

  private _destroy = new Subject<void>()
  _profile: AppUserProfile
  sidebarItems$: Observable<SideBarItem[]>
  notification$: Observable<string>
  open$: Observable<boolean>

  constructor(
    private router: Router,
    private service: FullLayoutService
  ) { }

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

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd))
      .subscribe(_ => { })

    this.service.profile.subscribe(p => {
      this._profile = p
    })

    this.drawOpenSubscription$ = this.service.drawOpen$.subscribe(p => this.drawOpen = p)
    this.sidebarItems$ = this.service.sidebarItems$
    this.notification$ = this.service.notification$
      .pipe(
        concatMap(result => result ? of(result.message) : of(null).pipe(delay(2750))),
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
      )

    this.open$ = this.service.open$
  }
  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
    this.drawOpenSubscription$.unsubscribe()
  }
}

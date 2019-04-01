import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core'
import { Subject, Observable, Subscription, of } from 'rxjs'
import { Router, NavigationEnd } from '@angular/router'
import { takeUntil, filter, delay, tap, concatMap } from 'rxjs/operators'
import { TitleLayoutService } from './title-layout.service'
import { MdcTopAppBar } from '@angular-mdc/web'
import { AppUserProfile, SideBarItem } from '../models'

@Component({
  selector: 'digital-first-title-layout',
  templateUrl: './title-layout.component.html',
  styleUrls: ['./title-layout.component.scss']
})
export class TitleLayoutComponent implements OnInit, OnDestroy {
  protectiveMarking$: Observable<any>

  private _destroy = new Subject<void>()
  _profile: AppUserProfile
  sidebarItems$: Observable<SideBarItem[]>
  notification$: Observable<string>
  open$: Observable<boolean>

  @ViewChild('topAppBar') topAppBar: MdcTopAppBar
  appItems$: Observable<
    import('c:/Users/apgiles/Code/DF-Client/digital-first/libs/df-layouts/src/lib/models/index').AppItem[]
  >

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private service: TitleLayoutService
  ) {}

  get version(): string {
    return this.service.version
  }

  get title(): string {
    return this.service.title
  }

  get profile(): AppUserProfile {
    return this._profile
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(_ => {})

    this.service.profile.subscribe(p => {
      this._profile = p
    })

    this.sidebarItems$ = this.service.sidebarItems$
    this.appItems$ = this.service.appItems$
    this.notification$ = this.service.notification$.pipe(
      concatMap(result =>
        result ? of(result.message) : of(null).pipe(delay(2750))
      ),
      // tslint:disable-next-line:no-console
      tap(result => console.log(result))
    )

    this.protectiveMarking$ = this.service.protectiveMarking$
  }
  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}

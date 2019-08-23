import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { Router, NavigationEnd } from '@angular/router'
import { takeUntil, filter, delay, tap, concatMap } from 'rxjs/operators'
import { TitleLayoutService } from './title-layout.service'
import { AppUserProfile, SideBarItem, AppItem } from '../models'

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
  logo$: Observable<any>

  appItems$: Observable<AppItem[]>
  bookType$: Observable<string>
  bookColour$: Observable<string>
  constructor(private router: Router, private service: TitleLayoutService) {}

  get version(): string {
    return this.service.version
  }

  get title(): string {
    return this.service.title
  }

  get profile(): AppUserProfile {
    return this._profile
  }

  get showMenu():boolean{
    return this.service.showMenu
  }
  public handleNavMenuClicked($event: any) {
    this.service.setDrawState($event)
  }

  public handleAvatarClicked($event) {
    this.service.handleAvatarClicked($event)
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(_ => {})

    this.service.profile
      .pipe(tap(result => console.log(`👤 PROFILE`, result)))
      .subscribe(p => {
        this._profile = p
      })
    this.logo$ = this.service.logo$
    this.bookType$ = this.service.bookType$
    this.bookColour$ = this.service.bookColour$
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

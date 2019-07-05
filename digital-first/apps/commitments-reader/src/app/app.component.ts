import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router'
import { AppRouterService } from './services/app-router.service'
import { Store, select } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { MdcSnackbar } from '@angular-mdc/web'
import { filter } from 'rxjs/operators'
import {
  NotificationMessage,
  AppState,
  selectNotification
} from '@digital-first/df-app-core'
@Component({
  selector: 'digital-first-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Delivery Module'
  queryParamsSubscription: Subscription
  notificationsSubscription$: Subscription
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appRouter: AppRouterService,
    private snackbar: MdcSnackbar,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.appRouter.segments.next(events.url)
      }
    })

    this.notificationsSubscription$ = this.store
      .pipe(
        select(selectNotification),
        filter(notification => notification !== null)
      )
      .subscribe((notification: NotificationMessage) => {
        this.snackbar.open(notification.message, null)
      })
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe()
    }
    if (this.notificationsSubscription$) {
      this.notificationsSubscription$.unsubscribe()
    }
  }
}

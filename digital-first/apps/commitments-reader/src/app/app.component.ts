import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core'
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router'
import { AppRouterService } from './services/app-router.service'
import { Store } from '@ngrx/store'
import * as fromRoot from './reducers/index'
import { StartAppInitialiser } from './reducers/app/app.actions'
import { SettingsService } from './services/settings.service'
import { Subscription } from 'rxjs'
@Component({
  selector: 'digital-first-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Commitments Reader'
  queryParamsSubscription: Subscription
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appRouter: AppRouterService
  ) {}

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe()
    }
  }

  ngOnInit() {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.appRouter.segments.next(events.url)
      }
    })
  }
}

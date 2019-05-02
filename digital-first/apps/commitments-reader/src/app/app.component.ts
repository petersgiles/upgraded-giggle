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
@Component({
  selector: 'digital-first-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Commitments Reader'
  constructor(
    private router: Router,
    private appRouter: AppRouterService,
    private settings: SettingsService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.store.dispatch(
      new StartAppInitialiser({ environment: this.settings.environment })
    )

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.appRouter.segments.next(events.url)
      }
    })
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router'
import { AppRouterService } from './services/app-router.service'

@Component({
  selector: 'digital-first-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Commitments Reader'
  constructor(private router: Router, private appRouter: AppRouterService) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.appRouter.segments.next(events.url)
      }
    })
  }
}

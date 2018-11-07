import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { LoggerService } from '@digital-first/df-logging'

@Component({
  selector: 'digital-first-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'policy-briefs'

  constructor(private router: Router, private logger: LoggerService) {}

  ngOnInit() {
    this.logger.info('Logging from app component')
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return
      }
      window.scrollTo(0, 0)
    })
  }

  ngOnDestroy(): void {}
}

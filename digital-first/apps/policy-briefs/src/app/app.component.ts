import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'digital-first-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'policy-briefs'

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return
      }
      window.scrollTo(0, 0)
    })
  }

  ngOnDestroy(): void {
  }

}

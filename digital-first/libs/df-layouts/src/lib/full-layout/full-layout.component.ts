import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { Subject } from 'rxjs'
import { Router, NavigationEnd } from '@angular/router'
import { takeUntil, filter } from 'rxjs/operators'
import { FullLayoutService } from './full-layout.service'

@Component({
  selector: 'digital-first-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  private _destroy = new Subject<void>()

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

  ngOnInit() {
    this.router.events
    .pipe(takeUntil(this._destroy),
      filter(event => event instanceof NavigationEnd))
    .subscribe(_ => { })
  }
  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}

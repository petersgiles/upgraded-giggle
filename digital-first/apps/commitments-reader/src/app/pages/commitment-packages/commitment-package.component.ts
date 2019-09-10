import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'digital-first-commitment-package',
  templateUrl: './commitment-package.component.html',
  styleUrls: ['./commitment-package.component.scss']
})
export class CommitmentPackageComponent implements OnInit, OnDestroy {
  _commitment: number
  megaTags$: any

  commitmentSubscription$: Subscription
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
  }
}

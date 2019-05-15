import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import * as indef from 'indefinite'
import { Subscription, Observable } from 'rxjs'
import { MapPoint } from '@digital-first/df-map'

import { Commitment } from '../../models'
@Component({
  selector: 'digital-first-commitment-lib',
  templateUrl: './commitment.component.html'
})
export class CommitmentComponent implements OnInit, OnDestroy {
  _commitment: Commitment
  commitmentPortfoliosSubscription$: Subscription
  commitmentPackageSubscription$: Subscription
  mapPoint$: Observable<MapPoint[]>

  @Input()
  set commitment(val: Commitment) {
    this._commitment = val
    if (val) {
      // this.cpsservice.getPortfoliosByCommitment(val.id)
    }
  }

  get commitment() {
    return this._commitment
  }
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.commitmentPortfoliosSubscription$.unsubscribe()
    this.commitmentPackageSubscription$.unsubscribe()
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

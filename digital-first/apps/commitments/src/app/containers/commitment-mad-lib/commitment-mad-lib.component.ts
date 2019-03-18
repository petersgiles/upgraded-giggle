import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import * as indef from 'indefinite'
import { CommitmentPortfolioService } from '../../reducers/commitment-portfolio/commitment-portfolio.service'
import { Commitment } from '../../reducers'
import { Portfolio, PackageType } from '../../models'
import { Subscription, Observable } from 'rxjs'
import { DeliveryLocationService } from '../../reducers/commitment-delivery-location/commitment-delivery-location.service'
import { Electorate } from '../../models'
import { MapPoint } from '@digital-first/df-map'
import { CommitmentPackageService } from '../../reducers/commitment-package/commitment-package.service';
import { CommitmentThemeService } from '../../reducers/commitment-theme/commitment-theme.service';

@Component({
  selector: 'digital-first-commitment-mad-lib',
  templateUrl: './commitment-mad-lib.component.html',
  styleUrls: ['./commitment-mad-lib.component.scss']
})
export class CommitmentMadLibComponent implements OnInit, OnDestroy {

  _commitment: Commitment
  commitmentPortfoliosSubscription$: Subscription
  commitmentThemeSubscription$: Subscription
  commitmentPackageSubscription$: Subscription
  relatedPortfolios: Portfolio[]
  relatedPackages$: PackageType[]
  mapPoint$: Observable<MapPoint[]>
  electorate$: Observable<Electorate[]>

  @Input()
  set commitment(val: Commitment) {
    this._commitment = val
    if (val) {
      this.cpsservice.getPortfoliosByCommitment(val.id)
    }
  }

  get commitment() {
    return this._commitment
  }
  constructor(
    private cpsservice: CommitmentPortfolioService,
    private dlsservice: DeliveryLocationService,
    private packageService: CommitmentPackageService
    ) {}

  ngOnInit() {
    this.commitmentPortfoliosSubscription$ = this.cpsservice.CommitmentPortfolios.subscribe(
      next => {
        this.relatedPortfolios = next || []
      }
    )

    this.commitmentPackageSubscription$ = this.packageService.CommitmentPackages.subscribe(
      next => {
        this.relatedPackages$ = next || []
      }
    )


    this.mapPoint$ = this.dlsservice.MapPoints
    this.electorate$ = this.dlsservice.Electorates
  }

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

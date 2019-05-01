import { Component, OnInit, OnDestroy } from '@angular/core'
import { GetCommitmentDetailGQL } from '../../generated/graphql'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { AppConfigService } from '../../services/app-config.service'

@Component({
  selector: 'digital-first-commitment-package',
  templateUrl: './commitment-package.component.html',
  styleUrls: ['./commitment-package.component.scss']
})
export class CommitmentPackageComponent implements OnInit, OnDestroy {
  _commitment: number
  megaTags$: any;

  commitmentSubscription$: Subscription
 // public commitment: ICommitment
  constructor(
    private getCommitmentDetailGQL: GetCommitmentDetailGQL,
    private route: ActivatedRoute,
    private appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id')
    // override for setup
    //this.loadCommitment(id)
  }

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
  }
}

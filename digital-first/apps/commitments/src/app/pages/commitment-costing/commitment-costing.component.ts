import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Location } from '@angular/common'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { map } from 'rxjs/operators'
import { Subscription, Observable } from 'rxjs'
import { formatCommitmentTitle } from '../../formatters'
import { Commitment } from '../../reducers'
import { Portfolio } from '../../models'

@Component({
  selector: 'digital-first-commitment-costing',
  templateUrl: './commitment-costing.component.html',
  styleUrls: ['./commitment-costing.component.scss']
})
export class CommitmentCostingComponent implements OnInit, OnDestroy {
  paramsSubscription$: any
  commitment: Commitment
  commitmentSubscription$: Subscription
  activitySubscription$: Subscription
  formBusy: boolean
  portfolios$: Observable<Portfolio[]>

  constructor(private router: Router, private location: Location, private route: ActivatedRoute, public dialog: MdcDialog, private snackbar: MdcSnackbar,
    private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  getTitle(commitment) {
    return `${formatCommitmentTitle(commitment)} Costing`
  }

  handleGoBack($event) {
    this.location.back()
  }

  ngOnInit() {

    this.service.getAllCommitments()
    this.portfolios$ = this.lookup.Portfolios
    this.commitmentSubscription$ = this.service.Commitment.subscribe(
      next => { this.commitment = next },
      error => this.showSnackBar(error)
    )

    this.activitySubscription$ = this.service.Notification
      .subscribe(
        (next: any) => {
          if (next) {
            this.formBusy = false
            this.showSnackBar(next.message)
          }
        },
        error => this.showSnackBar(error)
      )

    this.paramsSubscription$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => ({
          commitment: +params.get('id'),
          costing: +params.get('costid'),
        })),
        map((params) => {

          this.service.setCurrentCommitment(params.commitment)
        }),
      )
      .subscribe()

  }

  ngOnDestroy(): void {
    this.paramsSubscription$.unsubscribe()
    this.activitySubscription$.unsubscribe()
    this.commitmentSubscription$.unsubscribe()
  }

  showSnackBar(message: string, action: string = 'OK'): void {

    // this is to avoid component validation check errors
    setTimeout(() => {
      const snackbarRef = this.snackbar.show(message, action, {
        align: 'center',
        multiline: false,
        dismissOnAction: false,
        focusAction: false,
        actionOnBottom: false,
      })

      snackbarRef.afterDismiss().subscribe(() => {

      })
    })
  }

}

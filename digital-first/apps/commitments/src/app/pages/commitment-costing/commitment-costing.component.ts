import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Location } from '@angular/common'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { map } from 'rxjs/operators'
import { Subscription, Observable } from 'rxjs'
import { formatCommitmentTitle } from '../../formatters'
import { Commitment } from '../../reducers'
import { Portfolio } from '../../models'
import { showSnackBar } from '../../dialogs/showSnackBar'
import { FormBuilder } from '@angular/forms'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'

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
    private lookup: CommitmentLookupService, private fb: FormBuilder) { }

  form = this.fb.group({
    id: [],
    description: [''],
    portfolio: [null],
  })

  getTitle(commitment) {
    return `${formatCommitmentTitle(commitment)} Costing`
  }

  handleGoBack($event) {
    this.location.back()
  }

  ngOnInit() {

    this.portfolios$ = this.lookup.Portfolios

    this.activitySubscription$ = this.service.Notification
      .subscribe(
        (next: any) => {
          if (next) {
            this.formBusy = false
            showSnackBar(this.snackbar, next.message)
          }
        },
        error => showSnackBar(this.snackbar, error)
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

    this.lookup.getAllPortfolios()

  }

  ngOnDestroy(): void {
    this.paramsSubscription$.unsubscribe()
    this.activitySubscription$.unsubscribe()
    // this.commitmentSubscription$.unsubscribe()
  }
}

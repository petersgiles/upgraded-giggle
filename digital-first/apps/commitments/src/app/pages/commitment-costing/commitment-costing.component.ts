import { LoggerService } from '@digital-first/df-logging'
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
import { showSnackBar } from '../../dialogs/show-snack-bar'
import { FormBuilder, Validators } from '@angular/forms'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { CommitmentActionService } from '../../reducers/commitment-action/commitment-action.service'

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
  currentActionSubscription$: Subscription

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MdcDialog,
    private snackbar: MdcSnackbar,
    private service: CommitmentDataService,
    private lookup: CommitmentLookupService,
    private actionService: CommitmentActionService,
    private fb: FormBuilder,
    private logger: LoggerService
  ) {}

  form = this.fb.group({
    id: [],
    commitment: [null, Validators.required],
    description: ['', Validators.required],
    costing: [null, [Validators.required, Validators.min(0)]],
    portfolio: [null, Validators.required],
    revenueType: [null, Validators.required]

  })

  getTitle(commitment) {
    return `${formatCommitmentTitle(commitment)} Costing`
  }

  handleGoBack($event) {
    this.location.back()
  }

  ngOnInit() {
    this.currentActionSubscription$ = this.actionService.CurrentAction.subscribe(
      next => {
        let patch = {
          id: null,
          title: null,
          description: null,
          costing: null,
          portfolio: null,
          revenueType: null
        }

        if (next) {
          patch = {
            id: next.id,
            title: next.title,
            description: next.description,
            costing: next.costing,
            portfolio: next.portfolio && next.portfolio.id,
            revenueType: next.revenueType,
          }
        }
        this.form.patchValue(patch)
      }
      // error => showSnackBar(this.snackbar, error)
    )

    this.commitmentSubscription$ = this.service.Commitment.subscribe(
      next => {
        this.commitment = next
      },
      error => showSnackBar(this.snackbar, error)
    )

    this.portfolios$ = this.lookup.Portfolios

    this.activitySubscription$ = this.service.Notification.subscribe(
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
          costing: params.get('costid')
        }))
      )
      .subscribe(params => {
        this.service.setCurrentCommitment(params.commitment)
        this.actionService.setCurrentCommitmentAction(
          params.commitment,
          params.costing
        )

        const patch = {
          commitment: params.commitment
        }

        this.form.patchValue(patch)
      })

    this.lookup.getAllPortfolios()
  }

  ngOnDestroy(): void {
    this.paramsSubscription$.unsubscribe()
    this.activitySubscription$.unsubscribe()
    this.commitmentSubscription$.unsubscribe()
    this.currentActionSubscription$.unsubscribe()
  }

  handleSubmit($event) {
    this.actionService.addActionToCommitment(
      this.commitment.id,
      this.form.value
    )
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { DataTableConfig } from '@digital-first/df-components'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'

@Component({
  selector: 'digital-first-commitment-overview',
  templateUrl: './commitment-overview.component.html',
  styleUrls: ['./commitment-overview.component.scss']
})
export class CommitmentOverviewComponent implements OnInit, OnDestroy {

  commitments$: Observable<Commitment[]>
  activity$: Observable<any>
  pageFormat: 'card' | 'list' | 'table' = 'table'
  refinerGroups$: Observable<any>
  commitmentsTableData$: Observable<DataTableConfig>
  activitySubscription$: Subscription
  formBusy = false

  constructor(private snackbar: MdcSnackbar, public dialog: MdcDialog, private router: Router, private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  ngOnInit() {
    this.commitments$ = this.service.Commitments
    this.commitmentsTableData$ = this.service.CommitmentDataTable
    this.refinerGroups$ = this.service.RefinerGroups
    this.activity$ = this.service.CommitmentActivity

    this.lookup.getAllWhoAnnouncedTypes()
    this.lookup.getAllAnnouncementTypes()
    this.lookup.getAllCommitmentTypes()
    this.lookup.getAllCriticalDates()
    this.lookup.getAllLocations()
    this.lookup.getAllPartys()
    this.lookup.getAllPortfolios()

    this.service.getAllCommitments()

    this.activitySubscription$ = this.service.Notification
      // .pipe(
      //   delay(2000)
      // )
      .subscribe(
        (next: any) => {
          if (next) {
            this.formBusy = false
            this.showSnackBar(next.message)
          }
        },
        error => this.showSnackBar(error)
      )
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

  ngOnDestroy(): void {
    this.activitySubscription$.unsubscribe()
  }

  handleEdit(commitment?: Commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  handleCreate() {
    this.router.navigate(['/', 'commitment', 'create'])
  }

  handleCommitmentsRowClicked(commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  handleShare(commitment?: Commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  handleRefinerGroupSelected(refiner) {
    if (refiner.expanded) {
      this.service.collapseRefinerGroup(refiner)
    } else {
      this.service.expandRefinerGroup(refiner)
    }
  }

  handleRefinerSelected(refiner) {
    if (refiner.selected) {
      this.service.removeRefiner(refiner)
    } else {
      this.service.addRefiner(refiner)
    }
  }

  handleSearchCriteriaChanged(text) {
    this.service.setTextRefiner(text)
  }

  changePageFormat(format) {
    this.pageFormat = format
  }
}
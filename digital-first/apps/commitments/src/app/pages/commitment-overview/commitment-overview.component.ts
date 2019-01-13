import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { DataTableConfig } from '@digital-first/df-components'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { showSnackBar } from '../../dialogs/show-snack-bar'
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
  commitmentsTableDataSubscription$: Subscription
  pageIndex: number
  dataTableConfig: DataTableConfig
  dataTableRows: any[] = []
  pagedDataTableRows: any[] = []

  activitySubscription$: Subscription
  formBusy = false
  pageSize: number

  constructor(private snackbar: MdcSnackbar, public dialog: MdcDialog, private router: Router, private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  ngOnInit() {
    this.commitments$ = this.service.Commitments
    this.commitmentsTableDataSubscription$ = this.service.CommitmentDataTable
    .subscribe(config => {
      this.pageIndex = 0
      this.pageSize = 10
      this.dataTableConfig = config
      this.dataTableRows = config.rows
      this.pageRows()
    }

    )
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
            showSnackBar(this.snackbar, next.message)

          }
        },
        error => showSnackBar(this.snackbar, error)
      )
  }

  handlePage($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
    this.pageIndex = $event.pageIndex
    this.pageRows()
  }

  pageRows() {

    const skip = this.pageIndex * this.pageSize
    const take =  skip + this.pageSize

    this.pagedDataTableRows = (this.dataTableRows || []).slice(skip, take)

    // tslint:disable-next-line:no-console
    console.log(skip, take, this.pagedDataTableRows, this.dataTableRows)
  }

  ngOnDestroy(): void {
    this.activitySubscription$.unsubscribe()
    this.commitmentsTableDataSubscription$.unsubscribe()
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
import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { DataTableConfig } from '@digital-first/df-datatable'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { showSnackBar } from '../../dialogs/show-snack-bar'
import { ExcelService } from '../../services/excel.service'
import { DateFormatPipe } from '@digital-first/df-moment'
import { LoggerService } from '@digital-first/df-logging'
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
  pageIndex: number
  dataTableConfig: DataTableConfig
  dataTableRows: any[] = []
  pagedDataTableRows: any[] = []

  activitySubscription$: Subscription
  formBusy = false
  pageSize: number
  commitmentsFilteredSubscription$: Subscription
  filteredCommitments: any
  columns: { prop: string; name: string }[]
  commitmentsTableData$: Observable<any>

  constructor(
    private snackbar: MdcSnackbar,
    public dialog: MdcDialog,
    private router: Router,
    private service: CommitmentDataService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.commitments$ = this.service.Commitments

    this.commitmentsFilteredSubscription$ = this.service.CommitmentFiltered.subscribe(
      fc => (this.filteredCommitments = fc)
    )

    this.columns = [
      { prop: 'commitmentId', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'commitmentType', name: 'Type of Commitment' },
      { prop: 'criticalDate', name: 'Critical Date' }
    ]

    this.commitmentsTableData$ = this.service.CommitmentDataTable
    this.refinerGroups$ = this.service.RefinerGroups
    this.activity$ = this.service.CommitmentActivity

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
    this.pageIndex = $event.pageIndex
    this.pageRows()
  }

  pageRows() {
    const skip = this.pageIndex * this.pageSize
    const take = skip + this.pageSize

    this.pagedDataTableRows = (this.dataTableRows || []).slice(skip, take)
  }

  handleFilter($event: any) {
    const val = $event.target.value.toLowerCase()

    // filterFruits(val)
  }

  ngOnDestroy(): void {
    this.activitySubscription$.unsubscribe()
  }

  handleEdit(commitment?: Commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  // handleClearAllFilters() {
  //   this.service.clearAllRefiners()
  // }

  // handleCreate() {
  //   this.router.navigate(['/', 'commitment', 'create'])
  // }

  handleCommitmentsRowClicked(commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  handleCommitmentsCellHeadingClicked($event) {
    this.service.sortByColumn($event)
  }

  handleShare(commitment?: Commitment) {
    this.router.navigate(['/', 'commitment', commitment.id])
  }

  handleExport() {
    const exportCommitments = this.filteredCommitments.map(fc => ({
      Id: fc.commitmentId,
      Title: fc.title,
      Party: fc.party ? fc.party.title : '',
      'Responsible Portfolio': fc.portfolio ? fc.portfolio.title : '',
      'Type of Commitment': fc.commitmentType ? fc.commitmentType.title : '',
      'Critical Date': fc.criticalDate ? fc.criticalDate.title : ''
    }))

    this.excelService.exportAsExcelFile(exportCommitments, 'commitments')
  }

  changePageFormat(format) {
    this.pageFormat = format
  }
}

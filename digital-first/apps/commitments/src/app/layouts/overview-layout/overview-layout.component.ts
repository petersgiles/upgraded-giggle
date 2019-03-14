import { Component, OnInit } from '@angular/core'
import { MdcSnackbar, MdcDialog } from '@angular-mdc/web'
import { Router } from '@angular/router'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { ExcelService } from '../../services/excel.service'
import { DateFormatPipe } from '@digital-first/df-moment'
import { LoggerService } from '@digital-first/df-logging'

@Component({
  selector: 'digital-first-overview-layout',
  templateUrl: './overview-layout.component.html',
  styleUrls: ['./overview-layout.component.scss']
})
export class OverviewLayoutComponent implements OnInit {
  refinerGroups$: any
  commitmentsFilteredSubscription$: any
  filteredCommitments: any
  constructor(
    private snackbar: MdcSnackbar,
    public dialog: MdcDialog,
    private router: Router,
    private service: CommitmentDataService,
    private lookup: CommitmentLookupService,
    private excelService: ExcelService,
    private dateFormat: DateFormatPipe,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.refinerGroups$ = this.service.RefinerGroups
    this.commitmentsFilteredSubscription$ = this.service.CommitmentFiltered.subscribe(
      fc => (this.filteredCommitments = fc)
    )
  }

  handleClearAllFilters() {
    this.service.setTextRefiner(null)
    this.service.clearAllRefiners()
  }

  handleCreate() {
    this.router.navigate(['/', 'commitment', 'create'])
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
}

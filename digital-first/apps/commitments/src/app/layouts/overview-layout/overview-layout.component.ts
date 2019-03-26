import { Component, OnInit } from '@angular/core'
import { MdcSnackbar, MdcDialog } from '@angular-mdc/web'
import { Router } from '@angular/router'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { ExcelService } from '../../services/excel.service'
import { DateFormatPipe } from '@digital-first/df-moment'
import { LoggerService } from '@digital-first/df-logging'
import { BehaviorSubject } from 'rxjs'
import { RefinerActionService } from '@digital-first/df-refiner'

@Component({
  selector: 'digital-first-overview-layout',
  templateUrl: './overview-layout.component.html',
  styleUrls: ['./overview-layout.component.scss']
})
export class OverviewLayoutComponent implements OnInit {
  refinerGroups$: any
  commitmentsFilteredSubscription$: any
  filteredCommitments: any
  searchText$: BehaviorSubject<string> = new BehaviorSubject(null)

  constructor(
    public dialog: MdcDialog,
    private router: Router,
    private service: CommitmentDataService,
    private excelService: ExcelService,
    private refinerAction: RefinerActionService,
    private lookup: CommitmentLookupService,
  ) {}

  ngOnInit() {
    this.lookup.getAllWhoAnnouncedTypes()
    this.lookup.getAllAnnouncementTypes()
    this.lookup.getAllCommitmentTypes()
    this.lookup.getAllCriticalDates()
    this.lookup.getAllLocations()
    this.lookup.getAllPartys()
    this.lookup.getAllPortfolios()
    this.lookup.getAllThemeTypes()
    this.lookup.getAllPackageTypes()
    this.lookup.getAllStatuses()
    this.lookup.getAllCommitmentPortfolios()
    this.lookup.getAllCommitmentPackages()
    this.lookup.getAllCommitmentElectorates()
    this.lookup.getAllCommitmentContacts()
    this.lookup.getAllCommitmentMapPoints()
    this.service.getAllContacts();

    this.refinerGroups$ = this.service.RefinerGroups
    this.commitmentsFilteredSubscription$ = this.service.CommitmentFiltered.subscribe(
      fc => (this.filteredCommitments = fc)
    )
  }

  handleClearAllFilters() {
    this.refinerAction.message.next('search')
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
      Cost: fc.cost ? fc.cost : '',
      Location: fc.location ? fc.location.title : '',
      'Announced by': fc.announcedBy ? fc.announcedBy: '',
      'Responsible Portfolio': fc.portfolio ? fc.portfolio.title : '',
      'Type of Announcement': fc.announcementType ? fc.announcementType.title : '',
      'Type of Who Announced': fc.whoAnnouncedType ? fc.whoAnnouncedType.title : '',
      'Type of Commitment': fc.commitmentType ? fc.commitmentType.title : '',
      'Critical Date': fc.criticalDate ? fc.criticalDate.title : '',
       Packages: fc.packages && fc.packages ? fc.packages.join() : '',
      'Costing Required': fc.costingRequired ? fc.costingRequired : '',
       Status: fc.status ? fc.status.title: '',
      'Related Portfolios': fc.portfolios &&  fc.portfolios.length ? fc.portfolios.join() : '',
      'Related Electorates': fc.electorates &&  fc.electorates.length ? fc.electorates.join() : '',
       Contacts: fc.contacts &&  fc.contacts.length ? fc.contacts.join() : ''    
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

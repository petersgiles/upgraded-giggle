import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as jsPDF from 'jspdf'
import { Commitment } from '../../reducers'
import { Subscription, Observable } from 'rxjs'
import {
  WhoAnnouncedType,
  AnnouncementType,
  CommitmentType,
  CriticalDate,
  Party,
  Portfolio
} from '../../models'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { arrayToIndex } from '@df/utils'
import { map } from 'rxjs/operators'
import { showSnackBar } from '../../dialogs/show-snack-bar'
import { Location } from '@angular/common'


@Component({
  selector: 'digital-first-commitment-print',
  templateUrl: './commitment-print.component.html',
  styleUrls: ['./commitment-print.component.scss']
})
export class CommitmentPrintComponent implements OnInit {
  commitment: Commitment
  commitmentSubscription$: Subscription
  commitmentEditExpandedPanelsSubscription$: Subscription
  activitySubscription$: Subscription
  user$: any

  currentComments$: Observable<Comment[]>
  selectId$: Subscription
  whoAnnouncedTypes$: Observable<WhoAnnouncedType[]>

  announcementTypes$: Observable<AnnouncementType[]>
  commitmentTypes$: Observable<CommitmentType[]>
  commitmentContactsTableData$: Observable<DataTableConfig>
  commitmentCommitmentsTableData$: Observable<DataTableConfig>

  criticalDates$: Observable<CriticalDate[]>
  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  electorates$: Observable<Location[]>
  selectedElectorateIds: Location[] = []
  activeComment: any
  timeFormat: 'timeAgo' | 'dateFormat' | 'calendar'

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MdcDialog,
    private snackbar: MdcSnackbar,
    private service: CommitmentDataService,
    private lookup: CommitmentLookupService,
    
  ) {}

  @ViewChild('htmlpdfwrapper', { static: false })
  public htmlpdfwrapperElementRef: ElementRef

  ngOnInit(): void {
    this.commitmentContactsTableData$ = this.service.CommitmentContactsTableData
    this.commitmentCommitmentsTableData$ = this.service.RelatedCommitmentsTableData

    this.commitmentSubscription$ = this.service.Commitment.subscribe(
      next => {
        this.commitment = next
        this.selectedElectorateIds = this.commitment
          ? arrayToIndex(this.commitment.electorates)
          : []
      },
      error => showSnackBar(this.snackbar, error)
    )

    this.activitySubscription$ = this.service.Notification.subscribe(
      (next: any) => {
        if (next) {
          showSnackBar(this.snackbar, next.message)
        }
      },
      error => showSnackBar(this.snackbar, error)
    )

    this.service.getAllCommitments()
    this.service.getAllContacts()

    this.lookup.getAllWhoAnnouncedTypes()
    this.lookup.getAllAnnouncementTypes()
    this.lookup.getAllCriticalDates()
    this.lookup.getAllCommitmentTypes()
    this.lookup.getAllLocations()
    this.lookup.getAllPartys()
    this.lookup.getAllPortfolios()
    this.lookup.getAllPackageTypes()

    this.user$ = this.service.getCurrentUser()

    this.selectId$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => +params.get('id')),
        map(selectedId => {
          this.service.setCurrentCommitment(selectedId)
        })
      )
      .subscribe()
  }

  handlePrintClicked() {
    const doc = new jsPDF()
    const html = this.htmlpdfwrapperElementRef.nativeElement
    doc.fromHTML(html, 15, 15, {
      width: 170
    })
    const filename = `${this.commitment.title.split(' ').join('-')}.pdf`
    // Set the document to automatically print via JS
    doc.save(filename)
  }

  handleGoBack($event) {
    this.location.back()
  }
}

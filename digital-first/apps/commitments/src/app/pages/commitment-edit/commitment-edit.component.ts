import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, Subscription, of } from 'rxjs'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { map } from 'rxjs/operators'
import { CommitmentDataService } from '../../services/commitment-data.service'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'

import { AnnouncementType } from '../../models/announcement-type.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { DataTableConfig } from '@digital-first/df-datatable'
import { arrayToIndex } from '@digital-first/df-utils'
import { CriticalDate } from '../../models/critical-date.model'
import { formatCommitmentTitle, formatCommitmentId } from '../../formatters'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { showSnackBar } from '../../dialogs/show-snack-bar'
import { PackageType, ThemeType } from '../../models'
import { OPERATION_COMMITMENT } from '../../services/app-data.service'

@Component({
  selector: 'digital-first-commitment-edit',
  templateUrl: './commitment-edit.component.html',
  styleUrls: ['./commitment-edit.component.scss']
})
export class CommitmentEditComponent implements OnInit, OnDestroy {

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

  themeTypes$: Observable<ThemeType[]>
  packageTypes$: Observable<PackageType[]>
  criticalDates$: Observable<CriticalDate[]>
  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  selectedElectorateIds: Location[] = []
  activeComment: any
  timeFormat: 'timeAgo' | 'dateFormat' | 'calendar'

  panels: {
    commitmentPanelExpanded?: boolean
  } = {
      commitmentPanelExpanded: true,
    }

  formBusy = false
  isSubscribed$: Observable<boolean>
  autoSave: boolean
  autoSaveSubscription$: Subscription
  userOperation$: Observable<any>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MdcDialog,
    private snackbar: MdcSnackbar,
    private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  ngOnInit(): void {

    this.userOperation$ = this.service.UserOperation

    this.whoAnnouncedTypes$ = this.lookup.WhoAnnouncedTypes
    this.announcementTypes$ = this.lookup.AnnouncementTypes
    this.criticalDates$ = this.lookup.CriticalDates
    this.commitmentTypes$ = this.lookup.CommitmentTypes
    this.themeTypes$ = this.lookup.ThemeTypes
    this.packageTypes$ = this.lookup.PackageTypes
    this.parties$ = this.lookup.Parties
    this.portfolios$ = this.lookup.Portfolios

    this.autoSaveSubscription$ = this.service.CommitmentEditAutosave.subscribe(next => this.autoSave = next)

    this.commitmentSubscription$ = this.service.Commitment.subscribe(
      next => {
        this.commitment = next
        this.selectedElectorateIds = this.commitment ? arrayToIndex(this.commitment.electorates) : []
      },
      error => showSnackBar(this.snackbar, error)
    )

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

    this.commitmentEditExpandedPanelsSubscription$ = this.service.CommitmentEditExpandedPanels.subscribe(
      next => {
        this.panels = next.reduce((a, i) => {
          a[i] = true
          return a
        }, {
            commitmentPanelExpanded: false,
            discussionPanelExpanded: false,
            contactPanelExpanded: false,
            formPanelExpanded: false,
            mapPanelExpanded: false
          })
      }
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
    this.lookup.getAllThemeTypes()
    this.lookup.getAllPackageTypes()

    this.user$ = this.service.getCurrentUser()

    this.selectId$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => +params.get('id')),
        map((selectedId) => {
          this.user$.subscribe(user => {
            this.service.getUserSubscriptionStatus(selectedId, user.userid)
          })
          this.service.setCurrentCommitment(selectedId)
        }),
      )
      .subscribe()
    this.isSubscribed$ = this.service.CommitmentSubscription
  }

  getRight(operations: any) {
    return operations[OPERATION_COMMITMENT]
  }

  getTitle(commitment) {
    return `${formatCommitmentId(commitment)} - ${formatCommitmentTitle(commitment)}`
  }

  ngOnDestroy(): void {
    this.selectId$.unsubscribe()
    this.commitmentSubscription$.unsubscribe()

    this.commitmentEditExpandedPanelsSubscription$.unsubscribe()
    this.activitySubscription$.unsubscribe()
  }

  handleManageSubscription($event) {
    this.isSubscribed$ = of($event)
    this.user$.subscribe(user => {
      const userId = user.userid
      if ($event) {
        this.service.subscribeToCommitment(this.commitment.id, userId)
      }
      else {
        this.service.unsubscibeFromCommitment(this.commitment.id, userId)
      }
    })
  }

  handleChangeExpanded($event, panel) {

    if ($event) {
      this.service.expandCommitmentEditPanel(panel)
    } else {
      this.service.collapseCommitmentEditPanel(panel)
    }

  }

  handleUpdateCommitmentChange(commitment) {
    if (this.autoSave) {
      this.handleUpdateCommitment(commitment)
    }
  }

  handleUpdateCommitment(commitment) {
    this.formBusy = true
    this.service.upsertCommitment(commitment)
  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }

  changeDateFormat(format) {
    this.service.changeCommitmentEditDiscussionTimeFormat(format)
  }

  handleTabScroll(el) {
    el.scrollIntoView()
    window.scrollBy(0, -128)
  }

  handleMailClicked(contact) {
    const mailText = `mailto:${contact}?subject=${this.commitment.title}&body=`
    window.location.href = mailText
  }

  handleAutosaveClicked(autosaveState) {

    this.service.changeCommitmentEditAutosave(autosaveState)

    const message = `AutoSave ${autosaveState ? 'On' : 'Off - Submit at bottom of form'}`

    showSnackBar(this.snackbar, message)
  }

  handlePrintClicked() {
    this.router.navigate(['/', 'commitment', this.commitment.id, 'print'])
  }

}

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, Subscription, of } from 'rxjs'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { map, first } from 'rxjs/operators'
import { DialogAreYouSureComponent, DialogAddContactComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'

import { CommitmentDataService } from '../../services/commitment-data.service'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { Location } from '../../models/location.model'
import { AnnouncementType } from '../../models/announcement-type.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { DataTableConfig } from '@digital-first/df-components'
import { arrayToIndex } from '@digital-first/df-utils'
import { CriticalDate } from '../../models/critical-date.model'
import { formatCommitmentTitle } from '../../formatters'
import { DialogAddCommitmentComponent } from '../../dialogs/dialog-add-commitment.component'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'

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

  panels: {
    commitmentPanelExpanded?: boolean
    relatedPanelExpanded?: boolean
    discussionPanelExpanded?: boolean
    contactPanelExpanded?: boolean
    formPanelExpanded?: boolean
    mapPanelExpanded?: boolean
    relatedItemsPanelExpanded?: boolean
  } = {
      commitmentPanelExpanded: true,
      relatedPanelExpanded: false,
      discussionPanelExpanded: false,
      contactPanelExpanded: false,
      formPanelExpanded: false,
      mapPanelExpanded: false,
      relatedItemsPanelExpanded: false,
    }

  formBusy = false
  isSubscribed$: Observable<boolean>

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MdcDialog, private snackbar: MdcSnackbar,
    private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  ngOnInit(): void {

    this.whoAnnouncedTypes$ = this.lookup.WhoAnnouncedTypes
    this.announcementTypes$ = this.lookup.AnnouncementTypes
    this.criticalDates$ = this.lookup.CriticalDates
    this.commitmentTypes$ = this.lookup.CommitmentTypes
    this.parties$ = this.lookup.Parties
    this.portfolios$ = this.lookup.Portfolios
    this.electorates$ = this.lookup.Locations

    this.commitmentContactsTableData$ = this.service.CommitmentContactsTableData
    this.commitmentCommitmentsTableData$ = this.service.RelatedCommitmentsTableData

    this.commitmentSubscription$ = this.service.Commitment.subscribe(
      next => {
        this.commitment = next
        this.selectedElectorateIds = this.commitment ? arrayToIndex(this.commitment.electorates) : []
      },
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

    this.commitmentEditExpandedPanelsSubscription$ = this.service.CommitmentEditExpandedPanels.subscribe(
      next => {
        this.panels = next.reduce((a, i) => {
          a[i] = true
          return a
        }, {
            commitmentPanelExpanded: false,
            relatedPanelExpanded: false,
            discussionPanelExpanded: false,
            contactPanelExpanded: false,
            formPanelExpanded: false,
            mapPanelExpanded: false
          })
      }
    )

    this.lookup.getAllWhoAnnouncedTypes()
    this.lookup.getAllAnnouncementTypes()
    this.lookup.getAllCriticalDates()
    this.lookup.getAllCommitmentTypes()
    this.lookup.getAllLocations()
    this.lookup.getAllPartys()

    this.lookup.getAllPortfolios()

    this.service.getAllCommitments()
    this.service.getAllContacts()

    this.selectId$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => +params.get('id')),
        map((selectedId) => {
          this.service.getUserSubscriptionStatus(selectedId)
          this.service.setCurrentCommitment(selectedId)
        }),
      )
      .subscribe()
    this.isSubscribed$ = this.service.CommitmentSubscription
  }

  getTitle(commitment) {
    return formatCommitmentTitle(commitment)
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
    this.selectId$.unsubscribe()
    this.commitmentSubscription$.unsubscribe()

    this.commitmentEditExpandedPanelsSubscription$.unsubscribe()
    this.activitySubscription$.unsubscribe()
  }

  handleManageSubscription($event) {
    this.isSubscribed$ = of($event)
    if ($event) {
    this.service.subscribeToCommitment(this.commitment.id)
    }
    else {
      this.service.unsubscibeFromCommitment(this.commitment.id)
    }
  }

  handleChangeExpanded($event, panel) {

    if ($event) {
      this.service.expandCommitmentEditPanel(panel)
    } else {
      this.service.collapseCommitmentEditPanel(panel)
    }

  }

  handleUpdateCommitment(commitment) {
    this.formBusy = true
    this.service.upsertCommitment(commitment)
  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }

  handleAddMapPoint(mapPoint) {
    this.service.addMapPointToCommitment(this.commitment.id, mapPoint)
  }

  handleDeleteMapPoint(mapPoint) {

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT) {
          this.service.removeMapPointFromCommitment(this.commitment.id, mapPoint.id)
        }
      })
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

  handleRelatedCommitmentsRowClicked($event) {
    this.router.navigate(['/', 'commitment', $event.id])
  }

  handleCommitmentsTableDeleteClicked(relatedTo) {

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && relatedTo.id) {
          this.service.removeCommitmentFromCommitment(this.commitment.id, relatedTo.id)
        }
      })

  }

  handleOpenCommitmenttDialog() {

    this.service.Commitments.pipe(
      first()
    )
      .subscribe(commitments => {
        const dialogRef = this.dialog.open(DialogAddCommitmentComponent, {
          escapeToClose: true,
          clickOutsideToClose: true,
          data: {
            commitments: commitments.sort((leftSide, rightSide) => {

              const leftTitle = formatCommitmentTitle(leftSide).toLowerCase()
              const rightTitle = formatCommitmentTitle(rightSide).toLowerCase()

              if (leftTitle < rightTitle) { return -1 }
              if (leftTitle > rightTitle) { return 1 }
              return 0
            })
          }
        })

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.service.addCommitmentToCommitment(this.commitment.id, result.id)
          }
        })
      }
      )
  }

  handleRemoveElectorateFromCommitment(electorate) {
    this.service.removeElectorateFromCommitment(this.commitment.id, electorate.value.id)
  }

  handleAddElectorateToCommitment(electorate) {
    this.service.addElectorateToCommitment(this.commitment.id, electorate.id)
  }

}

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { map, first } from 'rxjs/operators'
import { DialogAreYouSureComponent, DialogAddContactComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'

import { CommitmentDataService } from '../../services/commitment-data.service'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { Location } from '../../reducers/location/location.model'
import { AnnouncementType } from '../../reducers/announcement-type/announcement-type.model'
import { CommitmentType } from '../../reducers/commitment-type/commitment-type.model'
import { WhoAnnouncedType } from '../../reducers/who-announced-type/who-announced-type.model'
import { DataTableConfig } from '@digital-first/df-components'

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

  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  locations$: Observable<Location[]>
  selectedLocations: Location[] = []
  activeComment: any
  timeFormat: 'timeAgo' | 'dateFormat' | 'calendar'

  panels: {
    commitmentPanelExpanded?: boolean
    relatedPanelExpanded?: boolean
    discussionPanelExpanded?: boolean
    contactPanelExpanded?: boolean
    formPanelExpanded?: boolean
    mapPanelExpanded?: boolean
  } = {
      commitmentPanelExpanded: false,
      relatedPanelExpanded: false,
      discussionPanelExpanded: false,
      contactPanelExpanded: false,
      formPanelExpanded: false,
      mapPanelExpanded: false
    }

  commitmentEditDiscussionTimeFormat: Observable<'dateFormat' | 'timeAgo' | 'calendar'>
  formBusy = false

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MdcDialog, private snackbar: MdcSnackbar, private service: CommitmentDataService) { }

  ngOnInit(): void {

    this.whoAnnouncedTypes$ = this.service.WhoAnnouncedTypes
    this.announcementTypes$ = this.service.AnnouncementTypes
    this.commitmentTypes$ = this.service.CommitmentTypes
    this.parties$ = this.service.Parties
    this.portfolios$ = this.service.Portfolios
    this.locations$ = this.service.Locations
    this.commitmentContactsTableData$ = this.service.CommitmentContactsTableData

    this.commitmentSubscription$ = this.service.Commitment.subscribe(
      next => {
        this.commitment = next
      },
      error => this.showSnackBar(error)
    )

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

    this.commitmentEditDiscussionTimeFormat = this.service.CommitmentEditDiscussionTimeFormat

    this.service.getAllWhoAnnouncedTypes()
    this.service.getAllAnnouncementTypes()
    this.service.getAllCommitmentTypes()
    this.service.getAllLocations()
    this.service.getAllPartys()
    this.service.getAllContacts()
    this.service.getAllPortfolios()

    this.selectId$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => +params.get('id')),
        map(selectedId => this.service.setCurrentCommitment(selectedId))
      )
      .subscribe()
  }

  showSnackBar(message: string, action: string = 'OK'): void {

    // this is to avoid component validation check errors
    setTimeout(() => {
      const snackbarRef = this.snackbar.show(message, action, {
        align: 'center',
        multiline: false,
        dismissOnAction: false,
        focusAction: true,
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

  handleDeleteComment(comment) {

    const commentId = comment.id

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && commentId) {
          this.service.deleteComment({ id: commentId })
        }
      })
  }

  handleChanged(commitment: Commitment) {

  }

  handleAddMapPoint($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
  }

  changeDateFormat(format) {
    this.service.changeCommitmentEditDiscussionTimeFormat(format)
  }

  handleReplyToComment(comment) {
    const oldActive = this.activeComment
    this.activeComment = null
    if (comment) {
      if (oldActive !== comment.id) {
        this.activeComment = comment.id
      }
    }
  }

  handleAddComment(newComment) {

    const parentId = newComment.parent ? newComment.parent.id : null

    this.service.createComment({
      commitment: newComment.hostId,
      parent: parentId,
      comment: newComment.text
    })
    this.activeComment = null
  }

  handleTabScroll(el) {
    el.scrollIntoView()
    window.scrollBy(0, -128)
  }

  handleMailClicked(contact) {
    const mailText = `mailto:${contact}?subject=${this.commitment.title}&body=`
    window.location.href = mailText
  }

  handleContactsTableDeleteClicked(commitmentContact) {

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && commitmentContact.id) {
          this.service.removeContactFromCommitment(commitmentContact)
        }
      })

  }

  handleCreateContact() {
    this.router.navigate(['/', 'contact'])
  }

  handleOpenContactDialog() {

    this.service.Contacts.pipe(
      first()
    )
      .subscribe(contacts => {
        const dialogRef = this.dialog.open(DialogAddContactComponent, {
          escapeToClose: true,
          clickOutsideToClose: true,
          data: {
            contacts: contacts.sort((leftSide, rightSide) => {
              if (leftSide.name < rightSide.name) { return -1 }
              if (leftSide.name > rightSide.name) { return 1 }
              return 0
            })
          }
        })

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.id) {
            this.service.addContactToCommitment(this.commitment.id, result.id)
          }
        })
      }
      )
  }

  handleRemoveElectorateFromCommitment($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
    this.selectedLocations = this.selectedLocations.filter(l => l.id !== $event)
  }

  handleAddElectorateToCommitment($event) {
    // tslint:disable-next-line:no-console
    console.log($event)

    this.selectedLocations.push($event)
  }

}

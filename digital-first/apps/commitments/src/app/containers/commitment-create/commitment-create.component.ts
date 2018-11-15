import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog, MdcDialogRef, MdcSnackbar } from '@angular-mdc/web'
import { DialogAreYouSureComponent, DialogSpinnerOverlayComponent } from '@digital-first/df-dialogs'

import { CommitmentDataService } from '../../services/commitment-data.service'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { Location } from '../../reducers/location/location.model'
import { AnnouncementType } from '../../reducers/announcement-type/announcement-type.model'
import { CommitmentType } from '../../reducers/commitment-type/commitment-type.model'
import { WhoAnnouncedType } from '../../reducers/who-announced-type/who-announced-type.model'

@Component({
  selector: 'digital-first-commitment-create',
  templateUrl: './commitment-create.component.html',
  styleUrls: ['./commitment-create.component.scss']
})
export class CommitmentCreateComponent implements OnInit, OnDestroy {

  commitment$: Observable<Commitment>
  currentComments$: Observable<Comment[]>
  selectId$: Subscription
  activity$: Observable<any>
  announcementTypes$: Observable<AnnouncementType[]>
  commitmentTypes$: Observable<CommitmentType[]>
  whoAnnouncedTypes$: Observable<WhoAnnouncedType[]>
  activitySubscription$: Subscription
  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  locations$: Observable<Location[]>
  activeComment: any
  timeFormat: 'timeAgo' | 'dateFormat' | 'calendar'
  formBusy = false

  constructor(private router: Router, private route: ActivatedRoute, private snackbar: MdcSnackbar, public dialog: MdcDialog, private service: CommitmentDataService) { }

  ngOnInit(): void {
    this.timeFormat = 'timeAgo'

    this.activity$ = this.service.CommitmentActivity

    this.whoAnnouncedTypes$ = this.service.WhoAnnouncedTypes
    this.announcementTypes$ = this.service.AnnouncementTypes
    this.commitmentTypes$ = this.service.CommitmentTypes
    this.parties$ = this.service.Parties
    this.portfolios$ = this.service.Portfolios
    this.locations$ = this.service.Locations

    this.service.getAllWhoAnnouncedTypes()
    this.service.getAllAnnouncementTypes()
    this.service.getAllCommitmentTypes()
    this.service.getAllLocations()
    this.service.getAllPartys()
    this.service.getAllPortfolios()

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
        focusAction: true,
        actionOnBottom: false,
      })

      snackbarRef.afterDismiss().subscribe(() => {

      })
    })
  }

  ngOnDestroy(): void {
    this.activitySubscription$.unsubscribe()
  }

  handleUpdateCommitment(commitment) {
    this.service.upsertCommitment(commitment)
  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }

  handleChanged(commitment: Commitment) {

  }

  handleTabScroll(el) {
    el.scrollIntoView()
    window.scrollBy(0, -128)
  }
}

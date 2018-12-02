import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router, ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'

import { CommitmentDataService } from '../../services/commitment-data.service'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { Location } from '../../models/location.model'
import { AnnouncementType } from '../../models/announcement-type.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { CriticalDate } from '../../models/critical-date.model'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'

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
  criticalDates$: Observable<CriticalDate[]>
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

  constructor(private router: Router, private route: ActivatedRoute, private snackbar: MdcSnackbar, public dialog: MdcDialog, private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  ngOnInit(): void {
    this.timeFormat = 'timeAgo'

    this.activity$ = this.service.CommitmentActivity

    this.whoAnnouncedTypes$ = this.lookup.WhoAnnouncedTypes
    this.criticalDates$ = this.lookup.CriticalDates
    this.announcementTypes$ = this.lookup.AnnouncementTypes
    this.commitmentTypes$ = this.lookup.CommitmentTypes
    this.parties$ = this.lookup.Parties
    this.portfolios$ = this.lookup.Portfolios
    this.locations$ = this.lookup.Locations

    this.lookup.getAllWhoAnnouncedTypes()
    this.lookup.getAllAnnouncementTypes()
    this.lookup.getAllCriticalDates()
    this.lookup.getAllCommitmentTypes()
    this.lookup.getAllPartys()
    this.lookup.getAllPortfolios()

    this.activitySubscription$ = this.service.Notification
      // .pipe(
      //   delay(2000)
      // )
      .subscribe(
        (next: any) => {
          if (next) {
            this.formBusy = false
            // tslint:disable-next-line:no-console
            console.log(next)
            this.showSnackBar(next.message)
            if (next.code === 'stored') {

              this.router.navigate(['/', 'commitment', next.data.id])
            }
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

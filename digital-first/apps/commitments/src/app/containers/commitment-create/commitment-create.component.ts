import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog, MdcDialogRef } from '@angular-mdc/web'
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

  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  locations$: Observable<Location[]>
  activeComment: any
  timeFormat: 'timeAgo' | 'dateFormat' | 'calendar'

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MdcDialog, private service: CommitmentDataService) { }

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
  }

  ngOnDestroy(): void {  }

  handleUpdateCommitment(commitment) {
    // tslint:disable-next-line:no-console
    console.log(commitment)
    this.service.upsertCommitment(commitment)
  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }

  handleChanged(commitment: Commitment) {
    // tslint:disable-next-line:no-console
    console.log(commitment)
  }

  handleTabScroll(el) {
    el.scrollIntoView()
    window.scrollBy(0, -128)
  }
}

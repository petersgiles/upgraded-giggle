import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { Observable, Subscription } from 'rxjs'

import { CommitmentDataService } from '../../services/commitment-data.service'

import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { Contact } from '../../reducers/contact/contact.model'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { showSnackBar } from '../../dialogs/show-snack-bar'

@Component({
  selector: 'digital-first-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit, OnDestroy {

  activitySubscription$: Subscription
  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  contacts$: Observable<Contact[]>
  formBusy = false

  constructor(private router: Router, private location: Location, private snackbar: MdcSnackbar, public dialog: MdcDialog, private service: CommitmentDataService,
    private lookup: CommitmentLookupService) { }

  ngOnInit() {
    this.parties$ = this.lookup.Parties
    this.portfolios$ = this.lookup.Portfolios
    this.contacts$ = this.service.Contacts
    this.lookup.getAllPartys()
    this.service.getAllContacts()
    this.lookup.getAllPortfolios()

    this.activitySubscription$ = this.service.Notification
      // .pipe(
      //   delay(2000)
      // )
      .subscribe(
        (next: any) => {
          if (next) {
            this.formBusy = false
            showSnackBar(this.snackbar, next.message)
            this.handleGoBack(null)
          }
        },
        error => showSnackBar(this.snackbar, error)
      )

  }

  handleGoBack($event) {
    this.location.back()
  }

  handleSubmit(contact) {
    this.service.upsertContact(contact)
  }

  handleChanged($event) {

  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }

  ngOnDestroy(): void {
    this.activitySubscription$.unsubscribe()
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { Observable, Subscription } from 'rxjs'

import { CommitmentDataService } from '../../services/commitment-data.service'

import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { Contact } from '../../reducers/contact/contact.model'

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

  constructor(private router: Router, private location: Location, private snackbar: MdcSnackbar, public dialog: MdcDialog, private service: CommitmentDataService) { }

  ngOnInit() {
    this.parties$ = this.service.Parties
    this.portfolios$ = this.service.Portfolios
    this.contacts$ = this.service.Contacts
    this.service.getAllPartys()
    this.service.getAllContacts()
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
}

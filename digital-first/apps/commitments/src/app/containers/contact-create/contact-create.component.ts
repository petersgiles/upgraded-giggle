import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { MdcDialog } from '@angular-mdc/web'
import { Observable } from 'rxjs'

import { CommitmentDataService } from '../../services/commitment-data.service'

import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { Contact } from '../../reducers/contact/contact.model'

@Component({
  selector: 'digital-first-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {

  parties$: Observable<Party[]>
  portfolios$: Observable<Portfolio[]>
  contacts$: Observable<Contact[]>

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MdcDialog, private service: CommitmentDataService) { }

  ngOnInit() {
    this.parties$ = this.service.Parties
    this.portfolios$ = this.service.Portfolios
    this.contacts$ = this.service.Contacts
    this.service.getAllPartys()
    this.service.getAllContacts()
    this.service.getAllPortfolios()

  }

  handleSubmit(contact) {
    this.service.upsertContact(contact)
  }

  handleChanged($event) {

  }

  handleCancelled($event) {
    this.router.navigate(['/', 'commitments'])
  }
}

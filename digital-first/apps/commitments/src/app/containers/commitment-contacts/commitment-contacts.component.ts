import { Component, OnInit, Input } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { CommitmentContactService } from '../../reducers/commitment-contact/commitment-contact.service'

@Component({
  selector: 'digital-first-commitment-contacts',
  templateUrl: './commitment-contacts.component.html',
  styles: [``]
})
export class CommitmentContactsComponent implements OnInit {
  _commitment: number

  expanded: boolean

  constructor(public dialog: MdcDialog, private service: CommitmentContactService) { }

  @Input()
  set commitment(val: number) {
    this._commitment = val
    // tslint:disable-next-line:no-console
    console.log('commitment', val)
    if (val) {
     // this.service.getCommentsByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  handleChangeExpanded(expanded) {
    // tslint:disable-next-line:no-console
    console.log(expanded)

    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  ngOnInit() {
  }

}

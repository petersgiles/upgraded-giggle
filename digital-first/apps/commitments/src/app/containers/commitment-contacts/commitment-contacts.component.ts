import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { CommitmentContactService } from '../../reducers/commitment-contact/commitment-contact.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'digital-first-commitment-contacts',
  templateUrl: './commitment-contacts.component.html',
  styles: [``]
})
export class CommitmentContactsComponent implements OnInit, OnDestroy {
  _commitment: number

  expanded: boolean
  expandedSubscription$: Subscription

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
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }

}

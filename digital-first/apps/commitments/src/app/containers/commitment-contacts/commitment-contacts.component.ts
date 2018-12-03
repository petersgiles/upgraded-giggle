import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { CommitmentContactService } from '../../reducers/commitment-contact/commitment-contact.service'
import { Subscription, Observable } from 'rxjs'
import { Router } from '@angular/router'
import { DialogAddContactComponent, DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { DataTableConfig } from '@digital-first/df-components'

@Component({
  selector: 'digital-first-commitment-contacts',
  templateUrl: './commitment-contacts.component.html',
  styles: [``]
})
export class CommitmentContactsComponent implements OnInit, OnDestroy {
  _commitment: number

  expanded: boolean
  expandedSubscription$: Subscription
  commitmentContactsTableData$: Observable<DataTableConfig>

  constructor(private router: Router, public dialog: MdcDialog, private service: CommitmentContactService) { }

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
            this.service.addContactToCommitment(this.commitment, result.id)
          }
        })
      }
      )
  }

  handleCreateContact() {
    this.router.navigate(['/', 'contact'])
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

  ngOnInit() {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)

    this.commitmentContactsTableData$ = this.service.CommitmentContactsTableData
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }

}

import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { CommitmentContactService } from '../../reducers/commitment-contact/commitment-contact.service'
import { Subscription, Observable } from 'rxjs'
import { Router } from '@angular/router'
import { first } from 'rxjs/operators'
import { DataTableConfig } from '@digital-first/df-datatable'
import { OPERATION_CONTACTS } from '../../services/app-data.service'
import { DialogAddContactComponent } from '../../dialogs/dialog-add-contact.component';
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@df/components';

@Component({
  selector: 'digital-first-commitment-contacts',
  templateUrl: './commitment-contacts.component.html',
  styles: [``]
})
export class CommitmentContactsComponent implements OnInit, OnDestroy {
  _commitment: number

  expanded: boolean
  expandedSubscription$: Subscription
  userOperation$: Observable<any>
  commitmentContactsTableData$: Observable<DataTableConfig>

  constructor(private router: Router, public dialog: MdcDialog, private service: CommitmentContactService) { }

  @Input()
  set commitment(val: number) {
    this._commitment = val
  }

  get commitment() {
    return this._commitment
  }

  handleChangeExpanded(expanded) {
    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  getRight(operations: any) {
    return operations[OPERATION_CONTACTS]
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

  handleContactsTableDeleteClicked(contact) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && contact.id) {
          this.service.removeContactFromCommitment(this.commitment, contact.id)
        }
      })

  }

  ngOnInit() {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)

    this.commitmentContactsTableData$ = this.service.CommitmentContactsTableData
    this.userOperation$ = this.service.UserOperation
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }

}

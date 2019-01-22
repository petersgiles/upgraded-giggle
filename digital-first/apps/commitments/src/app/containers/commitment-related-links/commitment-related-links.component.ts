import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { Subscription, Observable } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-components'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { Router } from '@angular/router'
import { DialogAddLinkComponent, ADD_LINK_CLOSE } from '../../dialogs/dialog-add-link.component'
import { RelatedLinkService } from '../../reducers/related-link/related-link.service'
import { OPERATION_RELATEDLINKS } from '../../services/app-data.service'

@Component({
  selector: 'digital-first-commitment-related-links',
  templateUrl: './commitment-related-links.component.html',
  styles: [``]
})
export class CommitmentRelatedLinksComponent implements OnInit, OnDestroy {

  _commitment: number
  expanded: boolean
  expandedSubscription$: Subscription
  tableData$: Observable<DataTableConfig>
  userOperation$: Observable<any>
  constructor(private router: Router, public dialog: MdcDialog, private service: RelatedLinkService) {
    this.tableData$ = this.service.TableData
   }

  @Input()
  set commitment(val: number) {
    this._commitment = val
  }

  get commitment() {
    return this._commitment
  }

  handleAddItem() {
    const dialogRef = this.dialog.open(DialogAddLinkComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== ADD_LINK_CLOSE && result) {
        this.service.addItemToCommitment({commitment: this.commitment, url: result.url})
      }
    })
  }

  handleChangeExpanded(expanded) {
    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  handleTableDeleteClicked($event) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT) {
          this.service.removeItemFromCommitment({commitment: this.commitment, id: $event.id})
        }
      })

  }

  handleRowClicked($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
    window.open($event.cell.value, '_blank')
  }

  ngOnInit(): void {
    this.userOperation$ = this.service.UserOperation
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }

  getRight(operations: any) {
    return operations[OPERATION_RELATEDLINKS]
  }

}

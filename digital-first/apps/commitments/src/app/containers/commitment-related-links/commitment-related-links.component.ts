import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { Subscription, Observable } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-components'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { Router } from '@angular/router'
import { DialogAddLinkComponent, ADD_LINK_CLOSE } from '../../dialogs/dialog-add-link.component'
import { RelatedLinkService } from '../../reducers/related-link/related-link.service'

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
  constructor(private router: Router, public dialog: MdcDialog, private service: RelatedLinkService) { }

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
        this.service.addItemToCommitment(this.commitment, result.url)
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
          this.service.removeItemFromCommitment(this.commitment, $event.id)
        }
      })

  }

  handleRowClicked($event) {}

  ngOnInit(): void {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.tableData$ = this.service.TableData
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }

}

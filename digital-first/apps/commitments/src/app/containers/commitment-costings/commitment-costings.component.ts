import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { CommitmentActionService } from '../../reducers/commitment-action/commitment-action.service'
import { Subscription, Observable } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-components'

@Component({
  selector: 'digital-first-commitment-costings',
  templateUrl: './commitment-costings.component.html',
  styles: [``]
})
export class CommitmentCostingsComponent implements OnInit, OnDestroy {

  _commitment: number
  expanded: boolean
  expandedSubscription$: Subscription
  tableData$: Observable<DataTableConfig>
  constructor(public dialog: MdcDialog, private service: CommitmentActionService) { }

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

  handleTableDeleteClicked($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
  }

  handleRowClicked($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
  }

  ngOnInit(): void {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.tableData$ = this.service.CommitmentActionsTableData
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }
}

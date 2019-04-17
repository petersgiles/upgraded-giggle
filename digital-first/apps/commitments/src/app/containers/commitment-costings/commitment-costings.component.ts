import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core'
import { MdcDialog, MdcSnackbar } from '@angular-mdc/web'
import { CommitmentActionService } from '../../reducers/commitment-action/commitment-action.service'
import { Subscription, Observable } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-datatable'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { Router } from '@angular/router'
import { OPERATION_COSTING } from '../../services/app-data.service'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { showSnackBar } from '../../dialogs/show-snack-bar'
import { CommitmentDataService } from '../../services/commitment-data.service'


@Component({
  selector: 'digital-first-commitment-costings',
  templateUrl: './commitment-costings.component.html',
  styles: [`
  .mdc-component__containers[dir-horizontal] {
    align-items: right;
    justify-content: center;
    flex-direction: column;
  }
  .toggle_costing_required {
    min-width: 200px;
  }`]
})
export class CommitmentCostingsComponent implements OnInit, OnDestroy {
  currCommitment: Commitment
  commitmentSubscription$: Subscription
  _commitment: number
  expanded: boolean
  expandedSubscription$: Subscription
  tableData$: Observable<DataTableConfig>
  userOperation$: Observable<any>
  constructor(
    private router: Router, 
    public dialog: MdcDialog, 
    private snackbar: MdcSnackbar,
    private commitmentService: CommitmentDataService,
    private service: CommitmentActionService) {}

  @Input() required: boolean

  @Input()
  set commitmentId(val: number) {
    this._commitment = val
  }

  get commitmentId() {
    return this._commitment
  }

  @Input()
  set commitment(val: Commitment) {
    this.currCommitment = val
  }
  
  get commitment() {
    return this.currCommitment
  }

  handleChangeExpanded(expanded) {
    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  handleTableDeleteClicked(row) {
    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && row.id) {
          this.service.removeActionFromCommitment(this.commitment, row.id)
        }
      })

  }
  handleCreateCosting() {
    this.router.navigate(['/', 'commitment', this.commitmentId, 'costing'])
  }

  handleRowClicked(row) {
    this.router.navigate(['/', 'commitment', this.commitmentId, 'costing', row.id])
  }

  ngOnInit(): void {
    this.userOperation$ = this.service.UserOperation
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.tableData$ = this.service.CommitmentActionsTableData
    this.commitmentSubscription$ = this.commitmentService.Commitment.subscribe(
      next => {
        this.currCommitment = next
      },
      error => showSnackBar(this.snackbar, error)
    )
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }

  getRight(operations: any) {
    return operations[OPERATION_COSTING]
  }

  handleCostingRequired() {
      this.commitmentService.setCostingRequired(this.commitment.id, !this.commitment.costingRequired)
  }
}

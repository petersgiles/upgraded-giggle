import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { MdcDialog } from '@angular-mdc/web'
import { Subscription, Observable } from 'rxjs'
import { DataTableConfig } from '@digital-first/df-components'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { first } from 'rxjs/operators'
import { Router } from '@angular/router'
import { DialogAddCommitmentComponent, ADD_COMMITMENT_TO_COMMITMENT_CLOSE } from '../../dialogs/dialog-add-commitment.component'
import { formatCommitmentTitle } from '../../formatters'
import { RelatedCommitmentService } from '../../reducers/related-commitment/related-commitment.service'
import { OPERATION_RELATEDCOMMITMENTS, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ, OPERATION_RIGHT_HIDE } from '../../services/app-data.service'
import { LoggerService, Logger} from '@digital-first/df-logging'

@Component({
  selector: 'digital-first-commitment-related-commitments',
  templateUrl: './commitment-related-commitments.component.html',
  styles: [``]
})
export class CommitmentRelatedCommitmentsComponent implements OnInit, OnDestroy {

  _commitment: number
  expanded: boolean
  expandedSubscription$: Subscription
  tableData$: Observable<DataTableConfig>
  userOperation$: Observable<any>

  constructor(private router: Router, public dialog: MdcDialog, private service: RelatedCommitmentService,
    private logger: LoggerService) { }

  @Input()
  set commitment(val: number) {
    this._commitment = val
  }

  get commitment() {
    return this._commitment
  }

  handleAddItem() {

    this.logger.info('handleAddItem')
    this.service.Commitments.pipe(
      first()
    )
      .subscribe(commitments => {
        const dialogRef = this.dialog.open(DialogAddCommitmentComponent, {
          escapeToClose: true,
          clickOutsideToClose: true,
          data: {
            commitments: commitments.sort((leftSide, rightSide) => {

              const leftTitle = formatCommitmentTitle(leftSide).toLowerCase()
              const rightTitle = formatCommitmentTitle(rightSide).toLowerCase()

              if (leftTitle < rightTitle) { return -1 }
              if (leftTitle > rightTitle) { return 1 }
              return 0
            })
          }
        })

        dialogRef.afterClosed().subscribe((result: any) => {
          this.logger.info(result)
          if (result !== ADD_COMMITMENT_TO_COMMITMENT_CLOSE && result) {
            const related = {
              commitment: this.commitment,
              relatedTo: result.id
            }
            this.service.addItemToCommitment(related)
          }
        })
      }
      )
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
        if (result === ARE_YOU_SURE_ACCEPT && $event.id) {
          this.service.removeItemFromCommitment({commitment: this.commitment, relatedTo: $event.id})
        }
      })

  }

  handleRowClicked($event) {
    this.logger.info($event)
    this.router.navigate(['/', 'commitment', $event.id])
  }

  ngOnInit(): void {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.tableData$ = this.service.TableData
    this.userOperation$ = this.service.UserOperation
  }

  getRight(operations: any) {
    return operations[OPERATION_RELATEDCOMMITMENTS]
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
  }
}

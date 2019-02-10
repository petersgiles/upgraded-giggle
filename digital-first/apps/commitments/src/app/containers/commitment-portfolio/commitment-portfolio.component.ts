import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import { CommitmentDiscussionService } from '../../reducers/commitment-discussion/commitment-discussion.service'
import { OPERATION_DISCUSSION } from '../../services/app-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'

@Component({
  selector: 'digital-first-commitment-portfolio',
  templateUrl: './commitment-portfolio.component.html',
  styleUrls: ['./commitment-portfolio.component.scss']
})
export class CommitmentPortfolioComponent implements OnInit, OnDestroy {
  title = 'Responsibility'
  _commitment: number
  userOperation$: Observable<any>
  portfoliosSubscription$: Subscription
  portfolios: string[]

  constructor(
    public dialog: MdcDialog,
    private service: CommitmentDiscussionService,
    private lookup: CommitmentLookupService
  ) {}

  @Input()
  set commitment(val: number) {
    this._commitment = val
    if (val) {
      this.service.getCommentsByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  getRight(operations: any) {
    return operations[OPERATION_DISCUSSION]
  }

  handleChangeExpanded(expanded) {
    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }
  }
  ngOnDestroy(): void {

    this.portfoliosSubscription$.unsubscribe()
  }
  ngOnInit(): void {
    this.portfoliosSubscription$ = this.lookup.Portfolios.subscribe(next => {
      // tslint:disable-next-line:no-console
      console.log(next)
      this.portfolios = (next || []).map(p => p.title)
    })
    this.userOperation$ = this.service.UserOperation
    this.lookup.getAllPortfolios()
  }

  done = []

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}

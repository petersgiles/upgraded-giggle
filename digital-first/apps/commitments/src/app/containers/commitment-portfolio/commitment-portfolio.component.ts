import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { Observable, Subscription } from 'rxjs'
import { MdcDialog } from '@angular-mdc/web'
import { OPERATION_COMMITMENT_PORTFOLIO } from '../../services/app-data.service'
import { CommitmentLookupService } from '../../reducers/commitment-lookup/commitment-lookup.service'
import { CommitmentPortfolioService } from '../../reducers/commitment-portfolio/commitment-portfolio.service'
import { Portfolio } from '../../models'

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
  portfolios: Portfolio[]
  commitmentPortfolios$: Observable<Portfolio[]>
  expandedSubscription$: Subscription
  expanded: boolean
  commitmentPortfoliosSubscription$: Subscription

  constructor(
    public dialog: MdcDialog,
    private service: CommitmentPortfolioService,
    private lookup: CommitmentLookupService
  ) {}

  @Input()
  set commitment(val: number) {
    this._commitment = val
    if (val) {
      this.service.getPortfoliosByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  getRight(operations: any) {
    return operations[OPERATION_COMMITMENT_PORTFOLIO]
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

  ngOnDestroy(): void {
    this.portfoliosSubscription$.unsubscribe()
    this.commitmentPortfoliosSubscription$.unsubscribe()
    this.expandedSubscription$.unsubscribe()
  }

  ngOnInit(): void {
    this.commitmentPortfoliosSubscription$ = this.service.CommitmentPortfolios.subscribe(
      next => {
        // tslint:disable-next-line:no-console
        console.log(next)
        this.related = next || []
      }
    )

    this.portfoliosSubscription$ = this.lookup.Portfolios.subscribe(next => {
      // tslint:disable-next-line:no-console
      console.log(next)
      // the function is used to create a closure
      this.portfolios = (next || [])
    })

    this.expandedSubscription$ = this.service.Expanded.subscribe(
      p => (this.expanded = p)
    )
    this.userOperation$ = this.service.UserOperation
    this.lookup.getAllPortfolios()
  }

  related = []

  addPortfolio(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const portfolio: any = event.previousContainer.data[event.previousIndex]
      this.service.addPortfolioToCommitment(this.commitment, portfolio.id)
    }
  }

  removePortfolio(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
    const portfolio: any = event.previousContainer.data[event.previousIndex]
// tslint:disable-next-line:no-console
console.log(portfolio)
    this.service.removePortfolioFromCommitment(this.commitment, portfolio.id)
    }
  }

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

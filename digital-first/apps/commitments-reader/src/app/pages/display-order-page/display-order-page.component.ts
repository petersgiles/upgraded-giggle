import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs'
import { CommitmentRow } from '../../models/commitment.model'
import { Router } from '@angular/router'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromDisplayOrder from '../../reducers/commitment-display-order/commitment-display-order.reducer'
import { Store, select } from '@ngrx/store'
import {
  moveItemInArray,
  transferArrayItem,
  CdkDragDrop
} from '@angular/cdk/drag-drop'
import {
  GetCommitmentDisplayOrders,
  SetReOrderedCommitments,
  ApplyCommitmentDisplayOrders,
  SetDisplayOrderListChanged
} from '../../reducers/commitment-display-order/commitment-display-order.actions'
import { UserState } from '@digital-first/df-app-core'
import { getUserCurrentUserDisplayOrderPermission } from '../../reducers/user/user.reducer'

@Component({
  selector: 'digital-first-display-order-page',
  templateUrl: './display-order-page.component.html',
  styleUrls: ['./display-order-page.component.scss']
})
export class DisplayOrderPageComponent implements OnInit, OnDestroy {
  @ViewChild('autoscroll') autoscroll: ElementRef
  commitmentsWithDisplayOrder$: BehaviorSubject<any[]> = new BehaviorSubject([])
  commitmentsWithoutDisplayOrder$: BehaviorSubject<
    CommitmentRow[]
  > = new BehaviorSubject([])
  orderChanged$: Observable<boolean> = of(false)
  displayOrderPermission$: Observable<string>
  filterCommitmentsSubscription: Subscription
  constructor(
    private overviewStore: Store<fromOverview.State>,
    private displayOrderStore: Store<fromDisplayOrder.State>,
    private userStore: Store<UserState>
  ) {}

  ngOnInit() {
    this.displayOrderStore.dispatch(new SetDisplayOrderListChanged(false))
    this.orderChanged$ = this.displayOrderStore.pipe(
      select(fromDisplayOrder.getDisplayOrderListChangedState)
    )
    this.displayOrderStore.dispatch(new GetCommitmentDisplayOrders(null))
    this.filterCommitmentsSubscription = this.overviewStore
      .pipe(select(fromOverview.selectFilteredCommitmentsState))
      .subscribe((data: any) => {
        this.commitmentsWithoutDisplayOrder$.next(
          data
            .filter(c => !c.displayOrder)
            .map(c => ({
              commitmentId: c.id,
              title: c.title,
              portfolio: c.portfolio
            }))
        )
      })

    this.filterCommitmentsSubscription.add(
      this.displayOrderStore
        .pipe(select(fromDisplayOrder.getCommitmentsWithDisplayOrderState))
        .subscribe(result => {
          this.commitmentsWithDisplayOrder$.next(result)
        })
    )

    this.displayOrderPermission$ = this.userStore.pipe(
      select(getUserCurrentUserDisplayOrderPermission)
    )
  }

  handleDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      if (event.container.id === 'orderContainer') {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
        const reOrderedCommitmentIds = event.container.data.map(
          c => c.commitmentId
        )
        this.displayOrderStore.dispatch(
          new SetReOrderedCommitments(reOrderedCommitmentIds)
        )
        this.displayOrderStore.dispatch(new SetDisplayOrderListChanged(true))
      } else if (event.container.id === 'noneOrderContainer') {
        return
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      let reOrderedCommitmentIds = []
      if (event.container.id === 'orderContainer') {
        reOrderedCommitmentIds = event.container.data.map(c => c.commitmentId)
      } else if (event.container.id === 'noneOrderContainer') {
        reOrderedCommitmentIds = event.previousContainer.data.map(
          c => c.commitmentId
        )
      }
      this.displayOrderStore.dispatch(
        new SetReOrderedCommitments(reOrderedCommitmentIds)
      )
      this.displayOrderStore.dispatch(new SetDisplayOrderListChanged(true))
    }
  }

  handleApplyCommitmentDisplayOrders() {
    this.displayOrderStore.dispatch(new ApplyCommitmentDisplayOrders(null))
  }
  ngOnDestroy(): void {
    this.filterCommitmentsSubscription.unsubscribe()
  }
}

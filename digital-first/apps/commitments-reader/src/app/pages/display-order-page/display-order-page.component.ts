import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Observable, BehaviorSubject, Subscription } from 'rxjs'
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
import { GetCommitmentDisplayOrders } from '../../reducers/commitment-display-order/commitment-display-order.actions'

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

  filterCommitmentsSubscription: Subscription
  constructor(
    private router: Router,
    private overviewStore: Store<fromOverview.State>,
    private displayOrderStore: Store<fromDisplayOrder.State>
  ) {}

  ngOnInit() {
    this.displayOrderStore.dispatch(new GetCommitmentDisplayOrders(null))
    this.filterCommitmentsSubscription = this.overviewStore
      .pipe(select(fromOverview.selectFilteredCommitmentsState))
      .subscribe((data: any) => {
        this.commitmentsWithoutDisplayOrder$.next(
          data.filter(c => !c.displayOrder)
        )
      })

    this.filterCommitmentsSubscription.add(
      this.displayOrderStore
        .pipe(select(fromDisplayOrder.getCommitmentsWithDisplayOrderState))
        .subscribe(result => {
          this.commitmentsWithDisplayOrder$.next(result)
        })
    )
  }
  ngOnDestroy(): void {
    this.filterCommitmentsSubscription.unsubscribe()
  }
  handleDrop(event: CdkDragDrop<any>) {
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

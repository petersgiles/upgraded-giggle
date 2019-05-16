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
import { Store, select } from '@ngrx/store'
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop'

@Component({
  selector: 'digital-first-display-order-page',
  templateUrl: './display-order-page.component.html',
  styleUrls: ['./display-order-page.component.scss']
})
export class DisplayOrderPageComponent implements OnInit, OnDestroy {
  @ViewChild('autoscroll') autoscroll: ElementRef
  commitmentsWithDisplayOrder$: BehaviorSubject<
    CommitmentRow[]
  > = new BehaviorSubject([])
  commitmentsWithoutDisplayOrder$: BehaviorSubject<
    CommitmentRow[]
  > = new BehaviorSubject([])

  filterCommitmentsSubscription: Subscription
  constructor(
    private router: Router,
    private store: Store<fromOverview.State>
  ) {}

  ngOnInit() {
    this.filterCommitmentsSubscription = this.store
      .pipe(select(fromOverview.selectFilteredCommitmentsState))
      .subscribe((data: any) => {
        this.commitmentsWithDisplayOrder$.next(
          data.filter(c => c.displayOrder && c.displayOrder > 0)
        )
        this.commitmentsWithoutDisplayOrder$.next(data.filter(c => !c.displayOrder))
      })
  }
  ngOnDestroy(): void {
    this.filterCommitmentsSubscription.unsubscribe()
  }
  onDrop(event: CdkDragDrop<any>) {
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

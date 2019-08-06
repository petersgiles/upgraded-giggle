import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'

import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import { DataTableColumn } from '../../models/data-table-column'
import { CommitmentRow } from '../../models/commitment.model'
import { GetRefinedCommitments } from '../../reducers/overview/overview.actions'

@Component({
  selector: 'digital-first-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  filterCommitments$: Observable<CommitmentRow[]>
  rows: CommitmentRow[]
  public columns$: Observable<DataTableColumn[]>
  public count: number
  refinerGroupsSubscription$: Subscription
  constructor(
    private router: Router,
    private store: Store<fromOverview.State>
  ) {}

  ngOnInit() {
    this.refinerGroupsSubscription$ = this.store
      .pipe(select(fromRefiner.selectRefinerGroups))
      .subscribe(() => {
        this.store.dispatch(new GetRefinedCommitments(null))
      })

    this.columns$ = this.store.pipe(
      select(fromOverview.selectRefinedCommitmentsColumnsState)
    )

    this.filterCommitments$ = this.store.pipe(
      select(fromOverview.selectFilteredCommitmentsState)
    )
  }

  ngOnDestroy(): void {
    this.refinerGroupsSubscription$.unsubscribe()
  }

  handleCommitmentsRowClicked(item) {
    this.router.navigate(['/', 'commitment', item.id])
  }
}

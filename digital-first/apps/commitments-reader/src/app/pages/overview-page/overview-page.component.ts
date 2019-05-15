import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, of, Subscription } from 'rxjs'
import { withLatestFrom, map, filter, tap } from 'rxjs/operators'

import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'

import * as fromOverview from '../../reducers/overview/overview.reducer'
import { DataTableColumn } from '../../models/data-table-column'
import { CommitmentRow } from '../../models/commitment.model'

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
  public errorSubscription: Subscription
  constructor(
    private router: Router,
    private store: Store<fromOverview.State>
  ) {}

  ngOnInit() {
    this.columns$ = this.store.pipe(
      select(fromOverview.selectRefinedCommitmentsColumnsState)
    )

    this.filterCommitments$ = this.store
      .pipe(select(fromOverview.selectFilteredCommitmentsState))

    this.errorSubscription = this.store
      .pipe(select(fromOverview.selectErrorInOverviewState))
      .subscribe(error => console.log(error))
  }

  ngOnDestroy(): void {}

  handleCommitmentsRowClicked(item) {
    this.router.navigate(['/', 'commitment', item.id])
  }
}

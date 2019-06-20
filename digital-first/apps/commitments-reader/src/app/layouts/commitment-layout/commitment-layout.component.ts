import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Back } from '../../reducers/router.actions'
import { Commitment } from '../../models'

import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'
import { Observable } from 'rxjs'
import { selectAppSpinnerState } from '@digital-first/df-app-core'
import { ClearCurrentDetailedCommitment } from '../../reducers/commitment-detail/commitment-detail.actions'
@Component({
  selector: 'digital-first-commitment-layout',
  templateUrl: './commitment-layout.component.html',
  styleUrls: ['./commitment-layout.component.scss']
})
export class CommitmentLayoutComponent implements OnInit {
  commitment: Commitment
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private store: Store<fromDetail.State>
  ) {}
  isBusy$: Observable<boolean>

  ngOnInit() {
    this.isBusy$ = this.store.pipe(select(selectAppSpinnerState))
  }

  getTitle() {
    return 'Commitment'
  }

  handleGoBack($event) {
    this.store.dispatch(new ClearCurrentDetailedCommitment(null))
    this.store.dispatch(new Back())
  }

  handleCommitmentNavigation(link) {
    this.router.navigate(['commitment', this.commitment.id, link.route], {
      relativeTo: this.activateRoute
    })
  }
}

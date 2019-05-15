import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store'
import { Back } from '../../reducers/router.actions'
import { Commitment } from '../../models'

import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'
@Component({
  selector: 'digital-first-commitment-layout',
  templateUrl: './commitment-layout.component.html',
  styleUrls: ['./commitment-layout.component.scss']
})
export class CommitmentLayoutComponent implements OnInit {

 commitment: Commitment
  constructor(private router: Router,
    private activateRoute: ActivatedRoute,
    private store: Store<fromDetail.State>) { }

  ngOnInit() { }

  getTitle(commitment) {
    return 'Commitment'
  }

  handleGoBack($event) {
    this.store.dispatch(new Back())
  }

  handleCommitmentNavigation(link){
      this.router.navigate(['commitment', this.commitment.id, link.route], { relativeTo: this.activateRoute })
  }
}

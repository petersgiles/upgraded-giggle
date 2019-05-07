import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { map, takeUntil, filter, withLatestFrom, first } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
//import { AppConfigService } from '../../services/app-config.service'
import { CommitmentDetailService } from '../../reducers/commitment-detail/commitment-detail.service'
import * as indef from 'indefinite'
import { Commitment } from '../../models/commitment.model'
import { CommitmentDetailsState } from '../../reducers/commitment-detail/commitment-detail.reducer'
import { getCommitment } from '../../reducers/commitment-detail'

@Component({
  selector: 'digital-first-commitment-detail',
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})
export class CommitmentDetailComponent implements OnInit, OnDestroy {
  commitmentSubscription$: Subscription
  destroyed: boolean
  public commitment: Commitment
  constructor(
    private activatedRoute: ActivatedRoute,
    private commitmentDetailService: CommitmentDetailService,
    private store: Store<CommitmentDetailsState>
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        first(),
        filter(params => !!params.id),
        withLatestFrom(this.store.select(getCommitment))
      )
      .subscribe(([params, commitments]) => 
        {
          this.loadCommitment(params.id)
          
        })
  }

  loadCommitment(id: string) {
    this.commitmentSubscription$ = this.commitmentDetailService.LoadCommitment(id)
  }

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

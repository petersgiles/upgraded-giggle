import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription, Subject } from 'rxjs'
import { takeUntil, filter, withLatestFrom } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { CommitmentDetailService } from '../../reducers/commitment-detail/commitment-detail.service'
import * as indef from 'indefinite'
import { Commitment } from '../../models/commitment.model'
import { CommitmentDetailsState } from '../../reducers/commitment-detail/commitment-detail.reducer'
import { getCommitment } from '../../reducers/commitment-detail'
import { selectFilteredCommitmentsState } from '../../reducers/overview/overview.reducer'

@Component({
  selector: 'digital-first-commitment-detail',
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})
export class CommitmentDetailComponent implements OnInit, OnDestroy/*, AfterViewInit*/ {
  commitmentSubscription$: Subscription
  private readonly destroyed = new Subject<void>();
  public commitment: Commitment
  constructor(
    private activatedRoute: ActivatedRoute,
    private commitmentDetailService: CommitmentDetailService,
    private store: Store<CommitmentDetailsState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroyed),
        filter(params => !!params.id),
        withLatestFrom(this.store.select(selectFilteredCommitmentsState))
      )
      .subscribe(([params, commitments]) => {
       // let commitment = commitments.find(commitment => commitment.id === params.id)
        this.commitmentDetailService.LoadCommitment(params.id)
      })

      this.commitmentSubscription$ = this.store.pipe(select(getCommitment))
      .subscribe((commitment) => {
        this.commitment = commitment
      })
  }

 /*  ngAfterViewInit(){
    this.commitmentSubscription$ = this.store.pipe(select(getCommitment))
    .subscribe((commitment) => {
      this.commitment = commitment
    })
  } */

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
    this.destroyed.next();
    this.destroyed.complete();
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

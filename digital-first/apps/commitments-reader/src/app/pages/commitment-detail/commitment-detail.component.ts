import { Component, OnInit, OnDestroy,  ChangeDetectionStrategy, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription, Subject, Observable, of } from 'rxjs'
import { takeUntil, filter, map} from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { CommitmentDetailService } from '../../reducers/commitment-detail/commitment-detail.service'
import * as indef from 'indefinite'
import { Commitment } from '../../models/commitment.model'
import { CommitmentDetailsState } from '../../reducers/commitment-detail/commitment-detail.reducer'
//import { CommitmentDetail } from '../../reducers/commitment-detail'
import { getCommitment, getHandlingAdvice, getPMOUpdatedState, getPMCUpdatedState } from '../../reducers/commitment-detail'
import { CommitmentLocation } from '../../models/commitment.model'
import * as appSelectors from '../../reducers/app'

import { OPERATION_PMO, OPERATION_PMC } from '../../services/app-data/app-data.service'


@Component({
  selector: 'digital-first-commitment-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})

export class CommitmentDetailComponent implements OnInit, OnDestroy {
  userOperation$: Observable<any>
  commitmentSubscription$: Subscription
  electorate$: Observable<CommitmentLocation[]>
  bookType: string
  private readonly destroyed = new Subject<void>()
  commitment: Commitment
  commitment$: Observable<Commitment>
  handlingAdvice$: Observable<any>
  pmoHandlingAdvice: string
  pmcHandlingAdvice: string
  constructor(
    private activatedRoute: ActivatedRoute,
    private commitmentDetailService: CommitmentDetailService,
    private store: Store<CommitmentDetailsState>
  ) { }

  ngOnInit() {
    this.userOperation$ = this.commitmentDetailService.UserOperation

    this.commitment$ = this.store.pipe(select(getCommitment))
    this.handlingAdvice$ = this.store.pipe(select(getHandlingAdvice))
    
    this.store.pipe(select(appSelectors.App.selectAppBookTypeState))
    .subscribe(bookType => {
        this.bookType = bookType
    })

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroyed),
        filter(params => !!params.id)
      )
      .subscribe((params) => {
        this.commitmentDetailService.LoadCommitment(params.id,this.bookType)
        this.commitmentDetailService.getHandlingAdvices()
      })

       this.store.pipe(select(getPMOUpdatedState))
      .subscribe(pmoUpdate => {
        this.pmoHandlingAdvice = pmoUpdate
      })

      this.store.pipe(select(getPMCUpdatedState))
      .subscribe(pmcUpdate => {
        this.pmcHandlingAdvice = pmcUpdate
      })
 
      this.commitment$.subscribe(commitment => {this.commitment = commitment})
    }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getPMORight(operations: any) {
    return operations[OPERATION_PMO]
  }

  getPMCRight(operations: any) {
    return operations[OPERATION_PMC]
  }

  onPMOChange(event){
    this.commitmentDetailService.updatePmoHandlingAdviceCommitment({value: event.value, commitmentId: this.commitment.id, label: event.label})
  }

  onPMCChange(event){
    this.commitmentDetailService.updatePmcHandlingAdviceCommitment({value: event.value, commitmentId: this.commitment.id, label: event.label})
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

import { Component, OnInit, OnDestroy,  ChangeDetectionStrategy, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription, Subject, Observable, of } from 'rxjs'
import { takeUntil, filter, map} from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import * as indef from 'indefinite'
import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'
import { Commitment } from '../../models/commitment.model'
import { CommitmentLocation } from '../../models/commitment.model'
import { OPERATION_PMO, OPERATION_PMC } from '../../services/app-data/app-data.service'
import { GetDetailedCommitment, GetHandlingAdvices } from '../../reducers/commitment-detail/commitment-detail.actions';

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
  handlingAdvices$: Observable<any>
  pmoHandlingAdvice: string
  pmcHandlingAdvice: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromDetail.State>
  ) { }

  ngOnInit() {
    // this.userOperation$ = this.commitmentDetailService.UserOperation

    this.commitment$ = this.store.pipe(
      select(fromDetail.getDetailedCommitmentState)
    )

    this.handlingAdvices$ = this.store.pipe(select(fromDetail.getHandlingAdvicesState))

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroyed),
        filter(params => !!params.id)
      )
      .subscribe((params: any) => {

        this.store.dispatch(new GetDetailedCommitment({id: params.id}))
        this.store.dispatch(new GetHandlingAdvices(null))

        // this.commitmentDetailService.LoadCommitment(params.id,this.bookType)
        // this.commitmentDetailService.getHandlingAdvices()
      })

      //  this.store.pipe(select(fromDetail.getPMOUpdatedState))
      //   .subscribe(pmoUpdate => {
      //   this.pmoHandlingAdvice = pmoUpdate
      // })

      // this.store.pipe(select(fromDetail.getPMCUpdatedState))
      // .subscribe(pmcUpdate => {
      //   this.pmcHandlingAdvice = pmcUpdate
      // })
 
      // this.commitment$.subscribe(commitment => {this.commitment = commitment})
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
    // this.commitmentDetailService.updatePmoHandlingAdviceCommitment({value: event.value, commitmentId: this.commitment.id, label: event.label})
  }

  onPMCChange(event){
    // this.commitmentDetailService.updatePmcHandlingAdviceCommitment({value: event.value, commitmentId: this.commitment.id, label: event.label})
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

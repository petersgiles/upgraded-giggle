import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription, Subject, Observable } from 'rxjs'
import { takeUntil, filter } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import * as indef from 'indefinite'
import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'
import * as fromUser from '../../reducers/user/user.reducer'

import { Commitment } from '../../models/commitment.model'

import { CommitmentLocation } from '../../models/commitment.model'
import {
  OPERATION_PMO_HANDLING_ADVICE,
  OPERATION_PMC_HANDLING_ADVICE
} from '../../services/app-data/app-operations'
import {
  GetDetailedCommitment,
  GetHandlingAdvices,
  UpdatePMOHandlingAdvice,
  UpdatePMCHandlingAdvice
} from '../../reducers/commitment-detail/commitment-detail.actions'

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
  ) {}

  ngOnInit() {
    this.userOperation$ = this.store.pipe(
      select(fromUser.getCurrentUserOperations)
    )

    this.commitment$ = this.store.pipe(
      select(fromDetail.getDetailedCommitmentState)
    )

    this.handlingAdvices$ = this.store.pipe(
      select(fromDetail.getHandlingAdvicesState)
    )

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroyed),
        filter(params => !!params.id)
      )
      .subscribe((params: any) => {
        this.store.dispatch(new GetDetailedCommitment({ id: params.id }))
      })

    this.store
      .pipe(select(fromDetail.getPMOUpdatedState))
      .subscribe(pmoUpdate => {
        this.pmoHandlingAdvice = pmoUpdate
      })

    this.store
      .pipe(select(fromDetail.getPMCUpdatedState))
      .subscribe(pmcUpdate => {
        this.pmcHandlingAdvice = pmcUpdate
      })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  getPMORight(operations: any) {
    return operations[OPERATION_PMO_HANDLING_ADVICE]
  }

  getPMCRight(operations: any) {
    return operations[OPERATION_PMC_HANDLING_ADVICE]
  }

  onPMOChange($event) {
    console.log(`🤕`, $event)

    this.store.dispatch(
      new UpdatePMOHandlingAdvice({ handlingAdviceId: $event.value })
    )
  }

  onPMCChange($event) {
    console.log(`🤕`, $event)

    this.store.dispatch(
      new UpdatePMCHandlingAdvice({ handlingAdviceId: $event.value })
    )
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

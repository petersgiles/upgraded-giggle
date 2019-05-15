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
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'digital-first-commitment-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})
export class CommitmentDetailComponent implements OnInit, OnDestroy {
  userOperation$: Observable<any>
  electorate$: Observable<CommitmentLocation[]>
  commitment$: Observable<Commitment>
  handlingAdvices$: Observable<any>
  commitmentSubscription$: Subscription

  pmcHandlingAdviceForm = new FormGroup({
    pmcHandlingAdvice: new FormControl(null, [])
  })

  pmoHandlingAdviceForm = new FormGroup({
    pmoHandlingAdvice: new FormControl(null, [])
  })
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromDetail.State>
  ) {}

  ngOnInit() {
    this.userOperation$ = this.store.pipe(
      select(fromUser.getUserCurrentUserOperations)
    )

    this.commitment$ = this.store.pipe(
      select(fromDetail.getDetailedCommitmentState)
    )

    this.commitmentSubscription$ = this.commitment$.subscribe(
      (commitment: any) => {
        if (commitment) {
          this.pmcHandlingAdviceForm.patchValue({
            pmcHandlingAdvice: commitment.pmcHandlingAdvice
          })
          this.pmoHandlingAdviceForm.patchValue({
            pmoHandlingAdvice: commitment.pmoHandlingAdvice
          })
        }
      }
    )

    this.handlingAdvices$ = this.store.pipe(
      select(fromDetail.getHandlingAdvicesState)
    )

    this.activatedRoute.params
      .pipe(filter(params => !!params.id))
      .subscribe((params: any) => {
        this.store.dispatch(new GetDetailedCommitment({ id: params.id }))
      })
  }

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
  }

  getPMORight(operations: any) {
    return operations[OPERATION_PMO_HANDLING_ADVICE]
  }

  getPMCRight(operations: any) {
    return operations[OPERATION_PMC_HANDLING_ADVICE]
  }

  onPMOChange($event) {
    if ($event && $event.value) {
      // tslint:disable-next-line: no-console
      console.log(`🌶️`, $event.value)
      this.store.dispatch(
        new UpdatePMOHandlingAdvice({ handlingAdviceId: $event.value })
      )
    }
  }

  onPMCChange($event) {
    if ($event && $event.value) {
      // tslint:disable-next-line: no-console
      console.log(`🌶️`, $event.value)
      this.store.dispatch(
        new UpdatePMCHandlingAdvice({ handlingAdviceId: $event.value })
      )
    }
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

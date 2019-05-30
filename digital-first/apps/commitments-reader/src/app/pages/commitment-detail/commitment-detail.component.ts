import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import * as indef from 'indefinite'
import * as fromDetail from '../../reducers/commitment-detail/commitment-detail.reducer'

import { Commitment } from '../../models/commitment.model'

import { CommitmentLocation } from '../../models/commitment.model'
import {
  OPERATION_PMO_HANDLING_ADVICE,
  OPERATION_PMC_HANDLING_ADVICE
} from '@df/components'
import {
  GetDetailedCommitment,
  UpdatePMOHandlingAdvice,
  UpdatePMCHandlingAdvice
} from '../../reducers/commitment-detail/commitment-detail.actions'
import { FormGroup, FormControl } from '@angular/forms'
import { getUserOperationMatrix, getUserCurrentUserOperations } from '@digital-first/df-app-core'

// import { getUserCurrentUserPermissions } from '../../reducers/user/user.reducer'

@Component({
  selector: 'digital-first-commitment-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})
export class CommitmentDetailComponent implements OnInit, OnDestroy {
  dropdownPosition: 'top' | 'bottom' = 'bottom'
  userOperation$: Observable<any>
  electorate$: Observable<CommitmentLocation[]>
  commitment$: Observable<Commitment>
  handlingAdvices$: Observable<any>
  commitmentSubscription$: Subscription

  currentPMCHandling$: Observable<string>
  currentPMOHandling$: Observable<string>

  pmcHandlingAdviceForm = new FormGroup({
    pmcHandlingAdvice: new FormControl(null, [])
  })

  pmoHandlingAdviceForm = new FormGroup({
    pmoHandlingAdvice: new FormControl(null, [])
  })

  patchingForm: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromDetail.State>
  ) {}

  ngOnInit() {
    this.userOperation$ = this.store.pipe(
     // select(getUserOperationMatrix)
     select(getUserCurrentUserOperations)
    )

    this.commitment$ = this.store.pipe(
      select(fromDetail.getDetailedCommitmentState),
      map(val => val.commitment)
    )

    this.currentPMCHandling$ = this.store.pipe(
      select(fromDetail.getCurrentPMCHandlingAdviceState)
    )

    this.currentPMOHandling$ = this.store.pipe(
      select(fromDetail.getCurrentPMOHandlingAdviceState)
    )

    this.commitmentSubscription$ = this.commitment$.subscribe(
      (commitment: Commitment) => {
        if (commitment) {
          this.patchingForm = true

          this.pmcHandlingAdviceForm.patchValue({
            pmcHandlingAdvice: commitment.pmcHandlingAdvice.value
          })
          this.pmoHandlingAdviceForm.patchValue({
            pmoHandlingAdvice: commitment.pmoHandlingAdvice.value
          })
          this.patchingForm = false
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
      let currSelected = false
      let advice: any
      this.handlingAdvices$.subscribe(items => {
        advice = items.find(item => {
          if (item.value === $event.value) {
            return item
          }
        })
      })
      this.currentPMOHandling$.subscribe(pmo => {
        if (advice.label === pmo) {
          currSelected = true
        }
      })
      //avoid unnecessary call to update same item
      if (!currSelected) {
        this.store.dispatch(
          new UpdatePMOHandlingAdvice({ handlingAdviceId: $event.value })
        )
      }
    }
  }

  onPMCChange($event) {
    if ($event && $event.value) {
      let currSelected = false
      let advice: any
      this.handlingAdvices$.subscribe(items => {
        advice = items.find(item => {
          if (item.value === $event.value) {
            return item
          }
        })
      })
      this.currentPMCHandling$.subscribe(pmc => {
        if (advice.label === pmc) {
          currSelected = true
        }
      })
      //avoid unnecessary call to update same item
      if (!currSelected) {
        this.store.dispatch(
          new UpdatePMCHandlingAdvice({ handlingAdviceId: $event.value })
        )
      }
    }
  }

  public getIndefiniteArticle(term) {
    if (term) {
      const indefArticle =
        indef(term).substring(0, indef(term).indexOf(term) - 1) + ' '
      return indefArticle
    }
    return ' '
  }
}

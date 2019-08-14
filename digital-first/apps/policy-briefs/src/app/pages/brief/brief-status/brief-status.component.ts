import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'

import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import * as fromLookup from '../../../reducers/lookups/lookup.reducer'
import { Subscription, BehaviorSubject } from 'rxjs'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { SetActiveBriefStatus } from '../../../reducers/brief/brief.actions'
import { GetLookupStatuses } from '../../../reducers/lookups/lookup.actions'

const defaultValues = {
  status: '1'
}

@Component({
  selector: 'digital-first-brief-status',
  templateUrl: './brief-status.component.html',
  styleUrls: ['./brief-status.component.scss']
})
export class BriefStatusComponent implements OnInit {
  documentStatusList$: any

  @Input()
  brief

  status$: BehaviorSubject<string | number> = new BehaviorSubject("1")
  briefStatusSubscription$: Subscription

  constructor(private store: Store<fromRoot.State>, private fb: FormBuilder) {}

  public formValueChangeSubscription$: Subscription

  ngOnInit() {
    this.documentStatusList$ = this.store.pipe(
      select(fromLookup.selectLookupStatusesState)
    )

    this.briefStatusSubscription$ = this.store
      .pipe(select(fromBrief.selectBriefStatusState))
      .pipe(tap(briefStatus => console.log(`briefStatus`, briefStatus)))
      .subscribe(briefStatus => {
        if (briefStatus) {
          this.status$.next(`${briefStatus.id}`)
        }
      })

    this.store.dispatch(new GetLookupStatuses())
  }
  onSelectionChange(sli) {
    console.log(`briefStatus selected`, sli)
    if (sli) {
      this.store.dispatch(
        new SetActiveBriefStatus({
          activeBriefId: this.brief.id,
          status: sli.id
        })
      )
    }
  }
}

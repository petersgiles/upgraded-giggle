import { Component, OnInit, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { statuslist } from '../mock-data'
import { FormBuilder } from '@angular/forms'

import * as fromRoot from '../../../reducers/index'
import { Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SetActiveBriefStatus } from '../../../reducers/brief/brief.actions';

const defaultValues = {
  status: "1"
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

  constructor(private store: Store<fromRoot.State>, private fb: FormBuilder) {}

  public form = this.fb.group({
    status: [null]
  })

  public formValueChangeSubscription$: Subscription

  ngOnInit() {
    this.documentStatusList$ = new BehaviorSubject(statuslist)

    this.form.patchValue(defaultValues)

    this.formValueChangeSubscription$ = this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(formEvent => console.log(`formEvent`, formEvent))
      )
      .subscribe(formEvent => {
        if (formEvent.status) {
          this.store.dispatch(
            new SetActiveBriefStatus({
              activeBriefId: this.brief.id,
              status: formEvent.status
            })
          )
        }
      })
  }
}

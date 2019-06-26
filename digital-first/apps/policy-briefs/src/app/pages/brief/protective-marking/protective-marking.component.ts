import { Component, OnInit, Input } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { SetActiveBriefProtectiveMarking } from '../../../reducers/brief/brief.actions'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { Subscription, BehaviorSubject } from 'rxjs'
import { classifications, dlms } from '../mock-data'

const defaultValues = {
  securityClassification: 'UNCLASSIFIED',
  dLM: 'Sensitive'
}

@Component({
  selector: 'digital-first-protective-marking',
  templateUrl: './protective-marking.component.html',
  styleUrls: ['./protective-marking.component.scss']
})
export class ProtectiveMarkingComponent implements OnInit {
  @Input()
  brief
  public classificationform: boolean
  public form = this.fb.group({
    securityClassification: [null],
    dLM: [null]
  })

  public classifications$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(classifications)
  public dlms$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(dlms)

  public formValueChangeSubscription$: Subscription

  constructor(private store: Store<fromRoot.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue(defaultValues)

    this.formValueChangeSubscription$ = this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(formEvent => console.log(`formEvent`, formEvent))
      )
      .subscribe((formEvent: any) => {
        this.store.dispatch(
          new SetActiveBriefProtectiveMarking({
            activeBriefId: this.brief.id,
            securityClassification: formEvent.securityClassification,
            dLM: formEvent.dLM
          })
        )
      })
  }
}

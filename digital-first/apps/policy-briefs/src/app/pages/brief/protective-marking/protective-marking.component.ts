import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '../../../reducers/index'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { SetActiveBriefProtectiveMarking } from '../../../reducers/brief/brief.actions';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const defaultValues = {
  securityClassification: "UNCLASSIFIED",
  dLM: "Sensitive",
}


@Component({
  selector: 'digital-first-protective-marking',
  templateUrl: './protective-marking.component.html',
  styleUrls: ['./protective-marking.component.scss']
})
export class ProtectiveMarkingComponent implements OnInit {

  @Input()
  brief

  public form = this.fb.group({
    securityClassification: [null],
    dLM: [null]
  })

  classifications = [{
    caption: "UNCLASSIFIED",
    value: "UNCLASSIFIED"
  }, {
    caption: "IN CONFIDENCE",
    value: "IN CONFIDENCE"
  },{
    caption: "PROTECTED",
    value: "PROTECTED"
  }]

  dlms = [{
    caption: "Not for tabling - For Official Use Only",
    value: "Not for tabling - For Official Use Only"
  }, {
    caption: "For Official Use Only",
    value: "For Official Use Only"
  },{
    caption: "Sensitive",
    value: "Sensitive"
  },{
    caption: "Sensitive Cabinet",
    value: "Sensitive Cabinet"
  },{
    caption: "Sensitive Legal",
    value: "Sensitive Legal"
  },{
    caption: "Sensitive Personal",
    value: "Sensitive Personal"
  }]

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
              dLM: formEvent.dLM,
            })
          )

      })
  }
}
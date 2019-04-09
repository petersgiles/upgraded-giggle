import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { DocumentStatus } from '@df/components'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { discussionTree } from './mock-data';

export const statuslist: DocumentStatus[] = [
  {
    id: '1',
    icon: 'people',
    caption: 'In Draft',
    colour: 'Pink',
    order: 1
  },
  {
    id: '2',
    icon: 'how_to_reg',
    caption: 'Ready',
    colour: 'GhostWhite',
    order: 2
  },
  {
    id: '3',
    icon: 'cancel_presentation',
    caption: 'Cancelled',
    colour: 'Crimson',
    order: 3
  }
]

const defaultBrief = {
  status: '1'
}

@Component({
  selector: 'digital-first-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.scss']
})
export class BriefComponent implements OnInit {

  background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')
  public documentStatusList$: BehaviorSubject<any>

  public comments$: BehaviorSubject<Comment[]> = new BehaviorSubject(discussionTree)
  public activeComment$: BehaviorSubject<Comment> = new BehaviorSubject(null)

  public form = this.fb.group({
    status: [null]
  })
  formValueChangeSubscription$: Subscription

  // tslint:disable-next-line:no-empty
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.documentStatusList$ = new BehaviorSubject(statuslist)

    this.form.patchValue(defaultBrief)

    this.formValueChangeSubscription$ = this.form.valueChanges
    .pipe(
      debounceTime(3000),
      distinctUntilChanged()
    )
    .subscribe(blurEvent => {
      this.handleChange(blurEvent)
      this.formValueChangeSubscription$.unsubscribe()
    })
  }

  handleChange($event) {
    const editedBrief = this.mapFormToBrief(this.form.value)

    // emit editedBrief
  }

  mapFormToBrief(brief): any {
    const map: any = {
      ...brief,

    }
    return map
  }

  handleSubmit($event) {
    // tslint:disable-next-line:no-console
    console.log('handleSubmit', $event)
  }
}

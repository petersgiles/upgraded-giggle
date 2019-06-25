import { Component, OnInit } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { select, Store } from '@ngrx/store'
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  tap,
  first
} from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import {
  SetActiveBrief
} from '../../../reducers/brief/brief.actions'
import { SetActiveBriefPath } from '../../../reducers/navigation/navigation.actions'
import { EMPTY, BehaviorSubject, Subscription } from 'rxjs'
import { FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { classifications, dlms } from '../mock-data'
import { policies, subpolicies } from 'apps/policy-briefs/src/devdata/data'
import { MdcDialog } from '@angular-mdc/web';
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@df/components';

const defaultValues = {
  title: null,
  policy: null,
  subpolicy: null,
  sortOrder: 99,
  securityClassification: 'UNCLASSIFIED',
  dLM: 'Sensitive',
  processingInstruction: null,
  recommendedDirection: null
}

const actionItem = {
  description: [''],
  outcome1: ['Agree'],
  outcome2: ['Disagree'],
  outcome3: ['Clarification Required']
}

const policyMap = policies.map(p => ({ caption: p.Title, value: `${p.Id}` }))
const subpolicyMap = subpolicies.map(p => ({
  caption: p.Title,
  value: `${p.Id}`
}))

@Component({
  selector: 'digital-first-brief-data-editor',
  templateUrl: './brief-data-editor.component.html',
  styleUrls: ['./brief-data-editor.component.scss']
})
export class BriefDataEditorComponent implements OnInit {
  brief$: any
  selectId$: any
  activeBriefId: any

  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')

  public policies$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(policyMap)

  public subpolicies$: BehaviorSubject<
    {
      caption: string
      value: string
    }[]
  > = new BehaviorSubject(subpolicyMap)

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

  public form = this.fb.group({
    title: [null],
    securityClassification: [null],
    sortOrder: [null],
    dLM: [null],
    policy: [null],
    subpolicy: [null],
    processingInstruction: [null],
    recommendedDirection: [null],
    actions: this.fb.array([]),
  })

  get actions(): FormArray {
    return this.form.get('actions') as FormArray
  }

  get action(): FormGroup {
    return this.fb.group(actionItem)
  }


  public handleAddAction(): void {
    this.actions.push(this.fb.group(actionItem))
  }

  public handleRemoveAction(index: any, action: any) {

    // const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
    //   escapeToClose: true,
    //   clickOutsideToClose: true
    // })

    // dialogRef
    //   .afterClosed()
    //   .pipe(
    //     first()
    //   )
    //   .subscribe(result => {
    //     console.log(result)
      
    //     if (result === ARE_YOU_SURE_ACCEPT) {
    //       console.log(index, this.actions)

    //       // this.store.dispatch(
    //       //   new RemoveComment({ id: $event.id, brief: $event.hostId })
    //       // )
    //     }
    //   })
      this.actions.removeAt(index)

   
  }
  public formValueChangeSubscription$: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder, 
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))

    this.form.patchValue(defaultValues)

    this.selectId$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.activeBriefId = params.get('id')

          console.log(`🍏`, this.activeBriefId)

          this.store.dispatch(
            new SetActiveBrief({ activeBriefId: this.activeBriefId })
          )
          this.store.dispatch(
            new SetActiveBriefPath({ activeBriefId: this.activeBriefId })
          )

          return EMPTY
        })
      )
      .subscribe()
  }

  public handleSubmit(form: any) {
    if (!this.form.valid) {
      return
    }
    const editedCard = {
      ...this.form.value
    }
  }
}

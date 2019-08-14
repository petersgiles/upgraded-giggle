import { Component, OnInit, OnDestroy } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { select, Store } from '@ngrx/store'
import { switchMap, tap } from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import {
  SetActiveBrief,
  SetBriefDLM,
  SetBriefSecurityClassification,
  SetBriefPolicy
} from '../../../reducers/brief/brief.actions'
import { SetActiveBriefPath } from '../../../reducers/navigation/navigation.actions'
import { EMPTY, Subscription, Observable, BehaviorSubject, Subject } from 'rxjs'
import { FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { MdcDialog } from '@angular-mdc/web'
import { selectAppBackgroundColour } from '@digital-first/df-app-core'
import {
  GetLookupPolicies,
  GetLookupSubPolicies,
  GetLookupCommitments,
  GetLookupClassifications,
  GetLookupDLMs
} from '../../../reducers/lookups/lookup.actions'
import {
  selectLookupPoliciesState,
  selectLookupSubpoliciesState,
  selectLookupCommitmentsState,
  selectLookupClassificationsState,
  selectLookupDLMsState
} from '../../../reducers/lookups/lookup.reducer'
import { Brief } from '../../../models'

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

const commitmentItem = {
  commitment: [null]
}

const actionItem = {
  description: [''],
  outcome1: ['Agree'],
  outcome2: ['Disagree'],
  outcome3: ['Clarification Required']
}

@Component({
  selector: 'digital-first-brief-data-editor',
  templateUrl: './brief-data-editor.component.html',
  styleUrls: ['./brief-data-editor.component.scss']
})
export class BriefDataEditorComponent implements OnInit, OnDestroy {
  brief$: any
  selectId$: any
  activeBriefId: any
  subPolicyValueChangeSubscription$: Subscription;
  policyValueChangeSubscription$: Subscription;

  public background$: Observable<string>

  public policies$: Observable<
    {
      caption: string
      value: string
    }[]
  >
  subpoliciesSubscription$: Subscription
  subpolicies: any[]
  public subpolicies$: BehaviorSubject<
    {
      caption: string
      value: string
      policy: string
    }[]
  > = new BehaviorSubject([])

  public commitment$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  public classifications$: Observable<
    {
      caption: string
      value: string
    }[]
  >

  public dlms$: Observable<
    {
      caption: string
      value: string
    }[]
  >

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
    commitments: this.fb.array([])
  })
  subSecurityClassificationValueChangeSubscription$: Subscription;
  subDLMValueChangeSubscription$: Subscription;


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
    this.actions.removeAt(index)
  }

  get commitments(): FormArray {
    return this.form.get('commitments') as FormArray
  }

  get commitment(): FormGroup {
    return this.fb.group(commitmentItem)
  }

  public handleAddCommitment(): void {
    this.commitments.push(this.fb.group(commitmentItem))
  }

  public handleRemoveCommitment(index: any, action: any) {
    this.commitments.removeAt(index)
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
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState)).pipe(
      tap((brief: Brief) => {
        if (brief) {
          this.unsubscribeChanges()

          const patch = {
            title: brief.title,
            securityClassification: brief.securityClassification,
            sortOrder: brief.order,
            dLM: brief.dLM,
            policy: brief.policy ? brief.policy.id : null,
            subpolicy: brief.subPolicy ? brief.subPolicy.id : null,
            processingInstruction: null,
            recommendedDirection: null
          }

          var nextSP = this.subpolicies.filter(sp => sp.policy == patch.policy)
          this.subpolicies$.next(nextSP)
          this.form.patchValue(patch)
          this.subscribeChanges()
        }
      })
    )

    this.background$ = this.store.pipe(select(selectAppBackgroundColour))
    this.policies$ = this.store.pipe(select(selectLookupPoliciesState))
    this.subpoliciesSubscription$ = this.store
      .pipe(select(selectLookupSubpoliciesState))
      .subscribe(next => {
        this.subpolicies = next
        this.subpolicies$.next(this.subpolicies)
      })
    this.commitment$ = this.store.pipe(select(selectLookupCommitmentsState))
    this.classifications$ = this.store.pipe(
      select(selectLookupClassificationsState)
    )
    this.dlms$ = this.store.pipe(select(selectLookupDLMsState))

    this.store.dispatch(new GetLookupPolicies())
    this.store.dispatch(new GetLookupSubPolicies())
    this.store.dispatch(new GetLookupClassifications())
    this.store.dispatch(new GetLookupDLMs())

    // this.store.dispatch(new GetLookupCommitments())

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

  ngOnDestroy(): void {
    this.selectId$.unsubscribe()
    this.subpoliciesSubscription$.unsubscribe()
    this.unsubscribeChanges()
  }

  unsubscribeChanges(): void {
    if(this.policyValueChangeSubscription$) this.policyValueChangeSubscription$.unsubscribe()
    if(this.subPolicyValueChangeSubscription$) this.subPolicyValueChangeSubscription$.unsubscribe()
    if(this.subSecurityClassificationValueChangeSubscription$) this.subSecurityClassificationValueChangeSubscription$.unsubscribe()
    if(this.subDLMValueChangeSubscription$) this.subDLMValueChangeSubscription$.unsubscribe()
  }

  subscribeChanges(): void {
    this.policyValueChangeSubscription$ = this.form.get('policy').valueChanges.subscribe(data => {

      console.log('onChanges policy', data)

      var nextSP = this.subpolicies.filter(sp => sp.policy == data)
   
      var patch = null
      if(nextSP.length === 1){
        patch = nextSP[0].value
      } else {
        nextSP.unshift({
          caption: 'Please Select',
          value: -1
        })   
        patch = -1
      }
      this.subpolicies$.next(nextSP)
      this.form.patchValue({ subpolicy: patch })
    })

    this.subPolicyValueChangeSubscription$ = this.form.get('subpolicy').valueChanges.subscribe(data => {

      var policy = this.form.get('policy').value
      console.log('onChanges subpolicy', policy, data)
      if (data > 0) {        
        this.store.dispatch(
          new SetBriefPolicy({
            activeBriefId: this.activeBriefId,
            policy: policy,
            subpolicy: data
          })
        )
      }
    })

    this.subSecurityClassificationValueChangeSubscription$ = this.form.get('securityClassification').valueChanges.subscribe(data => {
      
      console.log('onChanges securityClassification', data)

      this.store.dispatch(
        new SetBriefSecurityClassification({
          activeBriefId: this.activeBriefId,
          securityClassification: data
        })
      )
    })

    this.subDLMValueChangeSubscription$ = this.form.get('dLM').valueChanges.subscribe(data => {
      
      console.log('onChanges dLM', data)

      this.store.dispatch(
        new SetBriefDLM({
          activeBriefId: this.activeBriefId,
          dLM: data
        })
      )
    })
  }

  handleView($event) {
    this.router.navigate(['/brief', this.activeBriefId])
  }

  public handleSubmit(form: any) {
    if (!this.form.valid) {
      return
    }
    const edited = {
      ...this.form.value
    }

    this.store.dispatch(
      new SetActiveBriefPath({ activeBriefId: this.activeBriefId })
    )
  }
}

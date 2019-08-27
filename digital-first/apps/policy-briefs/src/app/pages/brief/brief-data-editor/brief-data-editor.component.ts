import { Component, OnInit, OnDestroy } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { select, Store } from '@ngrx/store'
import {
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import {
  SetActiveBrief,
  SetBriefDLM,
  SetBriefSecurityClassification,
  SetBriefPolicy,
  SetBriefRecommendedDirection,
  SetBriefRecommendation
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
  recommendedDirection: null
}

const commitmentItem = {
  commitment: [null]
}

const actionItem = {
  id: [],
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
  subPolicyValueChangeSubscription$: Subscription
  policyValueChangeSubscription$: Subscription
  securityClassificationValueChangeSubscription$: Subscription
  dLMValueChangeSubscription$: Subscription
  recommendedDirectionValueChangeSubscription$: Subscription
  actionsValueChangeSubscriptions$: Subscription[]
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
    this.unsubscribeChanges()
    this.actions.push(this.fb.group(actionItem))
    this.subscribeChanges()
  }

  public handleRemoveAction(index: any, action: any) {
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
            recommendedDirection: brief.recommendedDirection
          }

          var nextSP = this.subpolicies.filter(sp => sp.policy == patch.policy)
          this.subpolicies$.next(nextSP)
          this.form.patchValue(patch)

          this.actions.clear()

          brief.recommendations.forEach(r =>
            this.actions.push(
              this.fb.group({
                id: [r.id],
                description: [r.recommendation],
                outcome1: [r.outcome1],
                outcome2: [r.outcome2],
                outcome3: [r.outcome3]
              })
            )
          )

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
    this.classifications$ = this.store.pipe(
      select(selectLookupClassificationsState)
    )
    this.dlms$ = this.store.pipe(select(selectLookupDLMsState))

    this.store.dispatch(new GetLookupPolicies())
    this.store.dispatch(new GetLookupSubPolicies())
    this.store.dispatch(new GetLookupClassifications())
    this.store.dispatch(new GetLookupDLMs())

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
    if (this.policyValueChangeSubscription$)
      this.policyValueChangeSubscription$.unsubscribe()
    if (this.subPolicyValueChangeSubscription$)
      this.subPolicyValueChangeSubscription$.unsubscribe()
    if (this.securityClassificationValueChangeSubscription$)
      this.securityClassificationValueChangeSubscription$.unsubscribe()
    if (this.dLMValueChangeSubscription$)
      this.dLMValueChangeSubscription$.unsubscribe()
    if (this.recommendedDirectionValueChangeSubscription$)
      this.recommendedDirectionValueChangeSubscription$.unsubscribe()
    if (this.actionsValueChangeSubscriptions$)
      this.actionsValueChangeSubscriptions$.forEach(s => s.unsubscribe())

  }

  subscribeChanges(): void {
    this.policyValueChangeSubscription$ = this.form
      .get('policy')
      .valueChanges.subscribe(data => {
        console.log('onChanges policy', data)

        var nextSP = this.subpolicies.filter(sp => sp.policy == data)

        var patch = null
        if (nextSP.length === 1) {
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

    this.subPolicyValueChangeSubscription$ = this.form
      .get('subpolicy')
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
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

    this.securityClassificationValueChangeSubscription$ = this.form
      .get('securityClassification')
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log('onChanges securityClassification', data)

        this.store.dispatch(
          new SetBriefSecurityClassification({
            activeBriefId: this.activeBriefId,
            securityClassification: data
          })
        )
      })

    this.dLMValueChangeSubscription$ = this.form
      .get('dLM')
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log('onChanges dLM', data)

        this.store.dispatch(
          new SetBriefDLM({
            activeBriefId: this.activeBriefId,
            dLM: data
          })
        )
      })

    this.recommendedDirectionValueChangeSubscription$ = this.form
      .get('recommendedDirection')
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log('onChanges recommendedDirection', data)

        this.store.dispatch(
          new SetBriefRecommendedDirection({
            activeBriefId: this.activeBriefId,            
            text: data
          })
        )
      })

    this.actionsValueChangeSubscriptions$ = []

    this.actions.controls.forEach(control => {
      this.actionsValueChangeSubscriptions$.push(
        control.valueChanges
          .pipe(
            debounceTime(400),
            distinctUntilChanged()
          )
          .subscribe(data => {
            // console.log(this.actions.controls.indexOf(control))
            console.log('onChanges actions', data)

            this.store.dispatch(
              new SetBriefRecommendation({
                ...data,
                activeBriefId: this.activeBriefId,    
              })
            )
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

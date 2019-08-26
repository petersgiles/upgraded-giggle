import { Component, OnInit, OnDestroy } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import * as fromLookup from '../../../reducers/lookups/lookup.reducer'
import { select, Store } from '@ngrx/store'
import { switchMap } from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import {
  SetActiveBrief,
  GetActiveBriefSubscriptions,
  ToggleBriefSubscription
} from '../../../reducers/brief/brief.actions'
import { SetActiveBriefPath } from '../../../reducers/navigation/navigation.actions'
import { EMPTY, BehaviorSubject, Observable, Subscription } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { MdcDialog } from '@angular-mdc/web'
import { selectAppBackgroundColour } from '@digital-first/df-app-core'
import {
  GetLookupActivities,
  GetLookupStatuses
} from '../../../reducers/lookups/lookup.actions'
import { user_notifications } from 'devdata/data'

@Component({
  selector: 'digital-first-brief-subscription-editor',
  templateUrl: './brief-subscription-editor.component.html',
  styleUrls: ['./brief-subscription-editor.component.scss']
})
export class BriefSubscriptionEditorComponent implements OnInit, OnDestroy {
  public background$: Observable<string>
  public brief$: any
  public selectId$: any
  public documentStatusListSubscription$: Subscription
  public activitiesSubscription$: Subscription
  public documentStatusList: any
  public activities: any
  public notificationsSubscription$: Subscription
  public notifications: any

  public activeBriefId: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    public dialog: MdcDialog
  ) {}

  ngOnDestroy(){
    this.activitiesSubscription$.unsubscribe()
    this.documentStatusListSubscription$.unsubscribe()
    this.notificationsSubscription$.unsubscribe()
  }

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
    this.background$ = this.store.pipe(select(selectAppBackgroundColour))
    this.documentStatusListSubscription$ = this.store.pipe(
      select(fromLookup.selectLookupStatusesState)
    )
    .subscribe(p => this.documentStatusList = p)
    this.activitiesSubscription$ = this.store.pipe(
      select(fromLookup.selectLookupActivitiesState)
    )
    .subscribe(p => this.activities = p)
    this.notificationsSubscription$ = this.store.pipe(
      select(fromBrief.selectActiveBriefSubscriptions)
    )
    .subscribe(p => this.notifications = p)
    

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

          this.store.dispatch(new GetLookupStatuses())

          this.store.dispatch(new GetLookupActivities())

          this.store.dispatch(
            new GetActiveBriefSubscriptions({
              activeBriefId: this.activeBriefId
            })
          )

          return EMPTY
        })
      )
      .subscribe()
  }

  checked(arr, id) {
    return arr.some(p => `${p.id}` === `${id}`)
  }

  handleToggleActivity(user, id) { 

    let activities = []
    const found = user.activity.some(p => `${p.id}` === `${id}`)
    if(found){
      activities =  user.activity.filter(p => `${p.id}` !== `${id}`)
    } else {
      activities = [...user.activity, {id: id}]
    }


    const params = {
      briefId: this.activeBriefId,
      userId: user.id,
      activity: activities,
      status: user.status
    }

    this.store.dispatch(
      new ToggleBriefSubscription(params)
    )
  }

  handleToggleStatus(user, id) {

    let documentStatusList = []
    const found = user.status.some(p => `${p.id}` === `${id}`)
    if(found){
      documentStatusList = user.status.filter(p => `${p.id}` !== `${id}`)
    } else {
      documentStatusList = [...user.status, {id: id}]
    }

   
    const params = {
      briefId: this.activeBriefId,
      userId: user.id,
      activity: user.activity,
      status: documentStatusList
    }

    this.store.dispatch(
      new ToggleBriefSubscription(params)
    )
  }
  handleView($event) {
    this.router.navigate(['/brief', this.activeBriefId])
  }
}

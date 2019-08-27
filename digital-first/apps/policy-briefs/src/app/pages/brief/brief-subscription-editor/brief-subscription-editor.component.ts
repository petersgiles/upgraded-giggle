import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
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

@Component({
  selector: 'digital-first-brief-subscription-editor',
  templateUrl: './brief-subscription-editor.component.html',
  styleUrls: ['./brief-subscription-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BriefSubscriptionEditorComponent implements OnInit, OnDestroy {
  public background$: Observable<string>
  public brief$: any
  public selectId$: any


  public documentStatusList$: any
  public activities$: any
  public notifications$: any

  public activeBriefId: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    public dialog: MdcDialog
  ) {}

  ngOnDestroy() {

  }

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
    this.background$ = this.store.pipe(select(selectAppBackgroundColour))
    this.documentStatusList$ = this.store
      .pipe(select(fromLookup.selectLookupStatusesState))
 
    this.activities$ = this.store
      .pipe(select(fromLookup.selectLookupActivitiesState))
 
    this.notifications$ = this.store
      .pipe(select(fromBrief.selectActiveBriefSubscriptions))


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

  handleToggleSubscription(notification, id, type) {
    const found = notification[type].some(p => `${p.id}` === `${id}`)
    
    console.log(notification)

    this.store.dispatch(
      new ToggleBriefSubscription({
        briefId: this.activeBriefId,
        userId: notification.user_id,
        data: { type: type, id: id, on: !found },
        name: notification.name
      })
    )
  }

  handleView($event) {
    this.router.navigate(['/brief', this.activeBriefId])
  }
}

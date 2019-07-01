import { Component, OnInit } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { select, Store } from '@ngrx/store'
import { switchMap } from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { SetActiveBrief } from '../../../reducers/brief/brief.actions'
import { SetActiveBriefPath } from '../../../reducers/navigation/navigation.actions'
import { EMPTY, BehaviorSubject, Observable } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { statuslist, activityList, notifications, user_notifications } from '../mock-data'
import { MdcDialog } from '@angular-mdc/web'
import { selectAppBackgroundColour } from '@digital-first/df-app-core';

@Component({
  selector: 'digital-first-brief-subscription-editor',
  templateUrl: './brief-subscription-editor.component.html',
  styleUrls: ['./brief-subscription-editor.component.scss']
})
export class BriefSubscriptionEditorComponent implements OnInit {
  public background$: Observable<string>
  public brief$: any
  public selectId$: any
  public documentStatusList$: BehaviorSubject<any>
  public activities$: BehaviorSubject<any>
  public notifications$: BehaviorSubject<any>

  public activeBriefId: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
    this.background$ = this.store.pipe(select(selectAppBackgroundColour))
    this.documentStatusList$ = new BehaviorSubject(statuslist)
    this.activities$ = new BehaviorSubject(activityList)
    this.notifications$ = new BehaviorSubject([])

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
  
          const users = user_notifications.filter(u => `${u.brief_id}` === this.activeBriefId)
          this.notifications$.next(users)
          return EMPTY
        })
      )
      .subscribe()
  }

  checked(arr, id) {
    return id in arr.map(p=> p.id)
  }

  handleView($event) {
    this.router.navigate(['/brief', this.activeBriefId])
  }
}

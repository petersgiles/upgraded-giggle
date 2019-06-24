import { Component, OnInit, OnDestroy } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { switchMap, first } from 'rxjs/operators'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { SetActiveBrief } from '../../../reducers/brief/brief.actions'
import { MdcDialog } from '@angular-mdc/web'

import {
  SetActiveBriefPath,
  GetNavigations,
  ToggleExpand
} from '../../../reducers/navigation/navigation.actions'
import { GetDiscussion, AddComment, RemoveComment, ReplyToComment } from '../../../reducers/discussion/discussion.actions'
import { EMPTY, BehaviorSubject, Subscription } from 'rxjs'

import * as fromRoot from '../../../reducers/index'
import * as fromNavigation from '../../../reducers/navigation/navigation.reducer'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import * as fromDiscussion from '../../../reducers/discussion/discussion.reducer'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { SetActiveBriefStatus } from '../../../reducers/brief/brief.actions'
import { FormBuilder } from '@angular/forms';
import { statuslist } from '../mock-data';

const defaultBrief = {
  status: '1'
}

@Component({
  selector: 'digital-first-brief-reader',
  templateUrl: './brief-reader.component.html',
  styleUrls: ['./brief-reader.component.scss']
})
export class BriefReaderComponent implements OnInit {
  documentStatusList$: any
  public form = this.fb.group({
    status: [null]
  })

  public formValueChangeSubscription$: Subscription
  comments$: any;
  activeComment$: any;
  brief$: any;
  selectId$: any;
  activeBriefId: string;

  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.documentStatusList$ = new BehaviorSubject(statuslist)


    this.comments$ = this.store.pipe(
      select(fromDiscussion.selectDiscussionState)
    )

    this.activeComment$ = this.store.pipe(
      select(fromDiscussion.selectActiveCommentState)
    )

    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))

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
          this.store.dispatch(
            new GetDiscussion({ activeBriefId: this.activeBriefId })
          )

          return EMPTY
        })
      )
      .subscribe()

    this.store.dispatch(new GetNavigations())

    this.form.patchValue(defaultBrief)

    this.formValueChangeSubscription$ = this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(formEvent => {
        if (formEvent.status) {
          this.store.dispatch(
            new SetActiveBriefStatus({
              activeBriefId: "0",
              status: formEvent.status
            })
          )
        }
      })
  }

  ngOnDestroy() {

  }
}

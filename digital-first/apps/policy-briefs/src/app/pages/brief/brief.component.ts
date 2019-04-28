import { Component, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription, Observable, EMPTY } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { DocumentStatus, NavigatorTreeNode } from '@df/components'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  first,
  switchMap
} from 'rxjs/operators'
import { discussionTree, statuslist, baconIpsum } from './mock-data'
import { toTree, sortBy } from '@df/utils'
import { Store, select } from '@ngrx/store'
import * as fromNavigation from '../../reducers/navigation/navigation.reducer'
import * as fromBrief from '../../reducers/brief/brief.reducer'
import * as fromDiscussion from '../../reducers/discussion/discussion.reducer'

import { GetNavigations } from '../../reducers/navigation/navigation.actions'
import { GetDiscussion } from '../../reducers/discussion/discussion.actions'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { SetActiveBrief } from '../../reducers/brief/brief.actions';
const defaultBrief = {
  status: '1'
}

@Component({
  selector: 'digital-first-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.scss']
})
export class BriefComponent implements OnInit, OnDestroy {
  public nodes$: Observable<any>

  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')
  public documentStatusList$: BehaviorSubject<any>

  public comments$: Observable<any>
  public activeComment$: Observable<any>

  public form = this.fb.group({
    status: [null]
  })

  public formValueChangeSubscription$: Subscription
  public storyData: NavigatorTreeNode[]

  public tree: any
  selectId$: any
  fileLeafRef$: Observable<any>;
  brief$: Observable<any>;

  // tslint:disable-next-line:no-empty
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromNavigation.State>
  ) {}

  ngOnInit() {
    this.nodes$ = this.store.pipe(
      select(fromNavigation.selectNavigationNodeTreeState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`🌲 `, result))
    )

    this.comments$ = this.store.pipe(
      select(fromDiscussion.selectDiscussionState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result))
    )

    this.documentStatusList$ = new BehaviorSubject(statuslist)

    this.brief$ = this.store.pipe(
      select(fromBrief.selectBriefState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`💬 `, result))
    )

    this.fileLeafRef$ = this.store.pipe(
      select(fromBrief.selectFileLeafRefState),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`💬 `, result))
    )

    this.selectId$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {

          const activeBriefId =  params.get('id')
          // tslint:disable-next-line: no-console
          console.log(`🐢 `, activeBriefId)

          this.store.dispatch(new SetActiveBrief({activeBriefId}))
          this.store.dispatch(new GetDiscussion({activeBriefId}))

          return EMPTY
        })
      )
      .subscribe()

    this.store.dispatch(new GetNavigations())

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

  public ngOnDestroy() {

  }

  handleChange($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleChange', $event)
  }

  mapFormToBrief(brief): any {
    const editedBrief: any = {
      ...brief
    }
    return editedBrief
  }

  handleSubmit($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleSubmit', $event)
  }

  handleSelect($event) {
    // tslint:disable-next-line:no-console
    console.log(`🐋 -  Select`, $event)
  }

  public handleToggleExpandNavigatorNode($event) {
    // tslint:disable-next-line:no-console
    console.log(`🎯 -  handleToggleExpandNavigatorNode`, $event.node)
  }

  public handleSelectNavigatorNode(node) {
    this.router.navigate(['/', 'brief', node.data.briefId ])
  }

  public handleReplyToComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  ReplyToComment`, $event)
  }
  public handleDeleteComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  DeleteComment`, $event)
  }
  public handleAddComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  AddComment`, $event)
  }

  public handleEvent($event, action) {
    // tslint:disable-next-line:no-console
    console.log(`🦍 - ${action}`, $event)
  }
}

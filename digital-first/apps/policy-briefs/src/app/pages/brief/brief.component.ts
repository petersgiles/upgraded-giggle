import { Component, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription, Observable, EMPTY } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import {
  DocumentStatus,
  NavigatorTreeNode,
  DialogAreYouSureComponent,
  ARE_YOU_SURE_ACCEPT
} from '@df/components'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  first,
  switchMap
} from 'rxjs/operators'
import { statuslist } from './mock-data'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '../../reducers/index'
import * as fromNavigation from '../../reducers/navigation/navigation.reducer'
import * as fromBrief from '../../reducers/brief/brief.reducer'
import * as fromDiscussion from '../../reducers/discussion/discussion.reducer'

import {
  GetNavigations,
  ToggleExpand,
  SetActiveBriefPath
} from '../../reducers/navigation/navigation.actions'
import {
  GetDiscussion,
  AddComment,
  RemoveComment,
  ReplyToComment,
  SetActiveDiscussionChannel
} from '../../reducers/discussion/discussion.actions'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { SetActiveBrief, SetActiveBriefStatus } from '../../reducers/brief/brief.actions'
import { MdcDialog } from '@angular-mdc/web'
import { DiscussionType } from '../../models';

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

  public discussionTypes = DiscussionType

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
  fileLeafRef$: Observable<any>
  brief$: Observable<any>
  activeBriefId: string;

  // tslint:disable-next-line:no-empty
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.nodes$ = this.store.pipe(
      select(fromNavigation.selectNavigationNodeTreeState))

    this.comments$ = this.store.pipe(
      select(fromDiscussion.selectDiscussionState)
    )

    this.documentStatusList$ = new BehaviorSubject(statuslist)

    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))

    this.fileLeafRef$ = this.store.pipe(
      select(fromBrief.selectFileLeafRefState)
    )

    this.activeComment$ = this.store.pipe(
      select(fromDiscussion.selectActiveCommentState)
    )

    this.selectId$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.activeBriefId = params.get('id')

          this.store.dispatch(new SetActiveBrief({  activeBriefId: this.activeBriefId }))
          this.store.dispatch(new SetActiveBriefPath({  activeBriefId: this.activeBriefId }))
          this.store.dispatch(new GetDiscussion({  activeBriefId: this.activeBriefId }))
          
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

        if(formEvent.status) {
          this.store.dispatch(new SetActiveBriefStatus({status: formEvent.status}))
        }

        this.handleChange(formEvent)
      })
  }

  public ngOnDestroy() {
    this.selectId$.unsubscribe()
    this.formValueChangeSubscription$.unsubscribe()
  }

  handleChange($event) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleChange', $event)
  }

  handleSelectDiscussion(type: DiscussionType) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleSelectDiscussion', type)

    this.store.dispatch(new SetActiveDiscussionChannel(type))
    this.store.dispatch(new GetDiscussion({ activeBriefId: this.activeBriefId }))
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
    this.store.dispatch(
      new ToggleExpand({ id: $event.node.data.id, expanded: $event.isExpanded })
    )
  }

  public handleSelectNavigatorNode(node) {
    this.router.navigate(['/', 'brief', node.data.briefId])
  }

  public handleReplyToComment(comment) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  ReplyToComment`, comment)
    this.store.dispatch(new ReplyToComment({ activeComment: comment.id }))
  }

  public handleRemoveComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  RemoveComment`, $event)

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT) {
          this.store.dispatch(
            new RemoveComment({ id: $event.id, brief: $event.hostId })
          )
        }
      })
  }

  public handleAddComment($event) {
    const parent = $event.parent
    const newcomment = {
      brief: $event.hostId,
      text: $event.text,
      parent: parent ? parent.id : null
    }

    // tslint:disable-next-line:no-console
    console.log(`💬 -  AddComment`, $event, newcomment)

    this.store.dispatch(new AddComment(newcomment))
  }

  public handleToggleMoveNavigatorNode($event, action) {
    // tslint:disable-next-line:no-console
    console.log(`🐹 - ${action}`, $event)
  }
}

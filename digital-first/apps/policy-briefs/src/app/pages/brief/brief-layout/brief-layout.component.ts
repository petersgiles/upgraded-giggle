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
import { EMPTY, BehaviorSubject } from 'rxjs'

import * as fromRoot from '../../../reducers/index'
import * as fromNavigation from '../../../reducers/navigation/navigation.reducer'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import * as fromDiscussion from '../../../reducers/discussion/discussion.reducer'
import { ARE_YOU_SURE_ACCEPT, DialogAreYouSureComponent } from '@df/components';


@Component({
  selector: 'digital-first-brief-layout',
  templateUrl: './brief-layout.component.html',
  styleUrls: ['./brief-layout.component.scss']
})
export class BriefLayoutComponent implements OnInit, OnDestroy {
  nodes$: any
  comments$: any
  activeComment$: any
  selectId$: any
  activeBriefId: string
  brief$: any
  
  // tslint:disable-next-line:no-empty
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    public dialog: MdcDialog
  ) {}

  ngOnInit() {
    this.nodes$ = this.store.pipe(
      select(fromNavigation.selectNavigationNodeTreeState)
    )
    this.store.dispatch(new GetNavigations())
  }

  public ngOnDestroy() {
    if(this.selectId$){
      this.selectId$.unsubscribe()
    }
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

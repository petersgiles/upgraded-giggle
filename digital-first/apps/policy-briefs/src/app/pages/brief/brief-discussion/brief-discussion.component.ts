import { Component, OnInit, Input } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromDiscussion from '../../../reducers/discussion/discussion.reducer'
import { Store, select } from '@ngrx/store'
import { DiscussionType } from '../../../models'
import {
  SetActiveDiscussionChannel,
  GetDiscussion,
  ReplyToComment,
  RemoveComment,
  AddComment
} from '../../../reducers/discussion/discussion.actions'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@df/components'
import { MdcDialog } from '@angular-mdc/web'
import { first } from 'rxjs/operators'

@Component({
  selector: 'digital-first-brief-discussion',
  templateUrl: './brief-discussion.component.html',
  styleUrls: ['./brief-discussion.component.scss']
})
export class BriefDiscussionComponent implements OnInit {
  public discussionTypes = DiscussionType
  // returns keys of enum
  discussionTypeKeys(): Array<string> {
    const keys = Object.keys(this.discussionTypes)
    return keys
  }

  // returns values of enum
  discussionTypeVals(): Array<string> {
    const keys = Object.keys(this.discussionTypes)
    return keys.map(el => Object(this.discussionTypes)[el])
  }
  
  comments$: any
  activeComment$: any
  _brief: any;
  remove: boolean = false
  currentChannel: DiscussionType = DiscussionType.Agency
  @Input()
  set brief(val) {
    this._brief = val
    console.log(this._brief.id)
    this.store.dispatch(
      new GetDiscussion({ activeBriefId: `${this._brief.id}` })
    )
  }

  get brief() {
    return this._brief
  }

  @Input()
  background

  constructor(private store: Store<fromRoot.State>, public dialog: MdcDialog) {}

  ngOnInit() {
    this.comments$ = this.store.pipe(
      select(fromDiscussion.selectDiscussionState)
    )

    this.activeComment$ = this.store.pipe(
      select(fromDiscussion.selectActiveCommentState)
    )
  }

  handleSelectDiscussion(type: DiscussionType) {
    // tslint:disable-next-line:no-console
    console.log('🐛 - handleSelectDiscussion', type)
    this.currentChannel = type
    this.store.dispatch(new SetActiveDiscussionChannel(type))
    this.store.dispatch(new GetDiscussion({ activeBriefId: this.brief.id }))
  }

  public handleReplyToComment(comment) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  ReplyToComment`, comment)
    this.store.dispatch(new ReplyToComment({ activeComment: comment.id }))
  }

  public handleRemoveComment($event) {
    // tslint:disable-next-line:no-console
    console.log(`💬 -  RemoveComment`, $event)
   
   
    this.store.dispatch(
      new RemoveComment({id: $event.id, brief: $event.hostId})
    )
 /*    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT) {
          this.remove = true
          this.removeComment($event.id, $event.hostId)
        }
      }) */

      
  }

  private removeComment(id, hostId){
    if(this.remove){
      this.remove = false
      this.store.dispatch(
        new RemoveComment({ id: id, brief: hostId })
      )
    }
  }

  public handleAddComment($event) {
    const parent = $event.parent
    const newcomment = {
      brief: $event.hostId,
      text: $event.text,
      channel: this.currentChannel,
      parent: parent ? parent.id : null
    }

    // tslint:disable-next-line:no-console
    console.log(`💬 -  AddComment`, $event, newcomment)

    this.store.dispatch(new AddComment(newcomment))
  }
}

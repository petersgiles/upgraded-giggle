import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { CommitmentDiscussionService } from '../../reducers/commitment-discussion/commitment-discussion.service'
import { Observable, Subscription } from 'rxjs'
import { Comment } from '../../reducers/commitment-discussion/comment.model'
import { first } from 'rxjs/operators'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@df/components'
import { MdcDialog } from '@angular-mdc/web'
import { OPERATION_DISCUSSION } from '../../services/app-data.service'


@Component({
  selector: 'digital-first-commitment-discussion',
  templateUrl: './commitment-discussion.component.html',
  styles: [``]
})
export class CommitmentDiscussionComponent implements OnInit, OnDestroy {

  _commitment: number
  userOperation$: Observable<any>
  expanded: boolean
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar'
  discussion: Comment[]
  activeComment: any
  discussion$: Observable<Comment[]>
  timeFormatSubscription$: Subscription
  expandedSubscription$: Subscription

  constructor(public dialog: MdcDialog, private service: CommitmentDiscussionService) { }

  @Input()
  set commitment(val: number) {
    this._commitment = val
    if (val) {
      this.service.getCommentsByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  handleChangeExpanded(expanded) {
    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  handleDeleteComment(comment) {
    const commentId = comment.id

    const dialogRef = this.dialog.open(DialogAreYouSureComponent, {
      escapeToClose: true,
      clickOutsideToClose: true
    })

    dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(result => {
        if (result === ARE_YOU_SURE_ACCEPT && commentId) {
          this.service.deleteComment({ id: commentId, commitment: this._commitment })
        }
      })
  }

  handleReplyToComment(comment) {
    const oldActive = this.activeComment
    this.activeComment = null
    if (comment) {
      if (oldActive !== comment.id) {
        this.activeComment = comment.id
      }
    }
  }

  handleAddComment(newComment) {
    const parentId = newComment.parent ? newComment.parent.id : null

    this.service.createComment({
      commitment: newComment.hostId,
      parent: parentId,
      comment: newComment.text
    })
    this.activeComment = null

  }

  handleChangeDateFormat(format: 'dateFormat' | 'timeAgo' | 'calendar') {
    this.service.changeTimeFormat(format)
  }

  ngOnInit() {
    this.discussion$ = this.service.Comments
    this.userOperation$ = this.service.UserOperation
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.timeFormatSubscription$ = this.service.TimeFormat.subscribe(p => this.timeFormat = p)
  }

  ngOnDestroy(): void {
    this.expandedSubscription$.unsubscribe()
    this.timeFormatSubscription$.unsubscribe()
  }

  getRight(operations: any) {
    return operations[OPERATION_DISCUSSION]
  }
}

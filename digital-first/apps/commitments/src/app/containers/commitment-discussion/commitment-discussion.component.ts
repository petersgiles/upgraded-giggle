import { Component, OnInit, Input } from '@angular/core'
import { CommitmentDiscussionService } from '../../reducers/commitment-discussion/commitment-discussion.service'
import { Observable, Subscription } from 'rxjs'
import { Comment } from '../../reducers/commitment-discussion/comment.model'
import { first } from 'rxjs/operators'
import { DialogAreYouSureComponent, ARE_YOU_SURE_ACCEPT } from '@digital-first/df-dialogs'
import { MdcDialog } from '@angular-mdc/web'

@Component({
  selector: 'digital-first-commitment-discussion',
  templateUrl: './commitment-discussion.component.html',
  styles: [``]
})
export class CommitmentDiscussionComponent implements OnInit {
  _commitment: number

  expanded: boolean
  timeFormat: any
  discussion: Comment[]
  activeComment: any
  expandedSubscription$: Subscription
  discussion$: Observable<Comment[]>
  constructor(public dialog: MdcDialog, private service: CommitmentDiscussionService) { }

  ngOnInit() {
    this.expandedSubscription$ = this.service.Expanded.subscribe(p => this.expanded = p)
    this.discussion$ = this.service.Comments
  }

  @Input()
  set commitment(val: number) {
    this._commitment = val
    // tslint:disable-next-line:no-console
    console.log('commitment', val)
    if (val) {
      this.service.getCommentsByCommitment(val)
    }
  }

  get commitment() {
    return this._commitment
  }

  handleChangeExpanded(expanded) {
    // tslint:disable-next-line:no-console
    console.log(expanded)

    if (expanded) {
      this.service.expandPanel()
    } else {
      this.service.collapsePanel()
    }

  }

  handleDeleteComment(comment) {
    // tslint:disable-next-line:no-console
    console.log(comment)
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

        // tslint:disable-next-line:no-console
        console.log(result)
        if (result === ARE_YOU_SURE_ACCEPT && commentId) {
          this.service.deleteComment({ id: commentId })
        }
      })
  }

  handleReplyToComment(comment) {
    // tslint:disable-next-line:no-console
    console.log(comment)

    const oldActive = this.activeComment
    this.activeComment = null
    if (comment) {
      if (oldActive !== comment.id) {
        this.activeComment = comment.id
      }
    }
  }

  handleAddComment(newComment) {
    // tslint:disable-next-line:no-console
    console.log(newComment)

    const parentId = newComment.parent ? newComment.parent.id : null

    this.service.createComment({
      commitment: newComment.hostId,
      parent: parentId,
      comment: newComment.text
    })
    this.activeComment = null

  }

  handleChangeDateFormat($event) {

  }
}

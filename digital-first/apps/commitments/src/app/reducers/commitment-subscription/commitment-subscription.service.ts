import {
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Comment } from './comment.model'

import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, GetCommentsByCommitment, StoreComment, RemoveComment, ChangeTimeFormat } from './commitment-discussion.actions'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDiscussionService {

  constructor(private store: Store<fromRoot.State>) { }

  // Notification

  get Notification(): Observable<string> {
    return this.store.pipe(select(fromRoot.getNotification))
  }

  getCurrentUser(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCurrentUserProfile))
  }

  /// Comments

  get Expanded(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentDiscussionPanelExpanded))
  }

  getCommentsByCommitment(commitment: number): any {
    this.store.dispatch(new GetCommentsByCommitment({ commitment: commitment}))
}

  get Comments(): Observable<Comment[]> {
    return this.store.pipe(select(fromRoot.getCurrentCommitmentDiscussion))
  }

  get TimeFormat(): Observable<'dateFormat' | 'timeAgo' | 'calendar'> {
    return this.store.pipe(select(fromRoot.getCommitmentDiscussionTimeFormat))
  }

  changeTimeFormat(format: 'dateFormat' | 'timeAgo' | 'calendar'): any {
    this.store.dispatch(new ChangeTimeFormat(format))
  }

  get CommentsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getDiscussionCommentLoading))
  }

  get CommentsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getDiscussionCommentError))
  }

  createComment(comment: { commitment: any; parent: any; comment: any; }) {
    this.store.dispatch(new StoreComment(comment))
  }

  deleteComment(comment: { id: any, commitment?: any }): any {
    this.store.dispatch(new RemoveComment(comment))
  }

  expandPanel() {
    this.store.dispatch(new ExpandPanel())
  }
  collapsePanel() {
    this.store.dispatch(new CollapsePanel())
  }

}

// createComment(comment: { commitment: any; parent: any; comment: any; }) {
//   this.store.dispatch(new StoreComment(comment))
// }

// deleteComment(comment: { id: any }): any {
//   this.store.dispatch(new DeleteComment(comment))
//   this.store.dispatch(new RemoveComment(comment))
// }

// /// Comments

// get Comments(): Observable<Comment[]> {
//   return this.store.pipe(select(fromRoot.getAllComments))
// }

// get CommentsLoading(): Observable<boolean> {
//   return this.store.pipe(select(fromRoot.getCommentLoading))
// }

// get CommentsError(): Observable<any> {
//   return this.store.pipe(select(fromRoot.getCommentError))
// }
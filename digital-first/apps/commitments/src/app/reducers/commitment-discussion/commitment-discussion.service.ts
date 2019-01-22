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
  get UserOperation(): Observable<any> {
    return this.store.pipe(
        select(fromRoot.getCurrentUserOperations),
    )
}

  constructor(private store: Store<fromRoot.State>) { }

  get Comments(): Observable<Comment[]> {
    return this.store.pipe(select(fromRoot.getCurrentCommitmentDiscussion))
  }

  get TimeFormat(): Observable<'dateFormat' | 'timeAgo' | 'calendar'> {
    return this.store.pipe(select(fromRoot.getCommitmentDiscussionTimeFormat))
  }

  get Expanded(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommitmentDiscussionPanelExpanded))
  }

  get CommentsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getDiscussionCommentLoading))
  }

  get CommentsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getDiscussionCommentError))
  }

  getCommentsByCommitment(commitment: number): any {
    this.store.dispatch(new GetCommentsByCommitment({ commitment: commitment }))
  }

  changeTimeFormat(format: 'dateFormat' | 'timeAgo' | 'calendar'): any {
    this.store.dispatch(new ChangeTimeFormat(format))
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
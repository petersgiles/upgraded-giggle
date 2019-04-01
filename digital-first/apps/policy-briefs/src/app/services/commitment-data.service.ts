import {
  Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
//import { RefinerGroup, RefinerType, DataTableConfig } from '@digital-first/df-components'

import { Comment } from '../reducers/comment/comment.model'
import { Contact } from '../reducers/contact/contact.model'

import { StoreComment, RemoveComment, DeleteComment } from '../reducers/comment/comment.actions'
import { GetAllContacts } from '../reducers/contact/contact.actions'

import * as fromRoot from '../reducers'

@Injectable({
  providedIn: 'root'
})
export class CommitmentDataService {

  constructor(private store: Store<fromRoot.State>) { }

  // Notification

  get Notification(): Observable<string> {
    return this.store.pipe(select(fromRoot.getNotification))
  }

  /// Comments

  createComment(comment: { artifact: any; parent: any; comment: any; }) {
    this.store.dispatch(new StoreComment(comment))
  }

  deleteComment(comment: { id: any }): any {
    this.store.dispatch(new DeleteComment(comment))
    this.store.dispatch(new RemoveComment(comment))
  }

  get Comments(): Observable<Comment[]> {
    return this.store.pipe(select(fromRoot.getAllComments))
  }

  get CommentsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getCommentLoading))
  }

  get CommentsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCommentError))
  }

  // Contacts

  public getAllContacts(filter?: any) {
    this.store.dispatch(new GetAllContacts({ filter: filter }))
  }

  get Contacts(): Observable<Contact[]> {
    return this.store.pipe(select(fromRoot.getAllContacts))
  }

  get ContactsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getContactLoading))
  }

  get ContactsError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getContactError))
  }
}

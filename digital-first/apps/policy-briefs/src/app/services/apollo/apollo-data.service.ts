import * as moment from 'moment'
import {
  ADD_COMMENT,
  COMMENTS_BY_COMMITMENT,
  DELETE_COMMENT,
  GET_CONTACTS,

} from './apollo-queries'
import {
  CommentsResult,
  ContactsResult,
  DataResult,
} from '../../models'
import { Apollo } from 'apollo-angular'
import { AppDataService } from '../app-data.service'
import { catchError, switchMap, tap } from 'rxjs/operators'

import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApolloDataService implements AppDataService {

  constructor(private apollo: Apollo) { }

  storeComment(comment: {
    artifact: any;
    parent: any;
    comment: any;
    author: any;
  }): Observable<DataResult<CommentsResult>> {
    const variables = {
      commitment: comment.artifact,
      parent: comment.parent,
      text: comment.comment,
      author: 'Domenica20',
      created: moment()
    }
    return this.callMutate<any>({ mutation: ADD_COMMENT, variables: { ...variables } })

  }

  deleteComment = (variables: { id: any; commitment: any }) =>
    this.callMutate<{ commitment: number }>(
      { mutation: DELETE_COMMENT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteComment.commitment }))

  filterContacts = (filter?: any) => this.callQuery<ContactsResult>({ query: GET_CONTACTS, variables: filter })

  callMutate<T>(options: {
    mutation: any,
    fetchPolicy?: 'no-cache' | 'network-only',
    variables?: any
  }, mapper?: any): Observable<DataResult<T>> {
    return this.apollo
      .mutate({
        ...options
      })
      .pipe(
        switchMap((result: any) => {
          if (mapper) {
            return of(mapper(result) as DataResult<T>)
          }
          return of(result as DataResult<T>)
        }),
        catchError(err => this.replyError<T>(err))
      )
  }

  callQuery<T>(options: {
    query: any,
    fetchPolicy?: 'no-cache' | 'network-only',
    variables?: any
  }): Observable<DataResult<T>> {

    return this.apollo
      .query({
        ...options
      })
      .pipe(
        switchMap((result: any) => of(result as DataResult<T>)),
        catchError(err => this.replyError<T>(err))
      )
  }

  replyError<T>(err): Observable<DataResult<T>> {
    const error: DataResult<T> = { data: null, error: err, loading: false }
    return of(error)
  }

}

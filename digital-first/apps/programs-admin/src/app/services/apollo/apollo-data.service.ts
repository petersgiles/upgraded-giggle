import {

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

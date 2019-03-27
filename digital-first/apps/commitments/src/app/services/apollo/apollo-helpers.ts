import { Apollo } from 'apollo-angular'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { DataResult } from '../../models'
import { switchMap, catchError } from 'rxjs/operators'

export const callMutate = <T>(apollo, options: {
    mutation: any,
    fetchPolicy?: 'no-cache' | 'network-only',
    variables?: any
}, mapper?: any): Observable<DataResult<T>> => apollo
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
        catchError(replyError)
    )

type DataResultCallback<T, TResult> =  (item: T) => TResult

export const callQuery = <T>(apollo, options: {
    query: any,
    fetchPolicy?: 'no-cache' | 'network-only',
    variables?: any
}, mapper?: DataResultCallback<any, DataResult<T>>): Observable<DataResult<T>> =>

    apollo
        .query({
            ...options
        })
        .pipe(
            switchMap((result: any) => {
                if (mapper) {
                    return of(mapper(result) as DataResult<T>)
                }
                return of(result as DataResult<T>)
            }),
            catchError(replyError)
        )

export const replyError = <T>(err): Observable<DataResult<T>> => {
    const error: DataResult<T> = { data: null, error: err, loading: false }
    return of(error)
}
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { SeqService } from '../services/logging/log.service'
import {  HttpErrorResponse } from '@angular/common/http'
import { of } from 'rxjs'
import { catchError} from 'rxjs/operators'

function logSuppressedError(reason) {
    // tslint:disable-next-line:no-console
    if (typeof console !== 'undefined' && console.warn) {
      // tslint:disable-next-line:no-console
      console.warn(
        'Suppressed error that occurred when trying to log error to server: ',
        reason
      )
    }
    return of(true)
  }

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
  //  private httpClient: HttpClient,
  //  private injector: Injector,
    private seqService: SeqService
  ) {}

  formatErrorMessage(errorToFormat: HttpErrorResponse): string {
    if (errorToFormat.status && errorToFormat.status === 403) {
      return 'You are not authorised to perform this action.'
    }

    if (errorToFormat.error) {
      return errorToFormat.error.errors
        .map(errorToJoin =>
          errorToJoin.extensions &&
          errorToJoin.extensions.code === 'DB_UPDATE_CONCURRENCY'
            ? `"The record was updated prior to your change.  Please refresh the record and try again."`
            : `"${errorToJoin.message}"`
        )
        .join(', ')
    }
    return errorToFormat.message
  }

  handleError(error: Error) {
    this.seqService
      .logToSeq(error)
      .pipe(catchError(logSuppressedError))
      .subscribe()

  }
}
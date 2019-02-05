import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'

function logSuppressedError(reason) {
  // tslint:disable-next-line:no-console
  if (typeof console !== 'undefined' && console.warn) {
    // tslint:disable-next-line:no-console
    console.warn('Suppressed error when logging to Seq: ' + reason)
  }
  return of(true)
}

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private httpClient: HttpClient, private injector: Injector) {}

  formatErrorMessage(errorToFormat: HttpErrorResponse): string {
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
  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router)
    const ngZone = this.injector.get(NgZone)

    this.sendToSeq(error)

    if (environment.redirectErrors) {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = this.formatErrorMessage(error)

        ngZone
          .run(() =>
            router.navigate(['/error'], {
              queryParams: { error: errorMessage }
            })
          )
          .then()
      } else {
        // Client Error Happened
        ngZone
          .run(() =>
            router.navigate(['/error'], {
              queryParams: { error: error.message }
            })
          )
          .then()
      }
    }
    // Log the error
    // tslint:disable-next-line:no-console
    console.error(error)
  }

  // TODO:  refactor this out to a service
  private sendToSeq(error: Error | HttpErrorResponse) {
    const event = this.createEvent(error)

    this.httpClient
      .post(
        `${environment.datasource.adminApiUrl}/events/raw`,
        JSON.stringify({ Events: [event] })
      )
      .pipe(catchError(logSuppressedError))
      .subscribe()
  }

  private createEvent(error: Error | HttpErrorResponse) {
    const mappedEvent = {
      Level: 'Error',
      MessageTemplate: 'Programs admin client application error: {message}.',
      Properties: { clientVersion: environment.version },
      Timestamp: new Date().toISOString(),
      Exception: ''
    }

    if (error instanceof HttpErrorResponse) {
      const props = {
        ...mappedEvent.Properties,
        message: this.formatErrorMessage(error)
      }
      mappedEvent.Properties = props
    }

    if (error instanceof Error && error.stack) {
      mappedEvent.Exception = error.stack

      const props = {
        ...mappedEvent.Properties,
        message: error.message
      }
      mappedEvent.Properties = props
    }
    return mappedEvent
  }
}

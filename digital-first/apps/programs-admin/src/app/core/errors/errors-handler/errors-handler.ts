import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'
import {environment} from '../../../../environments/environment'

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  // TODO: log to SEQ server
  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router)
    const ngZone = this.injector.get(NgZone)

    function formatErrorMessage(errorToFormat: HttpErrorResponse) {

      if (errorToFormat.error) {
        return errorToFormat.error.errors.map(errorToJoin =>
          errorToJoin.extensions && errorToJoin.extensions.code === 'DB_UPDATE_CONCURRENCY' ?
            `"The record was updated prior to your change.  Please refresh the record and try again."` : `"${errorToJoin.message}"`).join(', ')
      }
      return errorToFormat.message
    }

    if (environment.redirectErrors) {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = formatErrorMessage(error)

        ngZone
          .run(() =>
            router.navigate(['/error'], {
              queryParams: {error: errorMessage}
            })
          )
          .then()
      } else {
        // Client Error Happened
        ngZone
          .run(() =>
            router.navigate(['/error'], {
              queryParams: {error: error.message}
            })
          )
          .then()
      }
    }
    // Log the error
    // tslint:disable-next-line:no-console
    console.error(error)
  }
}

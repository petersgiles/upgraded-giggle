import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { SeqService } from '../services/logging/log.service'

import {AppErrorHandlerToSeqService} from '@digital-first/df-app-core'
import {  HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
     private injector: Injector,
     private seqService: AppErrorHandlerToSeqService
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router)
    const ngZone = this.injector.get(NgZone)
    if (error instanceof HttpErrorResponse) {
      if(error.status === 0){
      ngZone
      .run(() =>
        router.navigate(['/pages/500'], {
          queryParams: { error: error.message }
        })
      )
      .then()
    } else if (error.status === 401 || error.status === 404){
      ngZone
      .run(() =>
        router.navigate(['/pages/404'], {
          queryParams: { error: error.message }
        })
      )
      .then()
    }
  } else {
    this.seqService
      .handleError(error)
      //.pipe(catchError(logSuppressedError))
     // .subscribe()
  }

  }
}
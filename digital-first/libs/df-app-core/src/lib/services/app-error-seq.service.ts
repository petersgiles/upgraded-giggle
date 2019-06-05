import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import * as structuredLog from 'structured-log'
import { SeqSink } from './app-seq-sink'
import { AppSettingsService } from './app-settings.service'
import {  HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerToSeqService implements ErrorHandler {
  private log
  handlingUserOperations$: Observable<any>
  handlingCurentUser$: Observable<any>
  constructor(private settings: AppSettingsService, private injector: Injector) {
    const levelSwitch = new structuredLog.DynamicLevelSwitch(
      this.settings.loggingSource.level
    )

    this.log = structuredLog
      .configure()
      .enrich({ source: this.settings.loggingSource.source })
      .minLevel(levelSwitch)
       .filter(logEvent => {
        const template = logEvent.messageTemplate
        template.raw = template.raw.replace('{stacktrace}', '').replace('{action}', '').replace('{error}', '').replace('{id}', '').replace('{name}', '').replace('{login}', '')
        return true
    })
      .writeTo(new structuredLog.ConsoleSink({console: window.console}))
      .writeTo(
        new SeqSink({
          url: this.settings.loggingSource.url,
          compact: true,
          levelSwitch: levelSwitch,
          apiKey: this.settings.apiKey
        })
      )
      .create()
  }

  handleError(error: any): void {
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
        router.navigate(['/pages/500'], {
          queryParams: { error: error.message }
        })
        )
        .then()
      }
    } else if (error.action && error.error) {
      const errorStack = error.error.stacktrace ? error.error.stacktrace : ''
      this.formatErrorMessage(error.action, error.error, errorStack)
    } else {
      // Other unexpected errors
      const errorMessage = error.message ? error.message : ''
      const errorStack = error.stacktrace ? error.stacktrace : ''
      this.log.error(`Error Message:${errorMessage}  Stack ${errorStack}`)
    }
    ngZone
    .run(() =>
    router.navigate([''])
    )
    .then()
  }

  formatErrorMessage(action, error, stacktrace){
     this.log.error ('{source} error has occurred {action} {error} {id} {name} {login} {stacktrace}.',
      this.settings.loggingSource.source, action, error.errorMessage)
  }
}

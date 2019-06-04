import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import * as structuredLog from 'structured-log'
import { SeqSink } from './app-seq-sink'
import { AppSettingsService } from './app-settings.service'
import {  HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerToSeqService implements ErrorHandler {
  private log
  constructor(private settings: AppSettingsService, private injector: Injector) {
    const levelSwitch = new structuredLog.DynamicLevelSwitch(
      this.settings.loggingSource.level
    )


    this.log = structuredLog
      .configure()
      .enrich({ source: this.settings.loggingSource.source })
      .minLevel(levelSwitch)
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
    } else {this.log.error(
      `Error from ${this.settings.loggingSource.source} === Action:${
        error.action
      }, Error:${JSON.stringify(error)}`
    )
    ngZone
    .run(() =>
    router.navigate([''])
    )
    .then()
  }
  }

  handleInfo(info: any): void {
    this.log.info(`Information from ${this.settings.loggingSource.source}: ${info}`)
  }
}

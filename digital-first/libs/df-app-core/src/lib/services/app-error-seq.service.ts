import { Injectable, ErrorHandler } from '@angular/core'
import * as structuredLog from 'structured-log'
import { SeqSink } from './app-seq-sink'
import { AppSettingsService } from './app-settings.service'
@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerToSeqService implements ErrorHandler {
  private log
  constructor(private settings: AppSettingsService) {
    const levelSwitch = new structuredLog.DynamicLevelSwitch(
      this.settings.loggingSource.level
    )

    this.log = structuredLog
      .configure()
      .enrich({ source: this.settings.loggingSource.source })
      .minLevel(levelSwitch)
      .writeTo(
        new SeqSink({
          url: this.settings.loggingSource.url,
          compact: true,
          levelSwitch: levelSwitch,
          apiKey: this.settings.apiKey
        })
      )
      .writeTo(
        new structuredLog.ConsoleSink({
          console: window.console
        })
      )
      .create()
  }

  handleError(error: any): void {
    if (error.action && error.error) {
      this.log.error(
        `Error from ${this.settings.loggingSource.source} === Action:${
          error.action
        }, Error:${JSON.stringify(error.error)}`
      )
    } else {
      // Other unexpected errors
      const errorMessage = error.message ? error.message : ''
      const errorStack = error.stack ? error.stack : ''
      this.log.error(`Error Message:${errorMessage}  Stack ${errorStack}`)
    }
  }

  handleInfo(info: any): void {
    this.log.info(
      `Information from ${this.settings.loggingSource.source}: ${info}`
    )
  }
}

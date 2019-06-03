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
      .writeTo(new structuredLog.ConsoleSink({
        console: window.console
      }))
      .minLevel(levelSwitch)
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
    this.log.error(
      `Error from ${this.settings.loggingSource.source} === Action:${
        error.action
      }, Error:${JSON.stringify(error.error)}`
    )
  }

  handleInfo(info: any): void {
    this.log.info(`Information from ${this.settings.loggingSource.source}: ${info}`)
  }
}

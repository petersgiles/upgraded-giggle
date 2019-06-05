import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import * as structuredLog from 'structured-log'
import { SeqSink } from './app-seq-sink'
import { AppSettingsService } from './app-settings.service'
import { AppErrorRouteOverrideService } from './app-error-route-override.service'

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerToSeqService implements ErrorHandler {
  private log

  constructor(
    private settings: AppSettingsService,
    private routerOveride: AppErrorRouteOverrideService
  ) {
    const levelSwitch = new structuredLog.DynamicLevelSwitch(
      this.settings.loggingSource.level
    )

    this.log = structuredLog
      .configure()
      .writeTo(
        new structuredLog.ConsoleSink({
          console: window.console
        })
      )
      .minLevel(levelSwitch)
      .filter((logEvent: any) => {
        const template = logEvent.messageTemplate
        template.raw = template.raw.replace('{@Detail}', '')
        return true
      })
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

  handleError(error: Error): void {
    this.logStructuredWithExtraProps(error)
    if (this.routerOveride) {
      this.routerOveride.routeError(error)
    }
  }

  logStructuredWithExtraProps(errorToLog) {
    const { action, message, error, ...remaining } = errorToLog

    const detail = {
      Timezone: new Date().getTimezoneOffset(),
      Language: navigator.language
    }

    if (action) {
      detail['Action'] = action
    }

    if (message) {
      detail['Message'] = message
    }

    if (error && error.stacktrace) {
      detail['StackTrace'] = error.stacktrace
    }

    this.log.error(
      '{Source} error has occurred {@Detail}',
      this.settings.loggingSource.source,
      detail
    )
  }
}

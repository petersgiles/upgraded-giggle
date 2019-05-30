import { Injectable, ErrorHandler } from '@angular/core'
import * as structuredLog from 'structured-log'
import { SeqSink } from './app-seq-sink'
import { AppSettingsService } from './app-settings.service';
@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerToSeqService implements ErrorHandler {
  private log

  constructor(private settings: AppSettingsService) {
    const levelSwitch = new structuredLog.DynamicLevelSwitch('info')

    this.log = structuredLog
      .configure()
      .writeTo(new structuredLog.ConsoleSink())
      .minLevel(levelSwitch)
      .writeTo(
        new SeqSink({
          url: `//programs.cloud9.cabnet`,
          compact: true,
          levelSwitch: levelSwitch,
          apiKey: this.settings.apiKey
        })
      )
      .create()
  }
  handleError(error: any): void {
    // tslint:disable-next-line: no-console
    console.log(`🐱🐱🐱`, error)

    this.log.info('StructuredLog input: {Text}', error)
  }
}

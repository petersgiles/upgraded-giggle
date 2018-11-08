import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoggerService} from './logger.service'
import { ConsoleLoggerService } from './console-logger.service'

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: LoggerService, useClass: ConsoleLoggerService }]
})
export class DfLoggingModule {}

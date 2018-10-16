import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddPipe } from './add.pipe'
import { CalendarPipe } from './calendar.pipe'
import { DateFormatPipe } from './date-format.pipe'
import { DifferencePipe } from './difference.pipe'
import { DurationPipe } from './duration.pipe'
import { FromUnixPipe } from './from-unix.pipe'
import { ParsePipe } from './parse.pipe'
import { SubtractPipe } from './subtract.pipe'
import { TimeAgoPipe } from './time-ago.pipe'
import { UtcPipe } from './utc.pipe'
import { FromUtcPipe } from './from-utc.pipe'
import { LocalTimePipe } from './local-time.pipe'
import { LocalePipe } from './locale.pipe'

const PIPES = [AddPipe, CalendarPipe, DateFormatPipe, DifferencePipe, DurationPipe, FromUnixPipe, ParsePipe, SubtractPipe, TimeAgoPipe, UtcPipe, FromUtcPipe, LocalTimePipe, LocalePipe]

@NgModule({
  imports: [CommonModule],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES
  ]
})
export class DfMomentModule {}

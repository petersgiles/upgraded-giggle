import { NgModule } from '@angular/core'
import { DatePipe } from '@angular/common'

@NgModule({
  providers: [DatePipe]
})
export class DateTimeFormat {
  constructor(private datePipe: DatePipe) {}

  formatDateTime(val: string) {
    return this.datePipe.transform(val, 'yyyy-MM-dd h:mm:ss a', 'en-AU')
  }

  formatDate(val: string) {
    return this.datePipe.transform(val, 'yyyy-MM-dd', 'en-AU')
  }
}

import { Component, OnInit, Input, forwardRef } from '@angular/core'
import { DocumentStatus } from './document-status.model'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'digital-first-document-status',
  templateUrl: './document-status.component.html',
  styleUrls: ['./document-status.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocumentStatusComponent),
      multi: true
    }
  ]
})
export class DocumentStatusComponent implements OnInit, ControlValueAccessor {
  constructor() {
    // tslint:disable-next-line:no-console
    console.log('DocumentStatusComponent')
  }

  @Input()
  status: string

  @Input()
  public statuses: DocumentStatus[]

  propagateChange = (_: any) => {}

  ngOnInit() {}

  writeValue(obj: string): void {
    // tslint:disable-next-line:no-console
    console.log(obj)
    if (obj) {
      this.status = obj
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }
  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  onSelectionChange(sli) {
    // tslint:disable-next-line:no-console
    console.log('onSelectionChange', sli)
    this.status = sli.id
    this.propagateChange(this.status)
  }
}

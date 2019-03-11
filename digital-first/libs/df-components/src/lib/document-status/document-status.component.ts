import { Component, OnInit, Input } from '@angular/core'
import { DocumentStatus } from './document-status.model'
import { ControlValueAccessor } from '@angular/forms'

@Component({
  selector: 'digital-first-document-status',
  templateUrl: './document-status.component.html',
  styleUrls: ['./document-status.component.scss']
})
export class DocumentStatusComponent implements OnInit, ControlValueAccessor {

  constructor() {}

  @Input()
  status: DocumentStatus

  @Input()
  public statuses: DocumentStatus[]

  propagateChange = (_: any) => {}

  ngOnInit() {}

  writeValue(obj: DocumentStatus): void {
    if (obj) {
      this.status = obj
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }
  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {  }
}

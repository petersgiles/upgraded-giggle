import { Component, Inject, OnInit } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'

export interface DialogShowErrorData {
  message: any
}

@Component({
  selector: 'digital-first-dialog-show-error',
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-title>An Error has Occured</mdc-dialog-title>
      <mdc-dialog-content>
        {{message}}
      </mdc-dialog-content>
      <mdc-dialog-actions>
        <button mdcDialogButton mdcDialogAction="close">Dismiss</button>
      </mdc-dialog-actions>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
  styles: []
})
export class DialogShowErrorComponent implements OnInit {
  message: any

  constructor(public dialogRef: MdcDialogRef<DialogShowErrorComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogShowErrorData) { }

  ngOnInit() {
    this.message = this.data.message
  }

}

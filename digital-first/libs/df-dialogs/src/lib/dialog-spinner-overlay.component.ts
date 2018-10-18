import { Component, OnInit, Inject } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'

export interface DialogSpinnerOverlayData {
  message: any
}

@Component({
  selector: 'digital-first-dialog-spinner-overlay',
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-content>
        {{message}}
        <mdc-linear-progress #lp></mdc-linear-progress>
      </mdc-dialog-content>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
  styles: []
})
export class DialogSpinnerOverlayComponent implements OnInit {
  message: any

  constructor(public dialogRef: MdcDialogRef<DialogSpinnerOverlayComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogSpinnerOverlayData) { }

  ngOnInit() {
    this.message = this.data.message || 'Busy'
  }

}

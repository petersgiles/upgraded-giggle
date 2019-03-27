import { Component, Inject, OnInit } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'

export interface DialogShowApiKeyData {
  apiKey: string
}

@Component({
  selector: 'digital-first-dialog-show-apikey',
  template: `
    <mdc-dialog>
      <mdc-dialog-surface>
        <mdc-dialog-title>Please copy the API Key</mdc-dialog-title>
        <mdc-dialog-content>
          {{ apiKey }}
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Close</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog>
  `,
  styles: []
})
export class DialogApiKeyComponent implements OnInit {
  apiKey: string

  constructor(
    public dialogRef: MdcDialogRef<DialogApiKeyComponent>,
    @Inject(MDC_DIALOG_DATA) public data: DialogShowApiKeyData
  ) {}

  ngOnInit() {
    this.apiKey = this.data.apiKey
  }
}

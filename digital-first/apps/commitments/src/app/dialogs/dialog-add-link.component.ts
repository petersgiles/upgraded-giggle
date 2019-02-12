import { Component, OnInit, Inject } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'
import { FormGroup, FormControl, Validators } from '@angular/forms'

export const ADD_LINK_CLOSE = 'close'

interface DialogData {
  title: string
  url: string
}

@Component({
  selector: 'digital-first-dialog-add-link',
  template: `
  <mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Enter a Link (URL)</mdc-dialog-title>
      <mdc-dialog-content>
      <form [formGroup]="dialogForm" id="dialogForm" (ngSubmit)="submit()" autocomplete="off">
        <mdc-text-field label="Enter a title" fullwidth type="text" formControlName="title"></mdc-text-field>
        <mdc-text-field label="Enter a link" fullwidth type="url" formControlName="url"></mdc-text-field>
        <p>This is the web address found at the top of your browser in the address bar when you visit a website</p>
        </form>
      </mdc-dialog-content>
      <mdc-dialog-actions>
        <button mdcDialogButton mdcDialogAction="${ADD_LINK_CLOSE}">Cancel</button>
        <button mdcDialogButton form="dialogForm" default>Add Link</button>
      </mdc-dialog-actions>

    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>
  `,
  styles: [`
  .mdc-dialog__surface {
    width: 800px;
    max-height: 400px;
    min-height: 400px;
  }
  `]
})
export class DialogAddLinkComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<DialogAddLinkComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  dialogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  })

  submit(): void {
    if (this.dialogForm.invalid) {
      return
    }

    this.dialogRef.close(this.dialogForm.value)
  }

}

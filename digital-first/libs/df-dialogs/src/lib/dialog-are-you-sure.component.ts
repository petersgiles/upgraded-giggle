import { Component, OnInit } from '@angular/core'
import { MdcDialogRef } from '@angular-mdc/web'

@Component({
  selector: 'digital-first-dialog-are-you-sure',
  template: `
  <mdc-dialog>
  <mdc-dialog-surface>
    <mdc-dialog-title>Are you sure you want to take this action?</mdc-dialog-title>
    <mdc-dialog-actions>
      <button mdcDialogButton mdcDialogAction="close">No</button>
      <button mdcDialogButton mdcDialogAction="accept" default (click)="closeDialog()">Yes</button>
    </mdc-dialog-actions>
  </mdc-dialog-surface>
</mdc-dialog>

  `,
  styles: []
})
export class DialogAreYouSureComponent implements OnInit {

  constructor(public dialogRef: MdcDialogRef<DialogAreYouSureComponent>) { }

  closeDialog(): void {
    this.dialogRef.close(true)
  }

  ngOnInit() {
  }

}

import { Component, Inject, OnInit } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'

export interface DialogFileLockedData {
  briefTitle: string
  briefId: any
  message: any
}
@Component({
  selector: 'digital-first-dialog-file-locked',
  template: `
  <mdc-dialog>
  <mdc-dialog-surface>
    <mdc-dialog-title>A File is Locked by another User</mdc-dialog-title>
    <mdc-dialog-content>
      {{message}}
    </mdc-dialog-content>
    <mdc-dialog-actions>
      <button mdcDialogAction="close">Dismiss</button>
    </mdc-dialog-actions>
  </mdc-dialog-surface>
</mdc-dialog>
  `,
  styles: []
})
export class DialogFileLockedComponent implements OnInit {

  briefTitle: string
  briefId: any
  message: any

  constructor(public dialogRef: MdcDialogRef<DialogFileLockedComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogFileLockedData) { }

  closeDialog(): void {
    this.dialogRef.close(true)
  }

  ngOnInit() {
    this.briefTitle = this.data.briefTitle
    this.briefId = this.data.briefId
    const user = this.data.message.split('\\')[1]
    this.message = `The file "${this.briefTitle}" is locked for shared use by ${user}`

    // The file "http://vm-dev-lbs13/Brief/VM-DEV-LBS13-636717445588068639.docx" is locked for shared use by i:0#.w|cloud9\apgiles.
  }

}

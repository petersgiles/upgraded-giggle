import { Component, OnInit, Inject } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'

export interface DialogContactsData {
  contacts: {id: any, name: string}[]
}

@Component({
  selector: 'digital-first-dialog-add-contact',
  template: `
  <mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Select an account</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-list avatar>
          <mdc-list-item *ngFor="let contact of contacts" [tabIndex]="0" (click)="closeDialog(contact)" >
            <mdc-icon mdcListItemGraphic>person</mdc-icon>{{contact.name}}
          </mdc-list-item>
        </mdc-list>
      </mdc-dialog-content>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>
  `,
  styles: []
})
export class DialogAddContactComponent implements OnInit {
  contacts: any

  constructor(public dialogRef: MdcDialogRef<DialogAddContactComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogContactsData) { }

  ngOnInit() {
    this.contacts = this.data.contacts
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }

}

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
      <mdc-dialog-title>Select a Contact</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-text-field label="Search" #contactFilterText fullwidth (input)="filterItem(contactFilterText.value)"></mdc-text-field>
        <mdc-list twoLine avatar>
          <mdc-list-item *ngFor="let contact of filteredItems" [tabIndex]="0" (click)="closeDialog(contact)" >
            <mdc-icon mdcListItemGraphic>person</mdc-icon>
            <mdc-list-item-text [secondaryText]="contact.email">{{contact.name}}</mdc-list-item-text>
          </mdc-list-item>
        </mdc-list>
      </mdc-dialog-content>
    </mdc-dialog-surface>
  </mdc-dialog-container>
</mdc-dialog>
  `,
  styles: [`
  .mdc-dialog__surface {
    width: 800px;
    max-height: 600px;
    min-height: 600px;
  }
  `]
})
export class DialogAddContactComponent implements OnInit {
  contacts: any[]
  filteredItems: any[]

  constructor(public dialogRef: MdcDialogRef<DialogAddContactComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogContactsData) { }

  filterItem(value) {

    if (!value) {
      this.filteredItems = [...this.contacts]
    } else {
      this.filteredItems = [...this.contacts].filter(
        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
     )
    }

 }

  ngOnInit() {
    this.contacts = this.data.contacts
    this.filteredItems = [...this.contacts]
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }

}

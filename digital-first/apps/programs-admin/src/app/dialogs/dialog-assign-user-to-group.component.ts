import { Component, OnInit, Inject } from '@angular/core'
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web'

export interface DialogUsersData {
  users: { id: any, emailAddress: string }[]
}

@Component({
  selector: 'digital-first-dialog-assign-user-to-group',
  template: `
  <mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Select a User</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-text-field label="Search" #userFilterText fullwidth (input)="filterItem(userFilterText.value)"></mdc-text-field>
        <mdc-list>
          <mdc-list-item *ngFor="let user of filteredItems" [tabIndex]="0" (click)="closeDialog(user)" >
            <mdc-list-item-text>{{user.emailAddress}}</mdc-list-item-text>
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
export class DialogAssignUserToGroupComponent implements OnInit {
  users: any[]
  filteredItems: any[]

  constructor(public dialogRef: MdcDialogRef<DialogAssignUserToGroupComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogUsersData) { }

  filterItem(value) {

    if (!value) {
      this.filteredItems = [...this.users]
    } else {
      this.filteredItems = [...this.users].filter(
        item => {
          if (item.emailAddress) {
            return item.emailAddress.toLowerCase().indexOf(value.toLowerCase()) > -1
          } else {
            return 0
          }

        }
      )
    }

  }

  ngOnInit() {
    this.users = this.data.users
    this.filteredItems = [...this.users]
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }

}

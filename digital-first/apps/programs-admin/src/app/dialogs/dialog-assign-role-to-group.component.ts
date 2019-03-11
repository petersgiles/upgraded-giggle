import { Component, OnInit, Inject } from '@angular/core'
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web'

export interface DialogRolesData {
  roles: { id: any; title: string }[]
}

@Component({
  selector: 'digital-first-dialog-assign-role-to-group',
  template: `
    <mdc-dialog>
      <mdc-dialog-container>
        <mdc-dialog-surface>
          <mdc-dialog-title>Select a Role</mdc-dialog-title>
          <mdc-dialog-content>
            <mdc-text-field
              label="Search"
              #roleFilterText
              fullwidth
              (input)="filterItem(roleFilterText.value)"
            ></mdc-text-field>
            <mdc-list>
              <mdc-list-item
                *ngFor="let role of filteredItems"
                [tabIndex]="0"
                (click)="closeDialog(role)"
              >
                <mdc-list-item-text>{{ role.title }}</mdc-list-item-text>
              </mdc-list-item>
            </mdc-list>
          </mdc-dialog-content>
        </mdc-dialog-surface>
      </mdc-dialog-container>
    </mdc-dialog>
  `,
  styles: [
    `
      .mdc-dialog__surface {
        width: 800px;
        max-height: 600px;
        min-height: 600px;
      }
    `
  ]
})
export class DialogAssignRoleToGroupComponent implements OnInit {
  roles: any[]
  filteredItems: any[]

  constructor(
    public dialogRef: MdcDialogRef<DialogAssignRoleToGroupComponent>,
    @Inject(MDC_DIALOG_DATA) public data: DialogRolesData
  ) {}

  filterItem(value) {
    if (!value) {
      this.filteredItems = [...this.roles]
    } else {
      this.filteredItems = [...this.roles].filter(item => {
        if (item.title) {
          return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
        } else {
          return 0
        }
      })
    }
  }

  ngOnInit() {
    this.roles = this.data.roles
    this.filteredItems = [...this.roles]
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }
}

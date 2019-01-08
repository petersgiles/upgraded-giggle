import { Component, OnInit, Inject } from '@angular/core'
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web'

export interface DialogGroupsData {
  groups: { id: any, name: string }[]
}

@Component({
  selector: 'digital-first-dialog-assign-group-permission',
  template: `
  <mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Select a Group</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-text-field label="Search" #groupFilterText fullwidth (input)="filterItem(groupFilterText.value)"></mdc-text-field>
        <mdc-list>
          <mdc-list-item *ngFor="let group of filteredItems" [tabIndex]="0" (click)="closeDialog(group)" >
            <mdc-list-item-text>{{group.title}}</mdc-list-item-text>
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
export class DialogAssignGroupPermissionComponent implements OnInit {
  groups: any[]
  filteredItems: any[]

  constructor(public dialogRef: MdcDialogRef<DialogAssignGroupPermissionComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogGroupsData) { }

  filterItem(value) {

    if (!value) {
      this.filteredItems = [...this.groups]
    } else {
      this.filteredItems = [...this.groups].filter(
        item => {
          if (item.title) {
            return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
          } else {
            return 0
          }

        }
      )
    }

  }

  ngOnInit() {
    this.groups = this.data.groups
    this.filteredItems = [...this.groups]
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }

}

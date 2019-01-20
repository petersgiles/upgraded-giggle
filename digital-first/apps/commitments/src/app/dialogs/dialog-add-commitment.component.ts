import { Component, OnInit, Inject } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'
import { formatCommitmentTitle } from '../formatters'

export const ADD_COMMITMENT_TO_COMMITMENT_CLOSE = 'close'
export interface DialogCommitmentsData {
  commitments: { id: any, name: string }[]
}

@Component({
  selector: 'digital-first-dialog-add-commitment',
  template: `
  <mdc-dialog>
  <mdc-dialog-container>
    <mdc-dialog-surface>
      <mdc-dialog-title>Select a Commitment</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-text-field label="Search" #commitmentFilterText fullwidth (input)="filterItem(commitmentFilterText.value)"></mdc-text-field>
        <mdc-list>
          <mdc-list-item *ngFor="let commitment of filteredItems" [tabIndex]="0" (click)="closeDialog(commitment)" >
            <mdc-list-item-text>{{getTitle(commitment)}}</mdc-list-item-text>
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
export class DialogAddCommitmentComponent implements OnInit {
  commitments: any[]
  filteredItems: any[]

  constructor(public dialogRef: MdcDialogRef<DialogAddCommitmentComponent>, @Inject(MDC_DIALOG_DATA) public data: DialogCommitmentsData) { }

  getTitle(commitment) {
    return formatCommitmentTitle(commitment)
  }

  filterItem(value) {

    if (!value) {
      this.filteredItems = [...this.commitments]
    } else {
      this.filteredItems = [...this.commitments].filter(
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
    this.commitments = this.data.commitments
    this.filteredItems = [...this.commitments]
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }

}

import { Component, OnInit, Inject } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'

export const EDIT_DECK_ITEM_CLOSE = 'close'
export interface DialogEditDeckItemData {
  deckItem: any,
  deckItems: { id: any; name: string }[]
}

@Component({
  selector: 'digital-first-dialog-edit-deck-item',
  template: `
    <mdc-dialog>
      <mdc-dialog-container>
        <mdc-dialog-surface>
          <mdc-dialog-title>Deck Item</mdc-dialog-title>
          <mdc-dialog-content>
            Edit Deck Item
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
export class DialogEditDeckItemComponent implements OnInit {
  deckItem: any
  deckItems: any[]
  filteredItems: any[]

  constructor(
    public dialogRef: MdcDialogRef<DialogEditDeckItemComponent>,
    @Inject(MDC_DIALOG_DATA) public data: DialogEditDeckItemData
  ) {}

  filterItem(value) {
    if (!value) {
      this.filteredItems = [...this.deckItems]
    } else {
      this.filteredItems = [...this.deckItems].filter(item => {
        if (item.title) {
          return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
        } else {
          return 0
        }
      })
    }
  }

  ngOnInit() {
    this.deckItem = this.data.deckItem
    this.deckItems = this.data.deckItems
    this.filteredItems = [...this.deckItems]
  }

  closeDialog(item): void {
    this.dialogRef.close(item)
  }
}

import { Component, OnInit, Inject } from '@angular/core'
import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web'
import { FormGroup, FormControl, Validators } from '@angular/forms'

export const EDIT_DECK_ITEM_CLOSE = 'close'
export interface DialogEditDeckItemData {
  deckItem: any
  deckItems: { id: any; name: string }[]
}

export enum FormControlType {
  Text = 'text',
  Hidden = 'hidden'
}

@Component({
  selector: 'digital-first-dialog-edit-deck-item',
  templateUrl: './dialog-edit-deck-item.component.html',
  styles: [
    `
    .mdc-dialog__surface {
        width: 800px;
        max-height: 800px;
        min-height: 800px;
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

  public formControlType = FormControlType

  public formControls = [
  {
    name: 'id',
    label: 'id',
    type: FormControlType.Hidden
  },   {
    name: 'title',
    label: 'title',
    type: FormControlType.Text
  },   {
    name: 'cardType',
    label: 'cardType',
    type: FormControlType.Text
  },   {
    name: 'supportingText',
    label: 'supportingText',
    type: FormControlType.Text
  },   {
    name: 'size',
    label: 'size',
    type: FormControlType.Text
  },   {
    name: 'sortOrder',
    label: 'sortOrder',
    type: FormControlType.Text
  },   {
    name: 'colour',
    label: 'colour',
    type: FormControlType.Text
  },   {
    name: 'titleClass',
    label: 'titleClass',
    type: FormControlType.Text
  },   {
    name: 'media',
    label: 'media',
    type: FormControlType.Text
  },   {
    name: 'data',
    label: 'data',
    type: FormControlType.Text
  }
]

  dialogForm = new FormGroup({
    id: new FormControl('', Validators.required),
    parent: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    cardType: new FormControl('', Validators.required),
    supportingText: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    sortOrder: new FormControl('', Validators.required),
    colour: new FormControl('', Validators.required),
    titleClass: new FormControl('', Validators.required),
    media: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required)
  })

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

  submit(): void {
    if (this.dialogForm.invalid) {
      return
    }

    this.dialogRef.close(this.dialogForm.value)
  }
}

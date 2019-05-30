import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DeckItem, Brief } from '../../models/deck-item-model'
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms'
import { CardType } from '../../models/card-type-enum'
import { clamp } from '../../../../utils'
import { debounceTime } from 'rxjs/operators'

const actionGroupItem = {
  title: [''],
  url: ['']
}

@Component({
  selector: 'digital-first-edit-card',
  templateUrl: './edit-card.component.html',
  styles: []
})
export class EditCardComponent implements OnInit {

  @Input()
  public briefs: Brief[]

  @Input()
  cardTypes

  @Input()
  cards: DeckItem[]

  _selected: any

  @Input()
  set selected(val) {
    // tslint:disable-next-line: no-console
    console.log(`👺 selected: `, val)

    this._selected = JSON.parse(JSON.stringify(val))
    this.populateEditCardForm(this._selected)
  }

  get selected(): DeckItem {
    return this._selected
  }

  @Output()
  public onSubmitted: EventEmitter<DeckItem> = new EventEmitter()

  @Output()
  public onCancelled: EventEmitter<DeckItem> = new EventEmitter()

  public showBriefList = true
  public showEditMedia = false
  public showEditData = true
  public showViewData = false

  public cardForm: FormGroup = this.fb.group({
    id: [],
    title: ['', Validators.required],
    parent: [''],
    supportingText: [''],
    size: ['', Validators.required],
    cardType: ['', Validators.required],
    sortOrder: [],
    colour: ['', Validators.required],
    titleClass: [],
    media: this.fb.group({
      id: [],
      type: [],
      url: ['']
    }),
    actions: this.fb.array([]),
    data: [],
    selectedBriefs: []
  })

  get actions(): FormArray {
    return this.cardForm.get('actions') as FormArray
  }

  get action(): FormGroup {
    return this.fb.group(actionGroupItem)
  }

  constructor(private fb: FormBuilder) {}

  public getSize() {
    return `df-cell--${this.cardForm.get('size').value}-col`
  }

  ngOnInit() {
    // this.cardForm.get('size').valueChanges.subscribe(value => {
    //   if (this._selected) {
    //     this._selected.size = clamp(value, 1, 12)
    //   }
    // })
    // this.cardForm.get('cardType').valueChanges.subscribe(value => {
    //   this.handleCardType(value)
    // })
  }

  public handleAddAction(): void {
    this.actions.push(this.fb.group(actionGroupItem))
  }

  public handleRemoveAction(index: any, action: any) {
    this.actions.removeAt(index)
  }

  public handleCancelEditCard() {
    this.clearEditedData(this.selected)
    this.onCancelled.emit(this.selected)
  }

  public handleSubmit(card: DeckItem) {
    // tslint:disable-next-line: no-console
    console.log(`👺 handleSubmit: `, card)
    if (!this.cardForm.valid) {
      return
    }
    const editedCard = this.cardForm.value
    this.onSubmitted.emit(editedCard)
    this.clearEditedData(card)
  }

  private clearEditedData(card): void {
    // tslint:disable-next-line: no-console
    console.log(`👺 clearEditedData: `, card)
    // remove card just created
    if (!card.id) {
      const cardItems = this.cards.filter(item => {
        if (item && item.id) {
          return card.id !== item.id
        }
      })

      this.cards = cardItems
    }

    this.cardForm.reset()
    // As form.reset won't clear form array controls
    // hence we have to do it here
    this.cardForm.setControl('actions', new FormArray([]))
  }

  private populateEditCardForm(currentCard: DeckItem) {
    const patchCard = {
      id: currentCard.id,
      title: currentCard.title,
      parent: currentCard.parent,
      supportingText: currentCard.supportingText,
      size: currentCard.size,
      cardType: currentCard.cardType,
      sortOrder: currentCard.sortOrder,
      colour: currentCard.colour,
      titleClass: currentCard.titleClass,
      media: {
        type: currentCard.media ? currentCard.media.type : '',
        url: currentCard.media ? currentCard.media.url : '',
        id: currentCard.media ? currentCard.media.id : ''
      },
      actions: currentCard.actions ? currentCard.actions : [],
      data: currentCard.data,
      selectedBriefs:
        currentCard.cardType === CardType.BriefSummary && currentCard.data
          ? currentCard.data
          : null
    }

    // got to populate the form array
    if (currentCard.actions) {
      currentCard.actions.forEach(p => {
        this.actions.push(this.action)
      })
    }

    // tslint:disable-next-line: no-console
    console.log(`👺 currentCard: `, patchCard, currentCard)

    this.handleCardType(currentCard.cardType)
    this.cardForm.patchValue(patchCard)
  }

  public handleChangeBrief($event) {
    const briefdata = this.cardForm.get('selectedBriefs').value

    // tslint:disable-next-line: no-console
    console.log(`👺`, briefdata)
    this.cardForm.patchValue({ data: briefdata })
  }

  // Card Type determins a few UI controls to be visible or not
  // TODO: a better way to handle the UI changes, maybe split to several edit tempaltes?
  private handleCardType(typeName: CardType) {
    this.showEditMedia =
      typeName === CardType.Image ||
      typeName === CardType.Audio ||
      typeName === CardType.Video

    this.showBriefList = typeName === CardType.BriefSummary
    this.showViewData = this.showBriefList
    this.showEditData = typeName === CardType.Chart

    if (this.showEditMedia) {
      this.cardForm
        .get('media')
        .get('url')
        .setValidators(Validators.required)
    } else {
      this.cardForm
        .get('media')
        .get('url')
        .clearValidators()
    }
  }
}

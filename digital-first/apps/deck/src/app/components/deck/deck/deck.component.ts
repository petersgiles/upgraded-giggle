import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core'
import { DeckItem, Brief } from '../models/deck-item-model'
import { CardType } from '../models/card-type-enum'

import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { Subject, Subscription, BehaviorSubject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators'
import { webSafeColours, clamp, getContrastYIQ } from '../../../utils'

const defaultCard = {
  title: 'New Card',
  supportingText: null,
  id: null,
  parent: null,
  size: '4',
  cardType: CardType.Standard,
  sortOrder: '999',
  colour: 'DarkSlateGrey',
  titleClass: null,
  media: null,
  actions: null,
  data: null,
  hasChildren: false
}

const actionGroupItem = {
  title: [''],
  url: ['']
}

@Component({
  selector: 'df-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit, OnDestroy {
  public selectedCard: DeckItem

  @Input()
  public readOnly = true

  @Input()
  public allowMutate = true

  @Input()
  public cards: DeckItem[]

  @Input()
  public briefs: Brief[]

  @Input()
  public eligibleParents: any[]

  @Input()
  public cardTypes: string[]

  @Input()
  public parent: string

  @Output()
  public onAction: EventEmitter<any> = new EventEmitter()

  @Output()
  public onSubmitted: EventEmitter<DeckItem> = new EventEmitter()

  public webSafeColours$: BehaviorSubject<any> = new BehaviorSubject(
    webSafeColours
  )

  private selectedCardSubscription: Subscription
  public cardEdit: Subject<any> = new Subject<any>()
  public showEditSupportingText = true
  public showBriefList = true
  public showEditMedia = false
  public showEditData = true
  public showViewData = false

  public currrentCardColour: any

  // Leave this it's the weird way you have to do enums in the template
  public cardType = CardType

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

  public ngOnInit() {
    this.selectedCardSubscription = this.cardEdit
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((currentCard: DeckItem) => {
        this.selectedCard = currentCard
        if (currentCard) {
          this.populateEditCardForm(currentCard)
        }
      })

    this.cardForm.get('title').valueChanges.subscribe(value => {
      if (this.selectedCard) {
        this.selectedCard.title = value
      }
    })

    this.cardForm.get('size').valueChanges.subscribe(value => {
      if (this.selectedCard) {
        this.selectedCard.size = clamp(value, 1, 12)
      }
    })

    this.cardForm.get('colour').valueChanges.subscribe(value => {
      if (this.selectedCard) {
        this.selectedCard.colour = value
      }
    })

    this.cardForm.get('cardType').valueChanges.subscribe(value => {
      this.handleCardType(value)
    })
  }

  public ngOnDestroy(): void {
    this.selectedCardSubscription.unsubscribe()
  }

  // EDITING THE DECK

  public handleAddNewCard(): void {
    const newCard = JSON.parse(JSON.stringify(defaultCard))
    newCard.parent = this.parent
    this.cards.push(newCard)
    this.cardEdit.next(newCard)
  }

  public handleAddAction(): void {
    this.actions.push(this.fb.group(actionGroupItem))
  }

  public handleRemoveAction(index: any, action: any) {
    this.actions.removeAt(index)
  }

  public handleCancelEditCard(card) {
    this.clearEditedData(card)
  }

  public handleSubmit(card: DeckItem) {
    if (!this.cardForm.valid) {
      return
    }
    const editedCard = this.cardForm.value
    this.onSubmitted.emit(editedCard)
    this.clearEditedData(card)
  }

  private clearEditedData(card): void {
    // remove card just created
    if (!card.id) {
      const cardItems = this.cards.filter(item => {
        if (item && item.id) {
          return card.id !== item.id
        }
      })

      this.cards = cardItems
    }

    this.cardEdit.next(null)
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

    this.handleCardType(currentCard.cardType)
    this.cardForm.patchValue(patchCard)
  }

  public handleChangeBrief($event) {
    const briefdata = this.cardForm.get('selectedBriefs').value

    // tslint:disable-next-line: no-console
    console.log(`👺`, briefdata)
    this.cardForm.patchValue({ data: briefdata })
  }

  // USING THE DECK

  public navigate(card: DeckItem) {
    if (card) {
      if (card.cardType === CardType.Parent) {
        this.onAction.emit(card)
      }
      if (card.actions && card.actions[0]) {
        this.onAction.emit(card.actions[0])
      }
    }
  }

  public getTextColour(hexcolour) {
    return getContrastYIQ(hexcolour)
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

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

@Component({
  selector: 'digital-first-deck',
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

  @Output()
  public onCancelled: EventEmitter<DeckItem> = new EventEmitter()

  public webSafeColours$: BehaviorSubject<any> = new BehaviorSubject(
    webSafeColours
  )

  private selectedCardSubscription: Subscription
  public cardEdit: Subject<any> = new Subject<any>()
  public showEditSupportingText = true


  public currrentCardColour: any

  // Leave this it's the weird way you have to do enums in the template
  public cardType = CardType

  constructor() {}

  public ngOnInit() {
    this.selectedCardSubscription = this.cardEdit
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((currentCard: DeckItem) => {
        this.selectedCard = currentCard
        if (currentCard) {

        }
      })
  }

  public ngOnDestroy(): void {
    this.selectedCardSubscription.unsubscribe()
  }

  // EDITING THE DECK

  public handleCancelEdit($event) {
    console.log(`handleCancelEdit`, $event)
    this.cardEdit.next(null)
  }

  public handleAddNewCard(): void {
    const newCard = JSON.parse(JSON.stringify(defaultCard))
    newCard.parent = this.parent
    this.cards.push(newCard)
    this.cardEdit.next(newCard)
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
}

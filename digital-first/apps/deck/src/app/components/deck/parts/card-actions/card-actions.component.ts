import { Component, OnInit, Input } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'
import { CardType } from '../../models/card-type-enum'

@Component({
  selector: 'digital-first-card-actions',
  templateUrl: './card-actions.component.html',
  styles: []
})
export class CardActionsComponent implements OnInit {
  constructor() {}

  // Leave this it's the weird way you have to do enums in the template
  public cardType = CardType

  @Input()
  card: DeckItem

  @Input()
  readOnly: boolean

  @Input()
  selected: boolean

  ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-card-supporting-text',
  templateUrl: './card-supporting-text.component.html',
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    `
  ]
})
export class CardSupportingTextComponent implements OnInit {

  constructor() { }

  @Input()
  card: DeckItem

  @Input()
  readOnly: boolean

  @Input()
  selected: boolean
  
  ngOnInit() {
  }

}

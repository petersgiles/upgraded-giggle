import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-embed-card',
  templateUrl: './embed-card.component.html',
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
export class EmbedCardComponent implements OnInit {

  constructor() { }
  
  @Input()
  card: DeckItem

  @Input()
  readOnly: boolean

  @Input()
  selected: boolean

  @Output()
  onEdit: EventEmitter<DeckItem> = new EventEmitter()

  handleEdit() {
    this.onEdit.emit(this.card)
  }

  ngOnInit() {
  }

}

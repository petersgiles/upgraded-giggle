import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'


@Component({
  selector: 'digital-first-audio-card',
  templateUrl: './audio-card.component.html',
  styles: []
})
export class AudioCardComponent implements OnInit {

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

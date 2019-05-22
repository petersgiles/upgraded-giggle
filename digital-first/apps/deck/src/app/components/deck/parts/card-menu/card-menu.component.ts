import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-card-menu',
  templateUrl: './card-menu.component.html',
  styles: []
})
export class CardMenuComponent implements OnInit {
  constructor() {}

  @Input()
  card: DeckItem

  @Input()
  readOnly: boolean

  @Input()
  selected: boolean

  @Output()
  onEdit: EventEmitter<DeckItem> = new EventEmitter()

  ngOnInit() {}
}

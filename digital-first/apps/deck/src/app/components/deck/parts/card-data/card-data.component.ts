import { Component, OnInit, Input } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-card-data',
  templateUrl: './card-data.component.html',
  styles: []
})
export class CardDataComponent implements OnInit {

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

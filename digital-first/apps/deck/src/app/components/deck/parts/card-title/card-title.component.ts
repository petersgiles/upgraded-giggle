import { Component, OnInit, Input } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'df-card-title',
  templateUrl: './card-title.component.html',
  styles: []
})
export class CardTitleComponent implements OnInit {
  constructor() {}

  @Input()
  card: DeckItem

  ngOnInit() {}
}

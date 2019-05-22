import { Component, OnInit, Input } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-edit-card',
  templateUrl: './edit-card.component.html',
  styles: []
})
export class EditCardComponent implements OnInit {
  constructor() {}

  @Input()
  card: DeckItem

  ngOnInit() {}
}

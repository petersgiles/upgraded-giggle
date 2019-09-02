import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-standard-card',
  templateUrl: './standard-card.component.html',
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .df-card__expanded-container {
      display: flex;
      flex-grow: 1;
      align-self: flex-start;
      justify-content: flex-end;
    }
    
    .df-card__expanded-title-text {
      color: rgba(0, 0, 0, 0.54);
      font-size: 1rem;
      line-height: 18px;
      overflow: hidden;
      padding: 16px 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: flex-end;
    }
    `
  ]
})
export class StandardCardComponent implements OnInit {

  constructor() { }
  
  @Input()
  card: DeckItem

  @Input()
  readOnly: boolean

  @Input()
  selected: boolean

  @Output()
  onEdit: EventEmitter<DeckItem> = new EventEmitter()

  @Output()
  public onAction: EventEmitter<any> = new EventEmitter()
  
  handleEdit() {
    this.onEdit.emit(this.card)
  }

  ngOnInit() {
  }

}

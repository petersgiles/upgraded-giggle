import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DeckItem } from '../../models/deck-item-model'

@Component({
  selector: 'digital-first-chart-card',
  templateUrl: './chart-card.component.html',
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
export class ChartCardComponent implements OnInit {
  _card: DeckItem;
  data

  constructor() { }
  
  @Input()
  set card(val: DeckItem){
    this._card = val
    console.log(this._card)
    if(this._card && this._card.data){
      this.data = JSON.parse(JSON.stringify(this._card.data))
    }
  }

  get card(): DeckItem {
    return this._card 
  }


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

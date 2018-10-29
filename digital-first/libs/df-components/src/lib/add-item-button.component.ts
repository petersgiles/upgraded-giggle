import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'digital-first-add-item-button',
  template: `
  <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" (click)="onAddItem.emit()">{{icon}}</a>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class AddItemButtonComponent implements OnInit {

  @Input()
  icon = 'add'

  @Input()
  title = 'Add'

  @Output()
  onAddItem: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

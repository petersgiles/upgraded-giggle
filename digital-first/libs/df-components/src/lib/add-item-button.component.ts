import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'digital-first-add-item-button',
  template: `
  <button attr.aria-label="{{title}}" title="{{title}}" (click)="onAddItem.emit()" mdc-button dense><mdc-icon>{{icon}}</mdc-icon>{{title}}</button>
`,
styles: [`
:host {
  padding-right:4px;
  width: 200px;
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

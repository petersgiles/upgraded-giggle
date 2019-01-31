import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'digital-first-edit-item-button',
  template: `
  <button attr.aria-label="{{title}}" title="{{title}}" (click)="onEditItem.emit()" mdc-button dense><mdc-icon>{{icon}}</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
`,
styles: [`
:host {
  padding-right:4px;
  width: 100px;
}
`]
})
export class EditItemButtonComponent implements OnInit {

  @Input()
  icon = 'edit'

  @Input()
  title = 'Edit'

  @Output()
  onEditItem: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

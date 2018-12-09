import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { getContrastYIQ } from '@digital-first/df-utils'

@Component({
  selector: 'digital-first-navigation-item-button',
  template: `
  <button attr.aria-label="{{title}}" title="{{title}}" (click)="onNavigate.emit()" mdc-button dense [style.color]="_textColour">
  <mdc-icon [style.color]="_textColour">{{icon}}</mdc-icon>{{title}}</button>
`,
styles: [`
:host {
  padding-right:4px;
}
`]
})
export class NavigateButtonComponent implements OnInit {

  @Input()
  icon = 'chevron_left'

  @Input()
  title = 'Back'

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onNavigate: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { getContrastYIQ } from '@digital-first/df-utils'

@Component({
  selector: 'digital-first-print-page-button',
  template: `
  <button attr.aria-label="{{title}}" title="{{title}}" [style.color]="_textColour"
  (click)="onPrintClick.emit()" mdc-button dense><mdc-icon [style.color]="_textColour">{{icon}}</mdc-icon>{{title}}</button>
`,
styles: [`
:host {
  padding-right:4px;
}
`]
})
export class PrintPageButtonComponent implements OnInit {

  @Input()
  icon = 'print'

  @Input()
  title = 'Print'

  @Output()
  onPrintClick: EventEmitter<null> = new EventEmitter()

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  constructor() { }

  ngOnInit() {
  }

}

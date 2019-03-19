import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { getContrastYIQ } from '@df/utils'

@Component({
  selector: 'digital-first-clear-button',
  template: `
    <button attr.aria-label="{{title}}" title="{{title}}" [style.color]="_textColour"
    (click)="onClear.emit()" mdc-button dense><mdc-icon [style.color]="_textColour">{{icon}}</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
  `,
  styles: [`
  :host {
    padding-right:4px;
    width: 200px;
  }
  `]
})
export class ClearButtonComponent implements OnInit {

  @Input()
  icon = 'clear_all'

  @Input()
  title = 'Clear'

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onClear: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { getContrastYIQ } from '@df/utils'

@Component({
  selector: 'digital-first-export-button',
  template: `
    <button attr.aria-label="{{title}}" title="{{title}}" [style.color]="_textColour"
    (click)="onExport.emit()" mdc-button dense><mdc-icon [style.color]="_textColour">{{icon}}</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
  `,
  styles: [`
  :host {
    padding-right:4px;
    width: 140px;
  }
  `]
})
export class ExportButtonComponent implements OnInit {

  @Input()
  icon = 'save_alt'

  @Input()
  title = 'Export'

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onExport: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

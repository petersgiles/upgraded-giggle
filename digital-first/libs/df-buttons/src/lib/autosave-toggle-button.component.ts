import { Component, OnInit, Input, Output, EventEmitter, setTestabilityGetter } from '@angular/core'
import { getContrastYIQ } from '@df/utils'

@Component({
  selector: 'digital-first-autosave-toggle-button',
  template: `
    <button attr.aria-label="{{setTitle()}}" title="{{setTitle()}}" [style.color]="_textColour"
    (click)="onAutosaveClicked.emit(!value)" mdc-button dense><mdc-icon [style.color]="_textColour">toggle_{{value?'on':'off'}}</mdc-icon><span [innerHtml]="setTitle() | safeHtml"></span></button>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class AutosaveToggleButtonComponent implements OnInit {

  @Input()
  title = 'Autosave'

  @Input()
  value: boolean

  setTitle() {
    return `${this.title}&nbsp;${this.value ? 'On' : 'Off'}`
  }

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onAutosaveClicked: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

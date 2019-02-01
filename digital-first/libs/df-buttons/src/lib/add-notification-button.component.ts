import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { getContrastYIQ } from '@digital-first/df-utils'

@Component({
  selector: 'digital-first-add-notification-button',
  template: `
    <button attr.aria-label="{{title}}" title="{{title}}" [style.color]="_textColour"
    (click)="onManageNotification.emit()" mdc-button dense><mdc-icon [style.color]="_textColour">{{icon}}</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
  `,
  styles: [`
  :host {
    padding-right:4px;
    width: 200px;
  }
  `]
})
export class AddNotificationButtonComponent implements OnInit {

  @Input()
  icon = 'add_alert'

  @Input()
  title = 'Notify Me'

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onManageNotification: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

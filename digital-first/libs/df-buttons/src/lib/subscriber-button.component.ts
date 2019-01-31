import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { getContrastYIQ } from '@digital-first/df-utils'

@Component({
  selector: 'digital-first-subscriber-button',
  template: `
    <button attr.aria-label="{{getTitle() | safeHtml}}" title="{{getTitle() | safeHtml}}" [style.color]="_textColour"
    (click)="onManageSubscription.emit(!isSubscribed)"
    mdc-button dense ><mdc-icon [style.color]="_textColour">notifications_{{isSubscribed?'active':'off'}}</mdc-icon><span [innerHtml]="getTitle() | safeHtml"></span></button>
  `,
  styles: [`
  :host {
    padding-right:4px;
    width: 200px;
  }
  `]
})
export class AddSubscriptionButtonComponent implements OnInit {

  @Input()
  icon = 'add_alert'

  @Input()
  subscribeTitle = 'Notify&nbsp;OFF'

  @Input()
  unSubscribeTitle = 'Notify&nbsp;ON'

  @Input()
  isSubscribed = false

  _textColour: string

  @Input()
  set background(hexcolour) {
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onManageSubscription: EventEmitter<boolean> = new EventEmitter()

  getTitle() {
    return this.isSubscribed ? this.unSubscribeTitle : this.subscribeTitle
  }

  constructor() { }

  ngOnInit() {
  }

}

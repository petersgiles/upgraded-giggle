import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-add-notification-button',
  template: `
    <button attr.aria-label="{{title}}" title="{{title}}" (click)="onManageNotification.emit()" mdc-button><mdc-icon>{{icon}}</mdc-icon>{{title}}</button>
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

  @Output()
  onManageNotification: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

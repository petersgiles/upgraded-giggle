import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-add-notification-button',
  template: `
    <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" (click)="onManageNotification.emit()">{{icon}}</a>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class AddNotificationButtonComponent implements OnInit {

  @Input()
  icon = 'add_alert'

  @Input()
  title = 'Manage Notification'

  @Output()
  onManageNotification: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

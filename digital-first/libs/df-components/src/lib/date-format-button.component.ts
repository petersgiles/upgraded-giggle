import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'digital-first-date-format-button',
  template: `
    <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" *ngIf="timeFormat=='dateFormat'" (click)="onChangeDateFormat.emit('calendar')">date_range</a>
    <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" *ngIf="timeFormat=='timeAgo'" (click)="onChangeDateFormat.emit('dateFormat')">schedule</a>
    <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" *ngIf="timeFormat=='calendar'" (click)="onChangeDateFormat.emit('timeAgo')">calendar_today</a>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class DateFormatButtonComponent implements OnInit {

  @Input()
  title = 'Date Format'

  @Input()
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar'

  @Output()
  onChangeDateFormat: EventEmitter<'dateFormat' | 'timeAgo' | 'calendar'> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

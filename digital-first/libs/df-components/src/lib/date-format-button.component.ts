import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'digital-first-date-format-button',
  template: `
  <button  attr.aria-label="{{title}}" title="{{title}}"
  *ngIf="timeFormat=='dateFormat'" (click)="onChangeDateFormat.emit('calendar')" mdc-button dense><mdc-icon>date_range</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
  <button  attr.aria-label="{{title}}" title="{{title}}" *ngIf="timeFormat=='timeAgo'" (click)="onChangeDateFormat.emit('dateFormat')" mdc-button dense><mdc-icon>schedule</mdc-icon>{{title}}</button>
  <button  attr.aria-label="{{title}}" title="{{title}}"
  *ngIf="timeFormat=='calendar'" (click)="onChangeDateFormat.emit('timeAgo')" mdc-button dense><mdc-icon>calendar_today</mdc-icon><span [innerHtml]="title | safeHtml"></span></button>
 `,
 styles: [`
  :host {
    padding-right:4px;
    width: 200px;
  }
  `]
})
export class DateFormatButtonComponent implements OnInit {

  @Input()
  title = 'Time Format'

  @Input()
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar'

  @Output()
  onChangeDateFormat: EventEmitter<'dateFormat' | 'timeAgo' | 'calendar'> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

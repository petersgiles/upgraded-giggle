import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-view-layout-button',
  template: `
  <a mdcIcon attr.aria-label="Change Layout" title="Change Layout" *ngIf="pageFormat=='table'" (click)="onChangePageFormat.emit('list')">dns</a>
  <a mdcIcon attr.aria-label="Change Layout" title="Change Layout" *ngIf="pageFormat=='list'" (click)="onChangePageFormat.emit('card')">view_list</a>
  <a mdcIcon attr.aria-label="Change Layout" title="Change Layout" *ngIf="pageFormat=='card'" (click)="onChangePageFormat.emit('table')">table_chart</a>
  `,
  styles:  [`
  :host {
    padding-right:4px;
  }
  `]
})
export class ViewLayoutButtonComponent implements OnInit {

  @Input()
  pageFormat: 'card' | 'list' | 'table'

  @Output()
  onChangePageFormat: EventEmitter<'card' | 'list' | 'table'> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

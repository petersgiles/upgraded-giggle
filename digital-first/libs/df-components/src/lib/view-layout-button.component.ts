import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-view-layout-button',
  template: `
  <a mdcIcon attr.aria-label="Change to Card Layout" title="Change to Card Layout" *ngIf="pageFormat=='list'" (click)="onChangePageFormat.emit('card')">dns</a>
  <a mdcIcon attr.aria-label="Change to List Layout" title="Change to List Layout" *ngIf="pageFormat=='card'" (click)="onChangePageFormat.emit('list')">view_list</a>
  `,
  styles:  [`
  :host {
    padding-right:4px;
  }
  `]
})
export class ViewLayoutButtonComponent implements OnInit {

  @Input()
  pageFormat: 'card' | 'list'

  @Output()
  onChangePageFormat: EventEmitter<'card' | 'list'> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

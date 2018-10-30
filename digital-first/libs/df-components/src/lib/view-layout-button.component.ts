import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-view-layout-button',
  template: `
  <a mdcIcon attr.aria-label="Change Layout" title="Change Layout" (click)="onChangePageFormat.emit(pageFormat=='list'?'card':'list')">{{pageFormat=='list'?'dns':'view_list'}}</a>
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

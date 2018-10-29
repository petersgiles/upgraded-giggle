import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-archive-button',
  template: `
  <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" (click)="onArchiveItem.emit()">{{icon}}</a>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class ArchiveButtonComponent implements OnInit {

  @Input()
  icon = 'archive'

  @Input()
  title = 'Archive'

  @Output()
  onArchiveItem: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-share-button',
  template: `
  <a mdcIcon attr.aria-label="{{title}}" title="{{title}}" (click)="onShareItem.emit()">{{icon}}</a>
  `,
  styles: [`
  :host {
    padding-right:4px;
  }
  `]
})
export class ShareButtonComponent implements OnInit {

  @Input()
  icon = 'share'

  @Input()
  title = 'Share Item'

  @Output()
  onShareItem: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { getContrastYIQ } from '@df/utils'

@Component({
  selector: 'digital-first-page-title',
  template: `
  <div class="page_title" [style.background-color]="_background" [style.color]="_textColour">
    <div class="reader-card-article__title page_title_text" mdcHeadline5 (click)="onTitleClicked.emit($event)">{{title | titlecase}}</div>
    <ng-content></ng-content>
  </div>
  `,
  styles: []
})
export class PageTitleComponent implements OnInit {

  @Input()
  title: string

  _background: string
  _textColour: string

  @Input()
  set background(hexcolour) {
    this._background = hexcolour
    this._textColour = getContrastYIQ(hexcolour)
  }

  @Output()
  onTitleClicked: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

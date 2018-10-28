import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'digital-first-page-title',
  template: `
  <div class="page_title">
    <div class="reader-card-article__title page_title_text" mdcHeadline5>{{title | titlecase}}</div>
    <ng-content></ng-content>
  </div>
  `,
  styles: []
})
export class PageTitleComponent implements OnInit {

  @Input()
  title: string

  constructor() { }

  ngOnInit() {
  }

}

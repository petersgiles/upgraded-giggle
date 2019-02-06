import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'digital-first-error-page-not-found',
  template: `
    <div class="app-announcement-wall digital-first-error-page-not-found">
      <div class="app-announcement-container">
        <h1>
          Sorry, we couldn't find the page you were looking for.
        </h1>
      </div>
    </div>
  `
})
export class ErrorPageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

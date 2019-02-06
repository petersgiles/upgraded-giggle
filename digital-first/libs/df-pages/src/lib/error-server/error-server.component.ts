import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'digital-first-error-server',
  template: `
    <div class="app-announcement-wall digital-first-error-server">
      <div class="app-announcement-container">
        <h1>oh no...</h1>
        <h3>We have had an error</h3>
        <h4>Error 500</h4>
        <p>Sorry...please try again.</p>
      </div>
    </div>
  `
})
export class ErrorServerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

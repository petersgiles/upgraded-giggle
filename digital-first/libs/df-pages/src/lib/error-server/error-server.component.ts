import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'digital-first-error-server',
  template: `
  <div class="app-announcement-wall digital-first-error-server">
    <div class="app-announcement-container">
      <h1>oh no...</h1>
      <h3>We have had an error</h3>
      <h4>Error 500</h4>
      <p>Sorry...please check back (click refresh) in just a moment.</p>
      <p>If you are having problems authenticating please call our Customer Support team at 222-2222 I got an answering machine that can talk to you</p>
    </div>
  </div>
`
})
export class ErrorServerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

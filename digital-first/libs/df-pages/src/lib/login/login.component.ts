import { Component, OnInit, Inject } from '@angular/core'

declare var window: any

@Component({
  selector: 'digital-first-login',
  template: `
    <div class="app-announcement-wall digital-first-login">
      <div class="app-announcement-container">
        <h1 class="dark">Login</h1>
        <h3>Click <a href="{{adfsurl}}">HERE</a> so we can verify who you are</h3>
        <p>If you are having problems authenticating please call our Customer Support team at 222-2222 I got an
          answering machine that can talk to you</p>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {

  referrer: any
  adfsurl: string

  constructor() {

    this.referrer = `${window.location.origin}`
    const returnUrl = window.location.search.split('=')

    // if (returnUrl.length > 1) {
    //   this.adfsurl = `${environment.AUTH_BASE_PATH}/api/auth/login?returnUrl=${this.referrer}${returnUrl[1]}`
    // }
    // else {
    //   this.adfsurl = `${environment.AUTH_BASE_PATH}/api/auth/login?returnUrl=${this.referrer}`
    // }
  }

  ngOnInit() {
  }

}

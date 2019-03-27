import { Component, OnInit, Inject } from '@angular/core'
import { WINDOW } from '@df/utils'
import { FEDERATEDLOGINAPIPATH, APPBASEPATH } from '@digital-first/df-app-tokens'

@Component({
  selector: 'digital-first-login-page',
  template: ``,
  styleUrls: []
})
export class LoginPageComponent implements OnInit {
  referrer: any
  adfsurl: string

  constructor(@Inject(WINDOW) private window: Window, @Inject(FEDERATEDLOGINAPIPATH) private federatedLoginApiPath: any, @Inject(APPBASEPATH) private appBasePath) {
    this.referrer = `${window.location.origin}`

    // TODO:  tidy up for edge cases
    const returnUrl = this.window.location.search.split('=')

    if (returnUrl.length > 1) {
      this.adfsurl = `${this.federatedLoginApiPath}/api/auth/login?returnUrl=${this.referrer}${this.appBasePath}${returnUrl[1]}`
    }
    else {
      this.adfsurl = `${this.federatedLoginApiPath}/api/auth/login?returnUrl=${this.referrer}${this.appBasePath}`
    }
  }

  ngOnInit() {
    window.location.href = this.adfsurl
  }
}

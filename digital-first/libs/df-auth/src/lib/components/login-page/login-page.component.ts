import { Component, OnInit, Inject } from '@angular/core'
import { WINDOW } from '@digital-first/df-utils'
import { FEDERATEDLOGINAPIPATH } from '@digital-first/df-app-tokens'

@Component({
  selector: 'digital-first-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  referrer: any
  adfsurl: string

  constructor(@Inject(WINDOW) private window: Window, @Inject(FEDERATEDLOGINAPIPATH) private federatedLoginApiPath: any) {
    this.referrer = `${window.location.origin}`

    // TODO:  tidy up for edge cases
    const returnUrl = this.window.location.search.split('=')

    if (returnUrl.length > 1) {
      this.adfsurl = `${this.federatedLoginApiPath}/api/auth/login?returnUrl=${this.referrer}${returnUrl[1]}`
    }
    else {
      this.adfsurl = `${this.federatedLoginApiPath}/api/auth/login?returnUrl=${this.referrer}`
    }
  }

  ngOnInit() {}
}

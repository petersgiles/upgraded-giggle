import { Component, OnInit, Inject } from '@angular/core';

declare var window: any;

@Component({
  selector: 'digital-first-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  referrer: any;
  adfsurl: string;

  constructor() {
    this.referrer = `${window.location.origin}`;
    const returnUrl = window.location.search.split('=');

    // if (returnUrl.length > 1) {
    //   this.adfsurl = `${environment.AUTH_BASE_PATH}/api/auth/login?returnUrl=${this.referrer}${returnUrl[1]}`
    // }
    // else {
    //   this.adfsurl = `${environment.AUTH_BASE_PATH}/api/auth/login?returnUrl=${this.referrer}`
    // }
  }

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'digital-first-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLoad($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
  }

  onError($event) {
    // tslint:disable-next-line:no-console
    console.log($event)
  }
}

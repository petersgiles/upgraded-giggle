import { Component, OnInit } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'

@Component({
  selector: 'digital-first-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public background$: BehaviorSubject<string> = new BehaviorSubject('#455a64')
  constructor() {}

  ngOnInit() {}

  handleEvent($event) {}
}

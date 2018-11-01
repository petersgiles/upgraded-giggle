import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  @Input()
  contact

  @Output()
  onMailClicked: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}

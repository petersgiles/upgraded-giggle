import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'digital-first-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  card: any

  constructor() { }

  ngOnInit() {
  }

}

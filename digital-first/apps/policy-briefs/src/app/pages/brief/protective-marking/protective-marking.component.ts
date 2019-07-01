import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'digital-first-protective-marking',
  templateUrl: './protective-marking.component.html',
  styleUrls: ['./protective-marking.component.scss']
})
export class ProtectiveMarkingComponent implements OnInit {
  @Input()
  brief

  constructor() {}

  ngOnInit() {

  }
}

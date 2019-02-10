import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'digital-first-commitment-mad-lib',
  templateUrl: './commitment-mad-lib.component.html',
  styleUrls: ['./commitment-mad-lib.component.scss']
})
export class CommitmentMadLibComponent implements OnInit {
  @Input()
  commitment

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core'
import * as indef from 'indefinite'
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

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

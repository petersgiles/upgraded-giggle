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
    return indef(term)
  }

  public getMBT(val: number) {
    // val is entered in millions so X 1000
    const m = val * 1000
    return m
  }
}

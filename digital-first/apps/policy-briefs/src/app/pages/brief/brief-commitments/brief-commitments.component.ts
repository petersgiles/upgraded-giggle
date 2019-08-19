import { Component, OnInit, Input } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { Store, select } from '@ngrx/store'

@Component({
  selector: 'digital-first-brief-commitments',
  templateUrl: './brief-commitments.component.html',
  styleUrls: ['./brief-commitments.component.scss']
})
export class BriefCommitmentsComponent implements OnInit {
  brief$: any
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
  }
}

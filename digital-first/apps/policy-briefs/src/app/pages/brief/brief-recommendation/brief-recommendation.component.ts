import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'digital-first-brief-recommendation',
  templateUrl: './brief-recommendation.component.html',
  styleUrls: ['./brief-recommendation.component.scss']
})
export class BriefRecommendationComponent implements OnInit {
  brief$: any;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
  }

}

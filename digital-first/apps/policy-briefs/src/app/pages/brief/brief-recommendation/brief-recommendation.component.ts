import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Brief } from '../../../models';
import { Subscription } from 'rxjs';

const defaultValues = {}

const recommendationItem = {
  description: [''],
  outcome1: ['Agree'],
  outcome2: ['Disagree'],
  outcome3: ['Clarification Required']
}

@Component({
  selector: 'digital-first-brief-recommendation',
  templateUrl: './brief-recommendation.component.html',
  styleUrls: ['./brief-recommendation.component.scss']
})
export class BriefRecommendationComponent implements OnInit {
  brief$: any;
 
  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))
  }
}

import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'digital-first-brief-recommendation-action',
  templateUrl: './brief-recommendation-action.component.html',
  styleUrls: ['./brief-recommendation-action.component.scss']
})
export class BriefRecommendationActionComponent implements OnInit {
  constructor() {}

  @Input() recommendation

  form = new FormGroup({
    outcome: new FormControl(''),
  });

  ngOnInit() {
    
  }
}

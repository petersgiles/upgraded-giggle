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
    recommendation: new FormControl(''),
    brief: new FormControl(''),
    response: new FormControl(''),
  });

  ngOnInit() {

    let response
    if(this.recommendation){
      response =  this.recommendation.response 

    this.form.patchValue({
      recommendation: this.recommendation.id,
      brief: this.recommendation.brief,
      response:  response,
    })
  }

    this.form.valueChanges.subscribe(data => {
      console.log('onChanges form', data)
    })
  }
}

import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { Store } from '@ngrx/store'
import { MdcDialog } from '@angular-mdc/web'
import { switchMap } from 'rxjs/operators'
import {
  SetActiveBrief,
  SetBriefRecommendation,
  SetBriefRecommendationResponse
} from '../../../reducers/brief/brief.actions'
import { SetActiveBriefPath } from '../../../reducers/navigation/navigation.actions'
import { EMPTY } from 'rxjs'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'

@Component({
  selector: 'digital-first-brief-recommendation-response',
  templateUrl: './brief-recommendation-response.component.html',
  styleUrls: ['./brief-recommendation-response.component.scss']
})
export class BriefRecommendationResponseComponent implements OnInit {
  selectId$: any
  activeBriefId: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    public dialog: MdcDialog
  ) {}

  @Input() recommendation

  form = new FormGroup({
    recommendation: new FormControl(''),
    brief: new FormControl(''),
    response: new FormControl(''),
    responseid: new FormControl('')
  })

  ngOnInit() {

    this.selectId$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.activeBriefId = params.get('id')
          console.log(`🍏`, this.activeBriefId)

          let recommendationresponse = this.recommendation.response
          ? this.recommendation.response
          : {
              value: null,
              id: null
            }

          this.form.patchValue({
            recommendation: this.recommendation.id,
            brief: this.activeBriefId,
            response: recommendationresponse.value,
            responseid: recommendationresponse.id
          })

          return EMPTY
        })
      )
      .subscribe()



    this.form.valueChanges.subscribe(data => {
      console.log('SetBriefRecommendation form', data)

      this.store.dispatch(
        new SetBriefRecommendationResponse({
          ...data,
          activeBriefId: this.activeBriefId
        })
      )
    })
  }
}

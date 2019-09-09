import { Component, OnInit, Input } from '@angular/core'
import * as fromRoot from '../../../reducers/index'
import * as fromBrief from '../../../reducers/brief/brief.reducer'
import { Store, select } from '@ngrx/store'
import { DeleteBriefCommitmentGQL, SaveBriefCommitmentGQL, CommitmentsLbsGQL } from '../../../generated/graphql';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'digital-first-brief-commitments',
  templateUrl: './brief-commitments.component.html',
  styleUrls: ['./brief-commitments.component.scss']
})
export class BriefCommitmentsComponent implements OnInit {
  brief$: any
  canRemove: boolean
  briefCommitments = null
  briefCommitmentsLookup = []
  selectId$: any;
  activeBriefId: string;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>, 
    // private commitmentsLBS: CommitmentsLbsGQL,
    // private deleteBriefCommitmentGQL: DeleteBriefCommitmentGQL,
    // private saveBriefCommitmentGQL: SaveBriefCommitmentGQL
    ) {}

  ngOnInit() {
    this.brief$ = this.store.pipe(select(fromBrief.selectBriefState))

    this.selectId$ = this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
        this.activeBriefId = params.get('id')

        return EMPTY
      })
    )
    .subscribe()

  }

  navigateToCommitment(commitment) {}

  handleRemoveCommitment(commitment) {}
}

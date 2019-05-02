import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { map, takeUntil, filter, withLatestFrom } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
//import { AppConfigService } from '../../services/app-config.service'
import { CommitmentDetailService } from '../../reducers/commitment-detail/commitment-detail.service'
import * as indef from 'indefinite'
import { Commitment } from '../../models/commitment.model'
import { CommitmentDetailsState } from '../../reducers/commitment-detail/commitment-detail.reducer'
import { getCommitment } from '../../reducers/commitment-detail'

@Component({
  selector: 'digital-first-commitment-detail',
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})
export class CommitmentDetailComponent implements OnInit, OnDestroy {
  commitmentSubscription$: Subscription
  destroyed: boolean
  public commitment: Commitment
  constructor(
    private activatedRoute: ActivatedRoute,
    //private appConfigService: AppConfigService,
    private commitmentDetailService: CommitmentDetailService,
    private store: Store<CommitmentDetailsState>
  ) {}
//  .flatMap(state => state.commitments)
  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        //takeUntil(this.destroyed)
        filter(params => !!params.id),
        withLatestFrom(this.store.select(getCommitment))
      )
      .subscribe(([params, commitments]) => 
        {
          this.loadCommitment(params.id)
          
        })
  }

  loadCommitment(id: string) {
<<<<<<< HEAD
    this.commitmentSubscription$ = this.commitmentDetailService.LoadCommitment(id)
=======
    this.commitmentSubscription$ = this.getCommitmentDetailGQL
      .watch(
        { id: id, bookType: 'red' },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map(value => value.data.commitments))
      .subscribe(dbItem => {
        if (dbItem) {
          const commitment: ICommitment = {
            id: dbItem[0].id,
            title: dbItem[0].title,
            description: dbItem[0].description,
            bookType: dbItem[0].bookType,
            cost: dbItem[0].cost,
            date: dbItem[0].date,
            politicalParty: dbItem[0].politicalParty,
            announcedBy: dbItem[0].announcedBy,
            announcementType: dbItem[0].announcementType
              ? dbItem[0].announcementType.title
              : '',
            criticalDate: dbItem[0].criticalDate
              ? dbItem[0].criticalDate.title
              : '',
            portfolio: dbItem[0].portfolioLookup
              ? dbItem[0].portfolioLookup.title
              : ''
          }
          this.commitment = commitment
        }
      })
>>>>>>> 4eadbe17399e9c816436f13f1ca06811f4249b4e
  }

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

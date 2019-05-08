import { Component, OnInit, OnDestroy,  ChangeDetectionStrategy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription, Subject, Observable, of } from 'rxjs'
import { takeUntil, filter, withLatestFrom } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { CommitmentDetailService } from '../../reducers/commitment-detail/commitment-detail.service'
import * as indef from 'indefinite'
import { Commitment } from '../../models/commitment.model'
import { CommitmentDetailsState } from '../../reducers/commitment-detail/commitment-detail.reducer'
import { getCommitment } from '../../reducers/commitment-detail'
import { CommitmentLocation } from '../../models/commitment.model'
import * as fromRoot from '../../reducers'
import { Config } from '../../services/config.service'
import * as appSelectors from '../../reducers/app'
import {UpdatePMOHandlingAdvice, UpdatePMCHandlingAdvice } from '../../reducers/commitment-detail/commitment-detail.actions'
import { BookType } from '../../generated/graphql';

@Component({
  selector: 'digital-first-commitment-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './commitment-detail.component.html',
  styleUrls: ['./commitment-detail.component.scss']
})

export class CommitmentDetailComponent implements OnInit, OnDestroy {

 
    dropdownPosition: 'top' | 'bottom' = 'bottom';
    pmcitems = [
        { value: 1, label: 'Economic update' },
        { value: 2, label: 'Cabinet' },
        { value: 3, label: 'Minister to write back to Prime Minister' },
        { value: 4, label: 'Minister to implement' }
    ];

    pmoitems = [
      { value: 1, label: 'Economic update' },
      { value: 2, label: 'Cabinet' },
      { value: 3, label: 'Minister to write back to Prime Minister' },
      { value: 4, label: 'Minister to implement' }
  ];

  commitmentSubscription$: Subscription
  electorate$: Observable<CommitmentLocation[]>
  bookType: string
  private readonly destroyed = new Subject<void>();
  public _commitment: Commitment
  get commitment() {
    if(this._commitment)
      return this._commitment
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private commitmentDetailService: CommitmentDetailService,
    private store: Store<CommitmentDetailsState>,
    private store$: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  
    this.store.pipe(select(appSelectors.App.selectAppBookTypeState))
    .subscribe(bookType => {
        this.bookType = bookType
    })
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroyed),
        filter(params => !!params.id)//,
        //withLatestFrom(this.store$)
      )
      .subscribe((params) => {
        //const store = <any>s
       // const config: Config = store.app.config
        this.commitmentDetailService.LoadCommitment(params.id,this.bookType)
      })

      this.commitmentSubscription$ = this.store.pipe(select(getCommitment),
      filter(res => !!res)
      )
      .subscribe((commitment) => {
        this._commitment = commitment
        this.electorate$ = of(this.commitment.electorates)
      })
    }

  ngOnDestroy(): void {
    this.commitmentSubscription$.unsubscribe()
    this.destroyed.next();
    this.destroyed.complete();
  }

  onPMOChange(event){
    this.store.dispatch(new UpdatePMOHandlingAdvice({label: event.label, commitmentId: this.commitment.id}))
  }

  onPMCChange(event){
    this.store.dispatch(new UpdatePMCHandlingAdvice({label: event.label, commitmentId: this.commitment.id}))
  }

  public getIndefiniteArticle(term) {
    if (term) {
      return indef(term)
    }
    return term
  }
}

import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subject, Subscription } from 'rxjs'
import {
  GetRefinerTagsGQL,
  CommitmentsMapPointSearchGQL,
  CommitmentsSearchGQL,
  CommitmentPartsFragment,
  MapPoint
} from '../../generated/graphql'
import { first, map, tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import {
  RefinerAction,
  RefinerActionTypes,
  GetRefinerGroups,
  LoadRefinerGroups,
  RefinerServiceActions,
  SelectRefinerGroup,
  SelectRefiner,
  GetRefinedCommitments,
  LoadRefinedCommitments,
  GetRefinedMapPoints,
  LoadRefinedMapPoints
} from './commitment-refiner.actions'
import {
  RefinerState,
  initialState,
  DataTableColumn,
  RefinerReducer
} from './commitment-refiner.reducer'
import { RefinerEffects } from './commitment-refiner.effects'

const DEBUG = !environment.production

@Injectable({
  providedIn: 'root'
})
export class CommitmentRefinerService implements OnDestroy {
  private store$: BehaviorSubject<RefinerState> = new BehaviorSubject(
    initialState
  )

  private action$: BehaviorSubject<RefinerAction> = new BehaviorSubject(null)

  public columns$: Subject<DataTableColumn[]> = new Subject()
  public mapPoints$: Subject<MapPoint[]> = new Subject()
  public selectedMapPoint$: Subject<any> = new Subject()
  public mapPointCommitments$: Subject<
    CommitmentPartsFragment[]
  > = new Subject()
  public commitments$: Subject<CommitmentPartsFragment[]> = new Subject()
  public refinerGroups$: Subject<any[]> = new Subject()
  private actionSubscription$: Subscription
  private storeSubscription$: Subscription

  constructor(
    private refinerReducer: RefinerReducer,
    private refinerEffects: RefinerEffects,
    private getRefinerTagsGQL: GetRefinerTagsGQL,
    private commitmentsSearchGQL: CommitmentsSearchGQL,
    private commitmentsMapPointSearchGQL: CommitmentsMapPointSearchGQL
  ) {
    this.registerEffects()

    this.actionSubscription$ = this.action$.subscribe(
      (action: RefinerServiceActions) => {
        if (action) {
          this.refinerEffects.run(action)
          this.store$.next(
            this.refinerReducer.reduce(this.store$.getValue(), action)
          )
        }
      }
    )

    this.storeSubscription$ = this.store$.subscribe(store => {
      if (DEBUG) {
        // tslint:disable-next-line:no-console
        console.log(store)

        this.columns$.next(store.columns)
        this.selectedMapPoint$.next(store.selectedMapPoint)
        this.mapPoints$.next(store.mapPoints)
        this.commitments$.next(store.commitments)
        // this.mapPointCommitments$.next(store.mapPointCommitments)
        this.refinerGroups$.next(store.refinerGroups)
      }
    })
  }

  private registerEffects() {
    this.refinerEffects.register(
      RefinerActionTypes.GetRefinerGroups,
      this.getRefinerGroupsEffect
    )
    this.refinerEffects.register(
      RefinerActionTypes.GetRefinedCommitments,
      this.getRefinedCommitmentsEffect
    )
    this.refinerEffects.register(
      RefinerActionTypes.GetRefinedMapPoints,
      this.getRefinedMapPointsEffect
    )
  }

  public getLayoutPage() {
    this.action$.next(new GetRefinerGroups(null))
  }

  public getOverviewPage() {
    this.action$.next(new GetRefinedCommitments(null))
  }

  public getMapPage() {
    this.action$.next(new GetRefinedMapPoints(null))
  }

  ngOnDestroy(): void {
    this.actionSubscription$.unsubscribe()
    this.storeSubscription$.unsubscribe()
  }

  getRefinedCommitmentsEffect = (action: GetRefinedCommitments) => {
    // tslint:disable-next-line:no-console
    console.log(action)

    this.commitmentsSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        // tslint:disable-next-line:no-console
        tap(result => console.log('Get Refined Commitment Result', result)),
        map((result: any) => result.data.commitments)
      )
      .subscribe(result =>
        this.action$.next(new LoadRefinedCommitments(result))
      )
  }

  getRefinedMapPointsEffect = (action: GetRefinedMapPoints) => {
    // tslint:disable-next-line:no-console
    console.log(action)

    this.commitmentsMapPointSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        // tslint:disable-next-line:no-console
        tap(result => console.log('Get Refined MapPoint Result', result)),
        map((result: any) => result.data.mappoints)
      )
      .subscribe(result => this.action$.next(new LoadRefinedMapPoints(result)))
  }

  getRefinerGroupsEffect = (action: GetRefinerGroups) => {
    // tslint:disable-next-line:no-console
    console.log(action)

    this.getRefinerTagsGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        // tslint:disable-next-line:no-console
        tap(result => console.log('Get Refiner Groups Result', result)),
        map((result: any) => result.data.refiners)
      )
      .subscribe(result => this.action$.next(new LoadRefinerGroups(result)))
  }

  public handleRefinerGroupSelected(item) {
    this.action$.next(new SelectRefinerGroup(item))
  }

  public handleRefinerSelected(item) {
    this.action$.next(new SelectRefiner(item))
  }
}

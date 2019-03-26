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
  SelectRefiner
} from './commitment-refiner.actions'
import { RefinerState, initialState, DataTableColumn, RefinerReducer } from './commitment-refiner.reducer'

const DEBUG = !environment.production

@Injectable({
  providedIn: 'root'
})
export class CommitmentRefinerService implements OnDestroy {
  private store$: BehaviorSubject<RefinerState> = new BehaviorSubject(
    initialState
  )

  private action$: BehaviorSubject<RefinerAction> = new BehaviorSubject(null)

  private effects = {}

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
    private getRefinerTagsGQL: GetRefinerTagsGQL,
    private commitmentsSearchGQL: CommitmentsSearchGQL,
    private commitmentsMapPointSearchGQL: CommitmentsMapPointSearchGQL
  ) {
    this.effects[RefinerActionTypes.GetRefinerGroups] = [
      this.getRefinerGroupsEffect
    ]

    this.actionSubscription$ = this.action$.subscribe(
      (action: RefinerServiceActions) => {
        if (action) {
          const effectList: any[] = this.effects[action.type] || []

          // tslint:disable-next-line:no-console
          console.log(action.type, `Running ${effectList.length} effects`)
          effectList.forEach(effect => {
            // tslint:disable-next-line:no-console
            console.log('effect', action)
            effect(action)
          })

          this.store$.next(this.refinerReducer.reduce(this.store$.getValue(), action))
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

    // this.refinerGroups$.subscribe(rg => {
    //   this.getRefinedMapPoints(rg)
    //   this.getRefinedCommitments(rg)
    // })

    // this.selectedMapPoint$.subscribe(mp => this.getMapPointCommitments(mp))
    this.action$.next(new GetRefinerGroups(null))
  }

  ngOnDestroy(): void {
    this.actionSubscription$.unsubscribe()
    this.storeSubscription$.unsubscribe()
  }

  // private getRefinedCommitments(refinerGroups) {
  //   this.commitmentsSearchGQL
  //     .fetch({ input: {} }, { fetchPolicy: 'network-only' })
  //     .pipe(
  //       first(),
  //       map(result => result.data.commitments)
  //     )
  //     .subscribe(
  //       result => this.action$.next(new GetRefinerGroups(result)))
  // }

  // private getMapPointCommitments(mapPoints) {
  //   this.commitmentsSearchGQL
  //     .fetch({ input: {} }, { fetchPolicy: 'network-only' })
  //     .pipe(
  //       first(),
  //       map(result => result.data.commitments)
  //     )
  //     .subscribe(result => this.commitments$.next(result))
  // }

  // private getRefinedMapPoints(refinerGroups) {
  //   this.commitmentsMapPointSearchGQL
  //     .fetch({ input: {} }, { fetchPolicy: 'network-only' })
  //     .pipe(
  //       first(),
  //       map(result => result.data.mappoints)
  //     )
  //     .subscribe(result => this.mapPoints$.next(result))
  // }

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

import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subject, Subscription, Observable, of } from 'rxjs'
import {
  GetRefinerTagsGQL,
  CommitmentsMapPointSearchGQL,
  CommitmentsSearchGQL,
  CommitmentPartsFragment,
  MapPoint,
  CommitmentRefinementInput
} from '../../generated/graphql'
import { first, map, tap, filter, switchMap } from 'rxjs/operators'
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
  LoadRefinedMapPoints,
  SelectMapPoint
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
  public selectedRefinders$: Subject<any> = new Subject()
  public mapPointCommitments$: Subject<
    CommitmentPartsFragment[]
  > = new Subject()
  public commitments$: Subject<CommitmentPartsFragment[]> = new Subject()
  public refinerGroups$: BehaviorSubject<any[]> = new BehaviorSubject([])
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

    this.actionSubscription$ = this.action$
      .pipe(
        filter(action => action !== null),
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        switchMap((action: RefinerServiceActions) => {
          if (!this.refinerEffects.hasEffect(action)) {
            this.store$.next(
              this.refinerReducer.reduce(this.store$.getValue(), action)
            )

            return of(null)
          }

          return this.refinerEffects.run(action).pipe(
            // tslint:disable-next-line:no-console
            tap(result => console.log(result)),
            map((actions: RefinerServiceActions[]) => {
              if (DEBUG) {
                // tslint:disable-next-line:no-console
                console.log('RefinerServiceActions', actions)
              }
              actions.forEach(a =>
                this.store$.next(
                  this.refinerReducer.reduce(this.store$.getValue(), a)
                )
              )
            })
          )
        })
      )
      .subscribe()

    this.storeSubscription$ = this.store$.subscribe(store => {
      if (DEBUG) {
        // tslint:disable-next-line:no-console
        console.log(store)
      }

      this.columns$.next(store.columns)
      this.selectedMapPoint$.next(store.selectedMapPoint)
      this.mapPoints$.next(store.mapPoints)
      this.commitments$.next(store.commitments)
      this.selectedRefinders$.next(store.selectedRefiners)
      // this.mapPointCommitments$.next(store.mapPointCommitments)
      this.refinerGroups$.next(store.refinerGroups)
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
    const store = this.store$.getValue()

    const payload: CommitmentRefinementInput = {
      text: null,
      tags: [...store.selectedRefiners]
    }

    this.action$.next(new GetRefinedCommitments(payload))
  }

  public getMapPage() {
    this.action$.next(new GetRefinedMapPoints(null))
  }

  public getPlannerPage() {}

  ngOnDestroy(): void {
    this.actionSubscription$.unsubscribe()
    this.storeSubscription$.unsubscribe()
  }

  getRefinedCommitmentsEffect = (
    action: GetRefinedCommitments
  ): Observable<RefinerAction> => {
    // tslint:disable-next-line:no-console
    console.log(action)

    return this.commitmentsSearchGQL
      .fetch({ input: action.payload }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        // tslint:disable-next-line:no-console
        tap(result => console.log('Get Refined Commitment Result', result)),
        map((result: any) => result.data.commitments),
        map(result => new LoadRefinedCommitments(result))
      )
  }

  getRefinedMapPointsEffect = (
    action: GetRefinedMapPoints
  ): Observable<RefinerAction> => {
    // tslint:disable-next-line:no-console
    console.log(action)

    return this.commitmentsMapPointSearchGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        // tslint:disable-next-line:no-console
        tap(result => console.log('Get Refined MapPoint Result', result)),
        map((result: any) => result.data.mappoints),
        map(result => new LoadRefinedMapPoints(result))
      )
  }

  getRefinerGroupsEffect = (
    action: GetRefinerGroups
  ): Observable<RefinerAction> => {
    // tslint:disable-next-line:no-console
    console.log(action)

    return this.getRefinerTagsGQL
      .fetch({ input: {} }, { fetchPolicy: 'network-only' })
      .pipe(
        first(),
        // tslint:disable-next-line:no-console
        tap(result => console.log('Get Refiner Groups Result', result)),
        map((result: any) => result.data.refiners),
        map(result => new LoadRefinerGroups(result))
      )
  }

  public selectMapPoint(item: any): any {
    this.action$.next(new SelectMapPoint(item))
  }

  public handleRefinerGroupSelected(item) {
    this.action$.next(new SelectRefinerGroup(item))
  }

  public handleRefinerSelected(item) {
    this.action$.next(new SelectRefiner(item))
    this.getOverviewPage()
  }
}

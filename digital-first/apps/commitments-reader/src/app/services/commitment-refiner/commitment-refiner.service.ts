import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subject, Subscription, Observable, of } from 'rxjs'
import {
  GetRefinerTagsGQL,
  CommitmentsMapPointSearchGQL,
  CommitmentsSearchGQL,
  CommitmentsMapPointSearchQuery,
  MapPointGraph,
  CommitmentRefinerGraph,
  CommitmentMapPointGraph,
  WhereExpressionGraph,
  ComparisonGraph,
  CommitmentGraph
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
  GetCommitmentMapPointSearch,
  LoadRefinedMapPoints,
  SelectMapPoint,
  LoadMapPointsCommitments
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
  public mapPoints$: Subject<MapPointGraph[]> = new Subject()
  public selectedMapPoint$: Subject<any> = new Subject()
  public selectedRefinders$: Subject<any> = new Subject()
  public commitmentsMapPointAll$: Subject<
    CommitmentMapPointGraph[]
  > = new Subject()
  public commitmentsMapPointSearch$: Subject<
    CommitmentMapPointGraph[]
  > = new Subject()

  public commitments$: Subject<CommitmentGraph[]> = new Subject()
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
      this.commitmentsMapPointSearch$.next(store.commitmentMapPoints)
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
      RefinerActionTypes.GetCommitmentMapPointSearch,
      this.getCommitmentMapPointSearchEffect
    )
  }

  public getLayoutPage() {
    this.action$.next(new GetRefinerGroups(null))
  }

  getItems(storeRefiners: any, groupId: any): number[] {
    if (storeRefiners.find(find => find.groupId === groupId)) {
      const ids: number[] = []
      storeRefiners
        .filter(fltr => fltr.groupId === groupId)
        .map(i => {
          ids.push(i.itemId)
        })

      return ids
    }

    return null
  }

  public getRefinedCommitments() {
    const store = this.store$.getValue()

    const payload: CommitmentRefinerGraph = {
      commitmentTypes: this.getItems(store.selectedRefiners, 1),
      criticalDates: this.getItems(store.selectedRefiners, 2),
      portfolioLookups: this.getItems(store.selectedRefiners, 3)
    }

    this.action$.next(new GetRefinedCommitments(payload))
  }

  public getCommitmentMapPointSearch() {
    const store = this.store$.getValue()
    const payload: any = {
      id: 1
    }

    this.action$.next(new GetCommitmentMapPointSearch(payload))
  }

  ngOnDestroy(): void {
    this.actionSubscription$.unsubscribe()
    this.storeSubscription$.unsubscribe()
  }

  getCommitmentMapPointSearchEffect = (
    action: GetCommitmentMapPointSearch
  ): Observable<RefinerAction> => {
    // tslint:disable-next-line:no-console
    const whereVal: WhereExpressionGraph = {
      path: 'CommitmentId',
      comparison: ComparisonGraph.Equal,
      value: ['2']
    }

    return this.commitmentsMapPointSearchGQL
      .fetch({ commitmentWhere: whereVal })
      .pipe(
        first(),
        tap(result =>
          console.log('👽', 'getCommitmentMapPointSearchEffect Result', result)
        ),
        map((result: any) => result.data.mappoints),
        map(result => new LoadRefinedMapPoints(result))
      )
  }

  // This is the committments search
  getRefinedCommitmentsEffect = (
    action: GetRefinedCommitments
  ): Observable<RefinerAction> => {
    console.log('🐈', action.payload)
    return this.commitmentsSearchGQL.fetch({ refiner: action.payload }).pipe(
      first(),
      // tslint:disable-next-line:no-console
      tap(result =>
        console.log('👽', 'getRefinedCommitmentsEffect Result', result)
      ),
      map((result: any) => result.data.commitments),
      map(result => new LoadRefinedCommitments(result))
    )
  }

  buildFilterMenu(...args: any): CRMenu[] {
    const refinerGroups = [
      {
        id: 1,
        group: 'commitmentTypes',
        title: 'Commitment Types'
      },
      {
        id: 2,
        group: 'criticalDates',
        title: 'Critical Date'
      },
      {
        id: 3,
        group: 'portfolioLookups',
        title: 'Portfolios'
      }
    ]

    const result: CRMenu[] = refinerGroups.reduce(
      (acc: any, item: any, index: any, arr: any) => {
        acc.push({
          id: item.id,
          title: item.title,
          expanded: false,
          selected: false,
          groupId: item.id,
          children: args[item.id - 1].map(p => ({
            id: p.id,
            title: p.title,
            groupId: item.id,
            expanded: false,
            selected: false
          }))
        })

        return acc
      },
      []
    )

    this.persistState(result)

    return result
  }

  persistState(arr: any): any {
    //TODO: Replace this abomination by storing whole nav in store

    const store = this.store$.getValue()
    const selectedRefiners: CommitmentRefinerGraph = {
      commitmentTypes: this.getItems(store.selectedRefiners, 1),
      criticalDates: this.getItems(store.selectedRefiners, 2),
      portfolioLookups: this.getItems(store.selectedRefiners, 3)
    }
    const expandedRefinerGroups = store.expandedRefinerGroups

    if (expandedRefinerGroups && expandedRefinerGroups.length >= 1) {
      arr.forEach(element => {
        if (expandedRefinerGroups.indexOf(element.groupId) !== -1) {
          element.expanded = true
          if (element.groupId === 1 && selectedRefiners.commitmentTypes) {
            this.matchFilter(selectedRefiners.commitmentTypes, element.children)
          }

          if (element.groupId === 2 && selectedRefiners.criticalDates) {
            this.matchFilter(selectedRefiners.criticalDates, element.children)
          }

          if (element.groupId === 3 && selectedRefiners.portfolioLookups) {
            this.matchFilter(
              selectedRefiners.portfolioLookups,
              element.children
            )
          }
        }
      })
    }

    return arr
  }

  matchFilter(stateFilter: number[], children: CRMenu[]) {
    if (stateFilter) {
      stateFilter.forEach(selectedItem => {
        children.forEach(itm => {
          if (itm.id === selectedItem) {
            itm.selected = true
          }
        })
      })
    }
  }
  getRefinerGroupsEffect = (
    action: GetRefinerGroups
  ): Observable<RefinerAction> => {
    // tslint:disable-next-line:no-console
    console.log(action)

    return this.getRefinerTagsGQL.fetch({ input: {} }).pipe(
      first(),
      // tslint:disable-next-line:no-console
      tap(result => console.log('**** Get Refiner Groups Result', result)),
      map((result: any) =>
        this.buildFilterMenu(
          result.data.commitmentTypes,
          result.data.criticalDates,
          result.data.portfolioLookups
        )
      ),
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
    this.getRefinedCommitments()
  }
}
interface CRMenu {
  id: number
  title: string
  expanded: boolean
  selected: boolean
  groupId: number
  children?: CRMenu[]
}

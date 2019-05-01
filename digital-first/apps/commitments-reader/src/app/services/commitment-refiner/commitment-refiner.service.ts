import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subject, Subscription, Observable, of } from 'rxjs'
import {
  GetRefinerTagsGQL,
  CommitmentsSearchGQL,
  CommitmentRefinerGraph,
  CommitmentGraph,
  MapPointGraph,
  CommitmentMapPointGQL
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
  ChangeTextRefiner,
  GetMapPoints
} from './commitment-refiner.actions'
import {
  RefinerState,
  initialState,
  DataTableColumn,
  RefinerReducer
} from './commitment-refiner.reducer'
import { RefinerEffects } from './commitment-refiner.effects'
import { AppConfigService } from '../app-config.service'
import { getNgModuleDef } from '@angular/core/src/render3/definition'

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
  public selectedMapPoint$: Subject<any> = new Subject()
  public selectedRefinders$: Subject<any> = new Subject()
  public commitments$: Subject<CommitmentGraph[]> = new Subject()
  public mapPoints$: Subject<MapPointGraph[]> = new Subject()
  public refinerGroups$: BehaviorSubject<any[]> = new BehaviorSubject([])
  private actionSubscription$: Subscription
  private storeSubscription$: Subscription

  constructor(
    private refinerReducer: RefinerReducer,
    private refinerEffects: RefinerEffects,
    private getRefinerTagsGQL: GetRefinerTagsGQL,
    private commitmentsSearchGQL: CommitmentsSearchGQL,
    private commitmentMapPointGQL: CommitmentMapPointGQL,
    private appConfigService: AppConfigService
  ) {
    appConfigService.init().subscribe(_ => {
      this.registerEffects()

      this.actionSubscription$ = this.action$
        .pipe(
          filter(action => action !== null),
          switchMap((action: RefinerServiceActions) => {
            if (!this.refinerEffects.hasEffect(action)) {
              this.store$.next(
                this.refinerReducer.reduce(this.store$.getValue(), action)
              )

              return of(null)
            }

            return this.refinerEffects.run(action).pipe(
              map((actions: RefinerServiceActions[]) => {
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
        this.columns$.next(store.columns)
        this.commitments$.next(store.commitments)
        this.selectedRefinders$.next(store.selectedRefiners)
        this.refinerGroups$.next(store.refinerGroups)
        this.mapPoints$.next(store.mapPoints)
      })
      this.action$.next(new GetRefinerGroups(null))
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
      RefinerActionTypes.GetMapPoints,
      this.getMapPointsEffect
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

  public getMapPoints() {
    const store = this.store$.getValue()

    const payload: CommitmentRefinerGraph = {
      commitmentTypes: this.getItems(store.selectedRefiners, 1),
      criticalDates: this.getItems(store.selectedRefiners, 2),
      portfolioLookups: this.getItems(store.selectedRefiners, 3)
    }

    this.action$.next(new GetMapPoints(payload))
  }

  // This is the committments filter
  getRefinedCommitmentsEffect = (
    action: GetRefinedCommitments
  ): Observable<RefinerAction> =>
    this.commitmentsSearchGQL
      .fetch({
        refiner: action.payload,
        bookType: this.appConfigService.getBookType()
      })
      .pipe(
        first(),
        map((result: any) => {
          // Temp solution till we have graphql support for text refiner
          const store = this.store$.getValue()
          if (store.textRefiner && store.textRefiner.length > 0) {
            const refinedByTextRefiner = new RegExp(store.textRefiner, 'i')
            return result.data.commitments.filter(
              c =>
                refinedByTextRefiner.test(c.title) ||
                refinedByTextRefiner.test(c.portfolioLookup.title)
            )
          } else {
            return result.data.commitments
          }
        }),
        map(result => new LoadRefinedCommitments(result))
      )

  getMapPointsEffect = (action: GetMapPoints): Observable<RefinerAction> =>
    this.commitmentMapPointGQL
      .fetch({
        refiner: action.payload,
        bookType: this.appConfigService.getBookType()
      })
      .pipe(
        first(),
        map((result: any) =>
          result.data.commitments
            .map(cmp => cmp.commitmentMapPoints)
            .filter(fltr => fltr.length > 0)
            .map(x => x.map(y => y.mapPoint))
        ),
        map(anything => new GetMapPoints(anything))
      )

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
    // TODO: Replace this abomination by storing whole nav tree in store

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
  getRefinerGroupsEffect = (): Observable<RefinerAction> =>
    this.getRefinerTagsGQL.fetch({ input: {} }).pipe(
      first(),
      map((result: any) =>
        this.buildFilterMenu(
          result.data.commitmentTypes,
          result.data.criticalDates,
          result.data.portfolioLookups
        )
      ),
      map(result => new LoadRefinerGroups(result))
    )

  public handleRefinerGroupSelected(item) {
    this.action$.next(new SelectRefinerGroup(item))
  }

  public handleRefinerSelected(item) {
    this.action$.next(new SelectRefiner(item))
    this.getRefinedCommitments()
    this.getMapPoints()
  }

  public handleTextRefinerChanged(item) {
    this.action$.next(new ChangeTextRefiner(item))
    this.getRefinedCommitments()
  }

  ngOnDestroy(): void {
    this.actionSubscription$.unsubscribe()
    this.storeSubscription$.unsubscribe()
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

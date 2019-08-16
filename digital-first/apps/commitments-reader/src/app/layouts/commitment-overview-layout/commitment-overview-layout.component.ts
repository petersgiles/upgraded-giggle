import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'

import { AppRouterService } from '../../services/app-router.service'
import { RefinerGroup } from '@digital-first/df-refiner'
import { Observable, Subscription, Subject, of } from 'rxjs'

import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import { selectAppSpinnerState } from '@digital-first/df-app-core'
import * as fromRoot from '../../reducers'

import { Store, select } from '@ngrx/store'
import {
  SelectRefinerGroup,
  SelectRefiner,
  ChangeTextRefiner,
  GetRefinerGroups,
  SetRefinerFromQueryString,
  ClearRefiners,
  SelectElectorates,
  RemoveSelectedGroup,
  RemoveSelectedRefiner
} from '../../reducers/refiner/refiner.actions'

import { ActivatedRoute, Router } from '@angular/router'
import { CRMenu } from '../../reducers/refiner/refiner.models'
import { MdcDrawer } from '@angular-mdc/web'
import { debounceTime, switchMap, groupBy } from 'rxjs/operators'

@Component({
  selector: 'digital-first-commitment-overview-layout',
  templateUrl: 'commitment-overview-layout.component.html',
  styleUrls: ['commitment-overview-layout.component.scss']
})
export class CommitmentOverviewLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true })
  public electoratesDrawer: MdcDrawer
  activeTab = 1
  tabs = [
    {
      label: 'Overview',
      icon: 'table_chart',
      link: ['/', 'overview'],
      id: '/overview'
    },
    {
      label: 'Delivery Locations',
      icon: 'place',
      link: ['/', 'map'],
      id: '/map'
    },
    {
      label: 'Planner',
      icon: 'calendar_today',
      link: ['/', 'planner'],
      id: '/planner'
    },
    {
      label: 'Display Order',
      icon: 'compare_arrows',
      link: ['/', 'displayorder'],
      id: '/displayorder'
    }
  ]
  urlSubscription: any
  selectId$: any
  refinerGroupsSubscription: Subscription
  queryParamsSubscription: Subscription
  selectedRefinersSubscription: Subscription

  refinerGroups: RefinerGroup[]
  selectedRefinerGroups: RefinerGroup[]
  selectedRefiners: any[]

  queryParamsRefiner: { id: string; group: string }[]
  isBusy$: Observable<boolean>
  textRefiner$: Observable<string>
  refinerGroupWithDrawer: CRMenu
  electorates: any
  selectedElectorates: any[]
  routerSegmentsSubscription: Subscription
  electoratesChangesSubscription: Subscription
  electoratesChanges: Subject<any> = new Subject()
  selectedRefinersStateSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appRouter: AppRouterService,
    private store: Store<fromRoot.State>
  ) {}

  handleRefinerGroupSelected($event) {
    this.store.dispatch(new SelectRefinerGroup($event))
  }

  handleSlideOutGroupSelected($event) {
    this.refinerGroupWithDrawer = $event as CRMenu
    this.electorates = []
    this.selectedElectorates = []
    this.electoratesDrawer.open = this.refinerGroupWithDrawer.enableSlide
    if ($event.enableSlide) {
      $event.children.forEach(el => {
        this.electorates.push({
          id: el.id,
          title: el.title,
          state: el.additionalInfo
        })
        if (el.selected) {
          this.selectedElectorates.push(el.id)
        }
      })
      this.electorates = this.electorates.sort((a, b) => {
        if (a.state === b.state) {
          return a.title > b.title ? 1 : -1
        }
        return a.state > b.state ? 1 : -1
      })
    }
  }

  handleRefinerSelected($event) {
    this.store.dispatch(new SelectRefiner($event))
  }

  handleTextRefinerChanged($event) {
    this.store.dispatch(new ChangeTextRefiner($event))
  }

  handleClearRefiners($event) {
    this.store.dispatch(new ClearRefiners($event))
  }

  handelRemoveSelectedGroup($event) {
    this.store.dispatch(new RemoveSelectedGroup($event))
  }
  handelRemoveSelectedRefiner($event) {
    this.store.dispatch(new SelectRefiner($event))
  }
  ngOnInit() {
    const params = this.route.queryParams
    if (params && params['value'] && params['value'].refiner) {
      this.queryParamsRefiner = JSON.parse(params['value'].refiner)
      this.store.dispatch(
        new SetRefinerFromQueryString({ refiner: this.queryParamsRefiner })
      )
    }

    this.routerSegmentsSubscription = this.appRouter.segments.subscribe(url => {
      const tab = this.tabs.findIndex(p => p.id === url)
      this.activeTab = tab
      this.store.dispatch(new GetRefinerGroups(null))
      this.rewriteUrl(this.selectedRefiners)
    })

    this.selectedRefinersStateSubscription = this.store
      .pipe(select(fromRefiner.selectSelectedRefinersState))
      .subscribe(next => {
        this.selectedRefiners = next
        this.rewriteUrl(next)
      })

    this.refinerGroupsSubscription = this.store
      .pipe(select(fromRefiner.selectRefinerGroups))
      .subscribe(next => {
        this.refinerGroups = next
        this.selectedRefinerGroups = next
          .filter(n => n.children.some(c => c.selected))
          .map(group => {
            return {
              ...group,
              children: group.children.filter(c => c.selected)
            }
          })
      })

    this.electoratesChangesSubscription = this.electoratesChanges
      .pipe(
        debounceTime(600),
        switchMap(next => {
          return of(next)
        })
      )
      .subscribe(selectedElectorates => {
        if (Array.isArray(selectedElectorates)) {
          this.store.dispatch(new SelectElectorates(selectedElectorates))
        }
      })

    this.isBusy$ = this.store.pipe(select(selectAppSpinnerState))
    this.textRefiner$ = this.store.pipe(
      select(fromRefiner.selectTextRefinerState)
    )
  }

  private rewriteUrl(next: any[]) {
    if (next && next.length > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { refiner: JSON.stringify(next) },
        queryParamsHandling: 'merge'
      })
    } else {
      this.router.navigate([], {
        relativeTo: this.route
      })
    }
  }

  ngOnDestroy(): void {
    this.refinerGroupsSubscription.unsubscribe()
    this.routerSegmentsSubscription.unsubscribe()
    this.selectedRefinersStateSubscription.unsubscribe()
    this.queryParamsSubscription.unsubscribe()
    this.electoratesChangesSubscription.unsubscribe()
  }
}

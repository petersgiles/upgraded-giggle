import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { AppRouterService } from '../../services/app-router.service'
import { RefinerGroup } from '@digital-first/df-refiner'
import { Observable, Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'

import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import * as fromApp from '../../reducers/app/app.reducer'
import * as fromRoot from '../../reducers'

import { Store, select } from '@ngrx/store'
import {
  SelectRefinerGroup,
  SelectRefiner,
  ChangeTextRefiner,
  GetRefinerGroups,
  SetRefinerFromQueryString,
  ClearRefiners
} from '../../reducers/refiner/refiner.actions'

import { GetRefinedCommitments } from '../../reducers/overview/overview.actions'
import { GetRefinedMapPoints } from '../../reducers/map/map.actions'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'digital-first-commitment-overview-layout',
  templateUrl: './commitment-overview-layout.component.html',
  styleUrls: ['./commitment-overview-layout.component.scss']
})
export class CommitmentOverviewLayoutComponent
  implements OnInit, AfterViewInit, OnDestroy {
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
  refinerGroupsSubscription$: Subscription
  queryParamsSubscription$: Subscription
  refinerGroups: RefinerGroup[]
  queryParamsRefiner: { id: string; group: string }[]
  isBusy$: Observable<boolean>
  textRefiner$: Observable<string>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appRouter: AppRouterService,
    private store: Store<fromRoot.State>
  ) {}

  handleRefinerGroupSelected($event) {
    this.store.dispatch(new SelectRefinerGroup($event))
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

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.queryParamsSubscription$ = this.route.queryParams.subscribe(params => {
      if (params && params.refiner) {
        this.queryParamsRefiner = JSON.parse(params.refiner)
        this.store.dispatch(
          new SetRefinerFromQueryString({ refiner: this.queryParamsRefiner })
        )
      }
    })

    this.isBusy$ = this.store.pipe(select(fromApp.selectAppSpinnerState))

    this.textRefiner$ = this.store.pipe(select(fromRefiner.selectTextRefinerState))

    this.store
      .pipe(select(fromRefiner.selectSelectedRefinersState))
      .subscribe(next => {
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
      })

    this.refinerGroupsSubscription$ = this.store
      .pipe(select(fromRefiner.selectRefinerGroups))
      .subscribe(next => {
        this.refinerGroups = next
        this.store.dispatch(new GetRefinedCommitments(null))
        this.store.dispatch(new GetRefinedMapPoints(null))
      })

    this.appRouter.segments.subscribe(url => {
      const tab = this.tabs.findIndex(p => p.id === url)
      this.activeTab = tab
      this.store.dispatch(new GetRefinerGroups(null))
    })
  }

  ngOnDestroy(): void {
    this.refinerGroupsSubscription$.unsubscribe()

    if (this.queryParamsSubscription$) {
      this.queryParamsSubscription$.unsubscribe()
    }
  }
}

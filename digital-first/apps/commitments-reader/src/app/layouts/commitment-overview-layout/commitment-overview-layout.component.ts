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
  SelectElectorates
} from '../../reducers/refiner/refiner.actions'

import { ActivatedRoute, Router } from '@angular/router'
import { CRMenu } from '../../reducers/refiner/refiner.models'
import { MdcDrawer } from '@angular-mdc/web'
import { debounceTime, switchMap } from 'rxjs/operators'

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
  selectedRefinersStateSubscription: Subscription

  refinerGroups: RefinerGroup[]
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
      this.electorates.sort((a, b) => {
        return a.state > b.state ? -1 : 1
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

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      if (params && params.refiner) {
        this.queryParamsRefiner = JSON.parse(params.refiner)
        this.store.dispatch(
          new SetRefinerFromQueryString({ refiner: this.queryParamsRefiner })
        )
      }
    })

    this.routerSegmentsSubscription = this.appRouter.segments.subscribe(url => {
      const tab = this.tabs.findIndex(p => p.id === url)
      this.activeTab = tab
      this.store.dispatch(new GetRefinerGroups(null))
    })

    this.selectedRefinersStateSubscription = this.store
      .pipe(select(fromRefiner.selectSelectedRefinersState))
      .subscribe(next => {
        this.selectedRefiners = next
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

    this.refinerGroupsSubscription = this.store
      .pipe(select(fromRefiner.selectRefinerGroups))
      .subscribe(next => {
        this.refinerGroups = next
      })

    this.electoratesChangesSubscription = this.electoratesChanges
      .pipe(
        debounceTime(600),
        switchMap(next => {
          return of(next)
        })
      )
      .subscribe(selectedElectorates => {
        // to make sure it is not an event type emited by ng-select component
        // it is supposed to be a list of selected items however some time this could
        // be a change event
        if (Array.isArray(selectedElectorates)) {
          this.store.dispatch(new SelectElectorates(selectedElectorates))
        }
      })

    this.isBusy$ = this.store.pipe(select(selectAppSpinnerState))
    this.textRefiner$ = this.store.pipe(
      select(fromRefiner.selectTextRefinerState)
    )
  }

  ngOnDestroy(): void {
    this.refinerGroupsSubscription.unsubscribe()
    this.routerSegmentsSubscription.unsubscribe()
    this.selectedRefinersStateSubscription.unsubscribe()
    this.queryParamsSubscription.unsubscribe()
    this.electoratesChangesSubscription.unsubscribe()
  }
}

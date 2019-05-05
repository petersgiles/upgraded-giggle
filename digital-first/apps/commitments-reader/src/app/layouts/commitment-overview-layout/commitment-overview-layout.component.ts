import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { AppRouterService } from '../../services/app-router.service'
import { CommitmentRefinerService } from '../../services/commitment-refiner/commitment-refiner.service'
import { RefinerGroup } from '@digital-first/df-refiner'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import { Store, select } from '@ngrx/store'
import { SelectRefinerGroup, SelectRefiner, ChangeTextRefiner, GetRefinerGroups, GetRefinedCommitments } from '../../reducers/refiner/refiner.actions';
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
    }
  ]
  urlSubscription: any
  selectId$: any
  refinerGroups$: Observable<RefinerGroup[]>

  constructor(
    private appRouter: AppRouterService,
    private store: Store<fromRefiner.State>
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
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {}

  ngOnInit() {
    this.refinerGroups$ = this.store.pipe(
      select(fromRefiner.selectRefinerGroups),
      // tslint:disable-next-line: no-console
      tap(result => console.log(`👹 `, result))
    )

    this.appRouter.segments.subscribe(url => {
      const x = this.tabs.findIndex(p => p.id === url)
      this.activeTab = x
      this.store.dispatch(new GetRefinerGroups(null))
      this.store.dispatch(new GetRefinedCommitments(null))
    })
  }
}

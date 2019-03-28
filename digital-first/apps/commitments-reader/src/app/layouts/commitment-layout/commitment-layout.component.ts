import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { AppRouterService } from '../../services/app-router.service'
import { CommitmentRefinerService } from '../../services/commitment-refiner/commitment-refiner.service'
import { RefinerGroup } from '@digital-first/df-refiner'
import { Observable } from 'rxjs'

@Component({
  selector: 'digital-first-commitment-layout',
  templateUrl: './commitment-layout.component.html',
  styleUrls: ['./commitment-layout.component.scss']
})
export class CommitmentLayoutComponent
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
    private dataService: CommitmentRefinerService
  ) {}

  handleRefinerGroupSelected($event) {
    this.dataService.handleRefinerGroupSelected($event)
  }

  handleRefinerSelected($event) {
    this.dataService.handleRefinerSelected($event)
  }

  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  ngOnInit() {
    this.refinerGroups$ = this.dataService.refinerGroups$

    this.appRouter.segments.subscribe(url => {
      const x = this.tabs.findIndex(p => p.id === url)
      this.activeTab = x
      this.dataService.getLayoutPage()
    })
  }
}

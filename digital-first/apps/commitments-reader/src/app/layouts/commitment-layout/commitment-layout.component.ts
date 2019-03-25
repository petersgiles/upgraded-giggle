import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'

import { AppRouterService } from '../../services/app-router.service'

import { BehaviorSubject } from 'rxjs'
import { GetRefinerTagsGQL } from '../../generated/graphql';
import { tap, map, first } from 'rxjs/operators';

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

  refinerGroups$: BehaviorSubject<any[]> = new BehaviorSubject(null)

  constructor(private appRouter: AppRouterService, private getRefinerTagsGQL: GetRefinerTagsGQL) {}

  handleRefinerGroupSelected($event) {
    const data = this.refinerGroups$.getValue()
    const group = data.findIndex(p => p.id === $event.id)
    data[group].expanded = !data[group].expanded
    this.refinerGroups$.next(data)
  }

  handleRefinerSelected($event) {
    console.log('refiner', $event)
    const data = this.refinerGroups$.getValue()
    const group = data.findIndex(p => p.id === $event.groupId)
    data[group].expanded = true
    const refiner = data[group].children.findIndex(p => p.id === $event.id)
    
    data[group].children[refiner].selected = !data[group].children[refiner]
      .selected
    this.refinerGroups$.next(data)
  }

  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  ngOnInit() {

    this.getRefinerTagsGQL
      .fetch(
      { input: {} },
      { fetchPolicy: 'network-only' }
      )
    .pipe(
      first(),
      tap(result => console.log(result)),
      map(result => result.data.refiners)
      )
      .subscribe(result => this.refinerGroups$.next(result)
      )

    this.appRouter.segments.subscribe(url => {
      let x = this.tabs.findIndex(p => p.id === url)
      this.activeTab = x
    })
  }
}

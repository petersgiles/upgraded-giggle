import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core'
import { Location } from '@angular/common'
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  ParamMap,
  UrlSegment
} from '@angular/router'
import { map, tap, filter } from 'rxjs/operators'
import { AppRouterService } from '../../services/app-router.service'

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

  constructor(private appRouter: AppRouterService) {}

  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  ngOnInit() {
    this.appRouter.segments.subscribe(url => {
      let x = this.tabs.findIndex(p => p.id === url)
      this.activeTab = x
    })
  }
}

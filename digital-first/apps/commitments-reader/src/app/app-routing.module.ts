import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import {
  SimpleLayoutComponent,
  TitleLayoutComponent
} from '@digital-first/df-layouts'

import {
  ErrorPageNotFoundComponent,
  ErrorServerComponent
} from '@digital-first/df-pages'
import { HomeComponent } from './pages/home/home.component'
import { PlannerPageComponent } from './pages/planner-page/planner-page.component'
import { CommitmentLayoutComponent } from './layouts/commitment-layout/commitment-layout.component'
import { OverviewPageComponent } from './pages/overview-page/overview-page.component'
import { MapOverviewPageComponent } from './pages/map-overview-page/map-overview-page.component'

const routes: Routes = [
  {
    path: '',
    component: TitleLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: CommitmentLayoutComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'overview',
            component: OverviewPageComponent
          },
          {
            path: 'map',
            component: MapOverviewPageComponent
          },
          {
            path: 'planner',
            component: PlannerPageComponent
          }
        ]
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '404',
        component: ErrorPageNotFoundComponent
      },
      {
        path: '500',
        component: ErrorServerComponent
      }
    ]
  },
  { path: '**', redirectTo: 'pages/404' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

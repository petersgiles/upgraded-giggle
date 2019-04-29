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
import { CommitmentOverviewLayoutComponent } from './layouts/commitment-overview-layout/commitment-overview-layout.component'
import { OverviewPageComponent } from './pages/overview-page/overview-page.component'
import { MapOverviewPageComponent } from './pages/map-overview-page/map-overview-page.component'
import { CommitmentDetailComponent } from './pages/commitment-detail/commitment-detail.component'
import { CommitmentLayoutComponent } from './layouts/commitment-layout/commitment-layout.component'
const routes: Routes = [
  {
    path: '',
    component: TitleLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        component: CommitmentOverviewLayoutComponent,
        children: [
          {
            path: 'overview',
            component: OverviewPageComponent
          },
          {
            path: 'commitmentdetail',
            component: CommitmentDetailComponent
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
      },
      {
        path: 'components',
        component: CommitmentLayoutComponent,
        children: [
          {
            path: ':id',
            component: HomeComponent
          },
          {
            path: ':id/home',
            component: HomeComponent
          },
          {
            path: ':id/packages',
            component: HomeComponent
          },
          {
            path: ':id/location',
            component: HomeComponent
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

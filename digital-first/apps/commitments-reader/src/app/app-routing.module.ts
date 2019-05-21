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
import { CommitmentPackageComponent } from './pages/commitment-packages/commitment-package.component'
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DisplayOrderPageComponent } from './pages/display-order-page/display-order-page.component';
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
        path: 'userprofile',
        component: UserProfileComponent
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
            path: 'map',
            component: MapOverviewPageComponent
          },
          {
            path: 'planner',
            component: PlannerPageComponent
          },
          {
            path: 'displayorder',
            component: DisplayOrderPageComponent
          }
        ]
      },
      {
        path: 'commitment',
        component: CommitmentLayoutComponent,
        children: [
          {
            path: ':id',
            redirectTo: ':id/detail',
            pathMatch: 'full'
          },
          {
            path: ':id/detail',
            component: CommitmentDetailComponent
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

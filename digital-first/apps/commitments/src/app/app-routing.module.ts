import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import {
  FullLayoutComponent,
  SimpleLayoutComponent,
  TitleLayoutComponent
} from '@digital-first/df-layouts'
import {
  ErrorPageNotFoundComponent,
  ErrorServerComponent
} from '@digital-first/df-pages'
import {
  CommitmentOverviewComponent,
  CommitmentEditComponent,
  CommitmentCreateComponent,
  ContactCreateComponent
} from './pages'
import { CommitmentCostingComponent } from './pages/commitment-costing/commitment-costing.component'
import { CommitmentOverviewMapComponent } from './pages/commitment-overview-map/commitment-overview-map.component'
import { CommitmentPrintComponent } from './pages/commitment-print/commitment-print.component'
import { OverviewLayoutComponent } from './layouts/overview-layout/overview-layout.component'

const routes: Routes = [
  {
    path: '',
    component: TitleLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'contact',
        component: ContactCreateComponent,
        data: {
          title: 'Contact'
        }
      },
      {
        path: 'overview',
        data: {
          title: 'Overview'
        },
        component: OverviewLayoutComponent,
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          {
            path: '',
            component: CommitmentOverviewComponent
          },
          {
            path: 'map',
            component: CommitmentOverviewMapComponent
          }
        ]
      },
      {
        path: 'commitment',
        data: {
          title: 'Commitment'
        },
        children: [
          {
            path: 'create',
            component: CommitmentCreateComponent
          },
          {
            path: ':id',
            component: CommitmentEditComponent
          },
          {
            path: ':id/print',
            component: CommitmentPrintComponent
          },
          {
            path: ':id/costing',
            component: CommitmentCostingComponent
          },
          {
            path: ':id/costing/:costid',
            component: CommitmentCostingComponent
          }
        ]
      }
    ]
  },
  {
    path: 'home',
    component: TitleLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: HomeComponent
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

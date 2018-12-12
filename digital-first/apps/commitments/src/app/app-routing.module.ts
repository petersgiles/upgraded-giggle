import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from '@digital-first/df-layouts'
import { ErrorPageNotFoundComponent, ErrorServerComponent } from '@digital-first/df-pages'
import { CommitmentOverviewComponent, CommitmentEditComponent, CommitmentCreateComponent, ContactCreateComponent } from './pages'
import { AboutComponent } from './pages/about/about.component'
import { CommitmentCostingComponent } from './pages/commitment-costing/commitment-costing.component'
import { CommitmentOverviewMapComponent } from './pages/commitment-overview-map/commitment-overview-map.component'
import { CommitmentPrintComponent } from './pages/commitment-print/commitment-print.component'

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [{ path: '', redirectTo: 'commitment', pathMatch: 'full' },
    {
      path: 'contact',
      component: ContactCreateComponent,
      data: {
        title: 'Contact'
      }
    }, {
      path: 'map',
      component: CommitmentOverviewMapComponent,
    }, {
      path: 'commitment',
      data: {
        title: 'Commitment'
      },
      children: [
        {
          path: '',
          component: CommitmentOverviewComponent,
        }, {
          path: 'create',
          component: CommitmentCreateComponent,
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
    }, {
      path: 'about',
      component: AboutComponent,
      data: {
        title: 'About'
      }
    }

    ]
  }
  , {
    path: 'home',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
  , {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '404',
        component: ErrorPageNotFoundComponent
      }, {
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
export class AppRoutingModule { }

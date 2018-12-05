import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './containers/home/home.component'
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from '@digital-first/df-layouts'
import { ErrorPageNotFoundComponent, ErrorServerComponent } from '@digital-first/df-pages'
import { CommitmentOverviewComponent, CommitmentEditComponent, CommitmentCreateComponent, ContactCreateComponent } from './pages'
import { AboutComponent } from './pages/about/about.component'
import { CommitmentCostingComponent } from './pages/commitment-costing/commitment-costing.component'

const routes: Routes = [
  { path: '', redirectTo: 'commitments', pathMatch: 'full' },
  {
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
  }, {
    path: 'contact',
    component: FullLayoutComponent,
    data: {
      title: 'Contact'
    },
    children: [
      {
        path: '',
        component: ContactCreateComponent
      }
    ]
  }, {
    path: 'commitments',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: CommitmentOverviewComponent,
      }
    ]
  }, {
    path: 'commitment',
    component: FullLayoutComponent,
    data: {
      title: 'Commitment'
    },
    children: [
      {
        path: '',
        component: CommitmentCreateComponent,
      },
      {
        path: ':id',
        component: CommitmentEditComponent
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
    component: FullLayoutComponent,
    data: {
      title: 'About'
    },
    children: [
      {
        path: '',
        component: AboutComponent,
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

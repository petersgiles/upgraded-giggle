import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './containers/home/home.component'
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from '@digital-first/df-layouts'
import { ErrorPageNotFoundComponent, ErrorServerComponent } from '@digital-first/df-pages'
import { CommitmentOverviewComponent } from './containers/commitment-overview/commitment-overview.component'
import { CommitmentEditComponent } from './containers/commitment-edit/commitment-edit.component'

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
  },  {
    path: 'commitment',
    component: FullLayoutComponent,
    data: {
      title: 'Commitment'
    },
    children: [
      {
        path: '',
        component: CommitmentEditComponent,
      },
      {
        path: ':id',
        component: CommitmentEditComponent
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
export class AppRoutingModule {}

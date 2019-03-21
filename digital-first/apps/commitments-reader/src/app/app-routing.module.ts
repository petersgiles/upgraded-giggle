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
import { HomeComponent } from './pages/home/home.component';

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

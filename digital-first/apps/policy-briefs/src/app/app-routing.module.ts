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

import { BriefComponent } from './pages/brief/brief.component'
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'brief', pathMatch: 'full' },
  {
    path: 'brief',
    component: TitleLayoutComponent,
    data: {
      title: 'Brief'
    },
    children: [
      {
        path: '',
        component: BriefComponent
      },
      {
        path: ':id',
        component: BriefComponent
      }
    ]
  },
  {
    path: 'userprofile',
    component: TitleLayoutComponent,
    data: {
      title: 'Profile'
    },
    children: [
      {
        path: '',
        component: UserProfileComponent
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

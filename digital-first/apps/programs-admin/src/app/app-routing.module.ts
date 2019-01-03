import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {HomeComponent} from './containers/home/home.component'
import {FullLayoutComponent} from '@digital-first/df-layouts'
import {StatisticuploadComponent} from './containers/statisticupload/statisticupload.component'
import {ProjectuploadComponent} from './containers/projectupload/projectupload.component'
import {ProgramsComponent} from './containers/programs/programs.component'
import {ProgramComponent} from './containers/program/program.component'

import {ProgramAddComponent} from './containers/program/program-add/program-add.component'
import {ProgramEditComponent} from './containers/program/program-edit/program-edit.component'
import { AuthGuard } from '@digital-first/df-auth'

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Home',
          icon: 'home',
          nav: true
        }
      },
      {
        path: 'programs',
        component: ProgramsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Programs',
          icon: 'live_tv',
          nav: true
        }
      },
      {
        path: 'programs/add',
        component: ProgramAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'programs/edit/:id',
        component: ProgramEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'programs/:id',
        component: ProgramComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Program',
          icon: 'live_tv',
          nav: false
        }
      },
      {
        path: 'statistics/upload',
        component: StatisticuploadComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Upload Statistic',
          icon: 'format_list_numbered',
          nav: true
        }
      },
      {
        path: 'project/upload',
        component: ProjectuploadComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Upload Project',
          icon: 'ballot',
          nav: true
        }
      }
    ]
  },
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

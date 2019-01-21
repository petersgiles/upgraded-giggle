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
import {ReportAddComponent} from './containers/program-reports/report-add/report-add.component'
import {AuthGuard} from '@digital-first/df-auth'
import {ProgramReportComponent} from './containers/program-report/program-report.component'
import {UsersComponent} from './containers/users/users.component'
import {UserComponent} from './containers/user/user.component'
import {GroupsComponent} from './containers/groups/groups.component'
import {GroupComponent} from './containers/group/group.component'
import {GroupAddComponent} from './containers/group/group-add/group-add.component'
import {GroupEditComponent} from './containers/group/group-edit/group-edit.component'
import {StatisticsComponent} from './containers/statistics/statistics.component'
import {StatisticComponent} from './containers/statistic/statistic.component'
import {StatisticAddComponent} from './containers/statistic/statistic-add/statistic-add.component'
import {StatisticEditComponent} from './containers/statistic/statistic-edit/statistic-edit.component'
import {StatisticReportComponent} from './containers/statistic-report/statistic-report.component'
import {StatisticReportAddComponent} from './containers/statistic-reports/statistic-report-add/statistic-report-add.component'
import {StatisticReportEditComponent} from './containers/statistic-reports/statistic-report-edit/statistic-report-edit.component'
import {ReportEditComponent} from './containers/program-reports/report-edit/report-edit.component'

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
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Groups',
          icon: 'group',
          nav: true
        }
      },
      {
        path: 'groups/add',
        component: GroupAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'groups/edit/:id',
        component: GroupEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'groups/:id',
        component: GroupComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
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
        path: 'programs/:id/reports/add',
        component: ReportAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'programs/:id/reports/edit/:id',
        component: ReportEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'programs/:id/reports/:id',
        component: ProgramReportComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Statistics',
          icon: 'functions',
          nav: true
        }
      },
      {
        path: 'statistics/add',
        component: StatisticAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'statistics/edit/:id',
        component: StatisticEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'statistics/:id',
        component: StatisticComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Statistic',
          nav: false
        }
      },
      {
        path: 'statistics/:id/reports/add',
        component: StatisticReportAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'statistics/:id/reports/edit/:id',
        component: StatisticReportEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'statistics/:id/reports/:id',
        component: StatisticReportComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Users',
          icon: 'people_outline',
          nav: true
        }
      },
      {
        path: 'users/:id',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'upload/project',
        component: ProjectuploadComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Upload Project',
          icon: 'ballot',
          nav: true
        }
      },
      {
        path: 'upload/statistic',
        component: StatisticuploadComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Upload Statistic',
          icon: 'format_list_numbered',
          nav: true
        }
      }
    ]
  },
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

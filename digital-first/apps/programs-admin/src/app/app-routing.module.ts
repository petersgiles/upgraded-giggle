import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './containers/home/home.component'
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from '@digital-first/df-layouts'
import { StatisticuploadComponent } from './containers/statisticupload/statisticupload.component'
import { ReportuploadComponent } from './containers/reportupload/reportupload.component'
import { ProjectuploadComponent } from './containers/projectupload/projectupload.component'
import { ProgramsComponent } from './containers/programs/programs.component'
import { ProgramComponent } from './containers/program/program.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { ProjectComponent } from './containers/project/project.component'
import { ProjectAddComponent } from './containers/project/project-add/project-add.component'
import { ProjectEditComponent } from './containers/project/project-edit/project-edit.component'
import { ProgramAddComponent } from './containers/program/program-add/program-add.component'
import { ProgramEditComponent } from './containers/program/program-edit/program-edit.component'
import { ReportAddComponent } from './containers/program-report/report-add/report-add.component'
import { AuthGuard } from '@digital-first/df-auth'
import { ProgramReportComponent } from './containers/program-report/program-report.component'
import { UsersComponent } from './containers/users/users.component'
import { UserComponent } from './containers/user/user.component'
import { GroupsComponent } from './containers/groups/groups.component'
import { GroupComponent } from './containers/group/group.component'
import { GroupAddComponent } from './containers/group/group-add/group-add.component'
import { GroupEditComponent } from './containers/group/group-edit/group-edit.component'
import { StatisticsComponent } from './containers/statistics/statistics.component'
import { StatisticComponent } from './containers/statistic/statistic.component'
import { StatisticAddComponent } from './containers/statistic/statistic-add/statistic-add.component'
import { StatisticEditComponent } from './containers/statistic/statistic-edit/statistic-edit.component'
import { StatisticReportComponent } from './containers/statistic-report/statistic-report.component'
import { StatisticReportAddComponent } from './containers/statistic-report/statistic-report-add/statistic-report-add.component'
import { StatisticReportEditComponent } from './containers/statistic-report/statistic-report-edit/statistic-report-edit.component'
import { ReportEditComponent } from './containers/program-report/report-edit/report-edit.component'
import { AgenciesComponent } from './containers/agencies/agencies.component'
import {
  ErrorPageNotFoundComponent,
  ErrorServerComponent
} from '@digital-first/df-pages'
import { AgencyComponent } from './containers/agency/agency.component'
import { AgencyEditComponent } from './containers/agency/agency-edit/agency-edit.component'
import { AgencyAddComponent } from './containers/agency/agency-add/agency-add.component'
import { AgencyMappingAddComponent } from './containers/agency/agency-mapping-add/agency-mapping-add.component'
import { AgencyMappingEditComponent } from './containers/agency/agency-mapping-edit/agency-mapping-edit.component'
import { UserEditComponent } from './containers/user/user-edit/user-edit.component'
import { UserAddComponent } from './containers/user/user-add/user-add.component'
import { StatisticReportVersionEditComponent } from './containers/statistic-report/statistic-report-version-edit/statistic-report-version-edit.component'
import { PortfolioComponent } from './containers/portfolio/portfolio.component'
import { PortfoliosComponent } from './containers/portfolios/portfolios.component'
import { PortfolioAddComponent } from './containers/portfolio/portfolio-add/portfolio-add.component'
import { PortfolioEditComponent } from './containers/portfolio/portfolio-edit/portfolio-edit.component'
import { ReportVersionEditComponent } from './containers/program-report/report-version-edit/report-version-edit.component'

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
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
        path: 'agencies',
        component: AgenciesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Agencies',
          icon: 'text_rotation_none',
          nav: true
        }
      },
      {
        path: 'agencies/add',
        component: AgencyAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'agencies/:id',
        component: AgencyComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'agencies/edit/:id',
        component: AgencyEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'agencymapping/add/:agencyId',
        component: AgencyMappingAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'agencymapping/edit/:agencyMappingId',
        component: AgencyMappingEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
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
        path: 'portfolios',
        component: PortfoliosComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Portfolios',
          icon: 'book',
          nav: true
        }
      },
      {
        path: 'portfolios/add',
        component: PortfolioAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'portfolios/edit/:id',
        component: PortfolioEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'portfolios/:id',
        component: PortfolioComponent,
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
        path: 'programs/:programId/reports/:id',
        component: ProgramReportComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Projects',
          icon: 'group_work',
          nav: true
        }
      },
      {
        path: 'projects/add',
        component: ProjectAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'projects/edit/:id',
        component: ProjectEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Project',
          icon: 'group_work',
          nav: false
        }
      },
      {
        path: 'report-version-edit/:programId/:reportId/:reportVersionId',
        component: ReportVersionEditComponent,
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
        path:
          'statistic-report-version-edit/:statisticId/:reportId/:reportVersionId',
        component: StatisticReportVersionEditComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
        }
      },
      {
        path: 'statistics/:statisticId/reports/:id',
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
        path: 'users/add',
        component: UserAddComponent,
        canActivate: [AuthGuard],
        data: {
          nav: false
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
        path: 'users/edit/:id',
        component: UserEditComponent,
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
        path: 'upload/report',
        component: ReportuploadComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Upload Report',
          icon: 'description',
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
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

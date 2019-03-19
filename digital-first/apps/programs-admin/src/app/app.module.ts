import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ApolloModule } from 'apollo-angular'
import { HttpLinkModule } from 'apollo-angular-link-http'

import { ErrorsModule } from './core/errors'

import {
  DataTableModule,
  PanelModule,
  ButtonModule,
  DialogAreYouSureComponent,
  DialogsModule
} from '@df/components'

import { DfAuthModule, AUTH_KEY } from '@digital-first/df-auth'
import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPagesModule } from '@digital-first/df-pages'

import { DfMomentModule } from '@digital-first/df-moment'
import { WINDOW_PROVIDERS } from '@df/utils'

import { AppComponent } from './app.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { HomeComponent } from './containers/home/home.component'
import { AppRoutingModule } from './app-routing.module'

import { environment } from '../environments/environment'
import {
  FEDERATEDLOGINAPIPATH,
  APPBASEPATH
} from '@digital-first/df-app-tokens'

import { StatisticuploadComponent } from './containers/statisticupload/statisticupload.component'

import { ReportuploadComponent } from './containers/reportupload/reportupload.component'
import { GraphQLModule } from './graphql.module'
import { ProjectuploadComponent } from './containers/projectupload/projectupload.component'
import { ProgramsComponent } from './containers/programs/programs.component'
import { ProgramComponent } from './containers/program/program.component'
import { ProgramAddComponent } from './containers/program/program-add/program-add.component'
import { ProgramEditComponent } from './containers/program/program-edit/program-edit.component'
import { PermissionComponent } from './containers/permission/permission.component'
import { DialogAssignGroupPermissionComponent } from './dialogs/dialog-assign-group-permission.component'
import { ProgramReportsComponent } from './containers/program-reports/program-reports.component'
import { ReportAddComponent } from './containers/program-report/report-add/report-add.component'
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
import { GroupUsersComponent } from './containers/group-users/group-users.component'
import { DialogAssignUserToGroupComponent } from './dialogs/dialog-assign-user-to-group.component'
import { StatisticReportsComponent } from './containers/statistic-reports/statistic-reports.component'
import { StatisticReportComponent } from './containers/statistic-report/statistic-report.component'
import { StatisticReportAddComponent } from './containers/statistic-report/statistic-report-add/statistic-report-add.component'
import { StatisticReportEditComponent } from './containers/statistic-report/statistic-report-edit/statistic-report-edit.component'
import { ProjectComponent } from './containers/project/project.component'
import { ProjectAddComponent } from './containers/project/project-add/project-add.component'
import { ProjectEditComponent } from './containers/project/project-edit/project-edit.component'
import { ReportEditComponent } from './containers/program-report/report-edit/report-edit.component'
import { ProjectsComponent } from './containers/projects/projects.component'
import { AgenciesComponent } from './containers/agencies/agencies.component'
import { AgencyComponent } from './containers/agency/agency.component'
import { AgencyAddComponent } from './containers/agency/agency-add/agency-add.component'
import { AgencyEditComponent } from './containers/agency/agency-edit/agency-edit.component'
import { AgencyMappingAddComponent } from './containers/agency/agency-mapping-add/agency-mapping-add.component'
import { UserEditComponent } from './containers/user/user-edit/user-edit.component'
import { UserAddComponent } from './containers/user/user-add/user-add.component'
import { AgencyMappingEditComponent } from './containers/agency/agency-mapping-edit/agency-mapping-edit.component'
import { UserProgramAccessComponent } from './containers/user/user-program-access/user-program-access.component'
import { UserReportAccessComponent } from './containers/user/user-report-access/user-report-access.component'
import { UserStatisticAccessComponent } from './containers/user/user-statistic-access/user-statistic-access.component'
import { UserStatisticReportAccessComponent } from './containers/user/user-statistic-report-access/user-statistic-report-access.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { StatisticReportVersionEditComponent } from './containers/statistic-report/statistic-report-version-edit/statistic-report-version-edit.component'
import { PortfolioComponent } from './containers/portfolio/portfolio.component'
import { PortfoliosComponent } from './containers/portfolios/portfolios.component'
import { PortfolioAddComponent } from './containers/portfolio/portfolio-add/portfolio-add.component'
import { PortfolioEditComponent } from './containers/portfolio/portfolio-edit/portfolio-edit.component'
import { ReportVersionEditComponent } from './containers/program-report/report-version-edit/report-version-edit.component'
import { GroupRolesComponent } from './containers/group-roles/group-roles.component'
import { DialogAssignRoleToGroupComponent } from './dialogs/dialog-assign-role-to-group.component';
import { RolesComponent } from './containers/roles/roles.component';
import { RoleComponent } from './containers/role/role.component';
import { RoleAddComponent } from './containers/role/role-add/role-add.component';
import { RoleEditComponent } from './containers/role/role-edit/role-edit.component'

const COMPONENTS = [AppComponent, HomeComponent]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent,
  DialogAssignGroupPermissionComponent,
  DialogAssignUserToGroupComponent,
  DialogAssignRoleToGroupComponent
]

export function initApplication(): Function {
  return () =>
    new Promise(resolve => {
      const auth: any = JSON.parse(window.localStorage.getItem(AUTH_KEY))

      resolve(true)
    })
}

@NgModule({
  declarations: [
    ...COMPONENTS,
    StatisticuploadComponent,
    ReportuploadComponent,
    ProjectuploadComponent,
    ProgramsComponent,
    ProgramComponent,
    ProgramAddComponent,
    ProgramEditComponent,
    PermissionComponent,
    DialogAssignGroupPermissionComponent,
    DialogAssignUserToGroupComponent,
    DialogAssignRoleToGroupComponent,
    ProgramReportsComponent,
    ReportAddComponent,
    ProgramReportComponent,
    UsersComponent,
    UserComponent,
    GroupsComponent,
    GroupComponent,
    GroupAddComponent,
    GroupEditComponent,
    StatisticsComponent,
    StatisticComponent,
    StatisticAddComponent,
    StatisticEditComponent,
    GroupUsersComponent,
    StatisticReportsComponent,
    StatisticReportComponent,
    StatisticReportAddComponent,
    StatisticReportEditComponent,
    ReportEditComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    AgenciesComponent,
    AgencyComponent,
    AgencyAddComponent,
    AgencyEditComponent,
    AgencyMappingAddComponent,
    AgencyMappingEditComponent,
    UserEditComponent,
    UserAddComponent,
    UserProgramAccessComponent,
    UserReportAccessComponent,
    UserStatisticAccessComponent,
    UserStatisticReportAccessComponent,
    StatisticReportVersionEditComponent,
    PortfolioComponent,
    PortfoliosComponent,
    PortfolioAddComponent,
    PortfolioEditComponent,
    ReportVersionEditComponent,
    GroupRolesComponent,
    RolesComponent,
    RoleComponent,
    RoleAddComponent,
    RoleEditComponent
  ],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpLinkModule,
    NxModule.forRoot(),
    DfAuthModule,
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfPagesModule,
    DialogsModule,
    ErrorsModule,
    AppRoutingModule,
    GraphQLModule,
    DataTableModule,
    PanelModule,
    ButtonModule,
    NgxDatatableModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: FEDERATEDLOGINAPIPATH,
      useValue: environment.federatedLoginApiPath
    },
    { provide: APPBASEPATH, useValue: environment.appBasePath },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true
    },
    { provide: FullLayoutService, useClass: AppFullLayoutService }
  ],
  bootstrap: [AppComponent],
  exports: [AgencyComponent, AgencyAddComponent]
})
export class AppModule {}

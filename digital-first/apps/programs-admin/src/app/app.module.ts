import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ApolloModule } from 'apollo-angular'
import { HttpLinkModule } from 'apollo-angular-link-http'
import { NgxWigModule } from 'ngx-wig'

// import { ErrorsModule } from './core/errors'

import {
  DfAuthModule,
  AUTH_KEY
} from '@digital-first/df-auth'
import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import {
  DfDiscussionModule,
  DiscussionComponent
} from '@digital-first/df-discussion'
import { DfPagesModule } from '@digital-first/df-pages'

import {
  DfDialogsModule,
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
  DialogAddContactComponent
} from '@digital-first/df-dialogs'

import { DfPipesModule } from '@digital-first/df-pipes'
import { DfMomentModule } from '@digital-first/df-moment'
import { WINDOW_PROVIDERS } from '@digital-first/df-utils'
import {
  DfComponentsModule,
  TagsComponent,
  ViewLayoutButtonComponent,
  ContactCardComponent,
  PageTitleComponent,
  ExpandCollapseButtonComponent,
  DateFormatButtonComponent,
  AddItemButtonComponent,
  ShareButtonComponent,
  AddNotificationButtonComponent,
  ArchiveButtonComponent,
  RelatedArtifactsComponent,
  MetadataRefinerComponent,
  DataTableComponent
} from '@digital-first/df-components'

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
import { GraphQLModule } from './graphql.module'
import { ProjectuploadComponent } from './containers/projectupload/projectupload.component'
import { ProgramsComponent } from './containers/programs/programs.component'
import { ProgramComponent } from './containers/program/program.component'
import { ProgramAddComponent } from './containers/program/program-add/program-add.component'
import { ProgramEditComponent } from './containers/program/program-edit/program-edit.component'
import { PermissionComponent } from './containers/permission/permission.component'
import { DialogAssignGroupPermissionComponent } from './dialogs/dialog-assign-group-permission.component'
import { ProgramReportsComponent } from './containers/program-reports/program-reports.component';
import { ReportAddComponent } from './containers/program-reports/report-add/report-add.component';
import { ProgramReportComponent } from './containers/program-report/program-report.component'

const COMPONENTS = [AppComponent, HomeComponent]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
  DialogAddContactComponent,
  DialogAssignGroupPermissionComponent,
  DiscussionComponent,
  TagsComponent,
  ViewLayoutButtonComponent,
  ContactCardComponent,
  PageTitleComponent,
  ExpandCollapseButtonComponent,
  DateFormatButtonComponent,
  AddItemButtonComponent,
  ShareButtonComponent,
  AddNotificationButtonComponent,
  ArchiveButtonComponent,
  RelatedArtifactsComponent,
  MetadataRefinerComponent,
  DataTableComponent
]

export function initApplication(): Function {
  return () =>
    new Promise(resolve => {
     // store.dispatch(new StartAppInitialiser())

      // tslint:disable-next-line:no-console
      console.log('app initialise started...')

      const auth: any = JSON.parse(window.localStorage.getItem(AUTH_KEY))

      if (auth) {
        // tslint:disable-next-line:no-console
        console.log('user is logged in, start auto token refresh')

        // store.dispatch(new StartAutoTokenRefresh())
      }
      resolve(true)
    })
}

@NgModule({
  declarations: [
    ...COMPONENTS,
    StatisticuploadComponent,
    ProjectuploadComponent,
    ProgramsComponent,
    ProgramComponent,
    ProgramAddComponent,
    ProgramEditComponent,
    PermissionComponent,
    DialogAssignGroupPermissionComponent,
    ProgramReportsComponent,
    ReportAddComponent,
    ProgramReportComponent
  ],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpLinkModule,
    NgxWigModule,
    NxModule.forRoot(),
    DfAuthModule,
    DfComponentsModule,
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
    DfPagesModule,
    DfDialogsModule,
    DfPipesModule,
    // ErrorsModule,
    AppRoutingModule,
    GraphQLModule
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
    { provide: FullLayoutService, useClass: AppFullLayoutService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

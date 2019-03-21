import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AppRoutingModule } from './app-routing.module'
import { DfLayoutsModule, TitleLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfPipesModule } from '@digital-first/df-pipes'

import {
  DialogAreYouSureComponent,
  DataTableModule,
  PanelModule,
  ButtonModule,
  DialogsModule,
  RefinerModule
} from '@df/components'
import { AppFullLayoutService } from './app-full-layout.service'
import { environment } from '../environments/environment'
import { initApplication } from './app-init'

import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { PlannerComponent } from './components/planner/planner.component'
import { PlannerPageComponent } from './pages/planner-page/planner-page.component'
import { OverviewPageComponent } from './pages/overview-page/overview-page.component'
import { MapOverviewPageComponent } from './pages/map-overview-page/map-overview-page.component'
import { CommitmentLayoutComponent } from './layouts/commitment-layout/commitment-layout.component'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  PlannerComponent,
  PlannerPageComponent,
  OverviewPageComponent,
  MapOverviewPageComponent,
  CommitmentLayoutComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    DataTableModule,
    PanelModule,
    ButtonModule,
    RefinerModule,
    DialogsModule,
    DfLayoutsModule,
    DfThemeModule,
    DfPagesModule,
    DfPipesModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [],
      multi: true
    },
    { provide: TitleLayoutService, useClass: AppFullLayoutService },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const defaultOptions = {
          watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'ignore'
          },
          query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all'
          }
        }

        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.datasource.dataServiceUrl
          }),
          defaultOptions: defaultOptions
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

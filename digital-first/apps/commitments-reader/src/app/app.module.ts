import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MdcSliderModule, MdcElevationModule } from '@angular-mdc/web'
import { AgmCoreModule } from '@agm/core'
import { AppRoutingModule } from './app-routing.module'
import { DfLayoutsModule, TitleLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfRefinerModule } from '@digital-first/df-refiner'
import { DfMomentModule } from '@digital-first/df-moment'

import {
  DialogAreYouSureComponent,
  DataTableModule,
  PanelModule,
  ButtonModule,
  DialogsModule
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
import { CommitmentOverviewLayoutComponent } from './layouts/commitment-overview-layout/commitment-overview-layout.component'
import { SchedulerComponent } from './components/scheduler/scheduler.component'
import { GetRefinerTagsGQL } from './generated/graphql'
import { DfSharepointLibModule } from '@df/sharepoint'
import { commitmentEventDataServiceProvider } from './services/commitment-event/commitment-event-data-service';
import { CommitmentLayoutComponent } from './layouts/commitment-layout/commitment-layout.component';
import { CommitmentComponent } from './containers/commitment/commitment.component'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  PlannerComponent,
  PlannerPageComponent,
  OverviewPageComponent,
  MapOverviewPageComponent,
  CommitmentLayoutComponent,
  CommitmentOverviewLayoutComponent,
  SchedulerComponent,
  CommitmentComponent 
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbiAzbni3d2FTFOJAHP185j7lZWm95kgc',
      libraries: ['places']
    }),
    HttpClientModule,
    HttpLinkModule,
    DataTableModule,
    PanelModule,
    ButtonModule,
    DialogsModule,
    DfRefinerModule,
    DfLayoutsModule,
    DfThemeModule,
    DfPagesModule,
    DfPipesModule,
    AppRoutingModule,
    MdcSliderModule,
    MdcElevationModule,
    DfSharepointLibModule,
    DfMomentModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [],
      multi: true
    },
    commitmentEventDataServiceProvider,
    { provide: TitleLayoutService, useClass: AppFullLayoutService },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const defaultOptions = {
          watchQuery: {
            errorPolicy: 'ignore'
          },
          query: {
            errorPolicy: 'all'
          }
        }

        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            method: 'GET',
            uri: environment.datasource.dataServiceUrl,
            headers: new HttpHeaders({
              ProgramsApiKey: environment.apiKey
            })
          }),
          defaultOptions
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
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
import { DfMomentModule, DateFormatPipe } from '@digital-first/df-moment'
import { DfButtonsModule } from '@digital-first/df-buttons'
import { DfComponentsModule } from '@digital-first/df-components'

import {
  DataTableModule,
  PanelModule,
  ButtonModule,
  DialogsModule
} from '@df/components'
import { NgSelectModule } from '@ng-select/ng-select'
import { AppFullLayoutService } from './app-full-layout.service'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { PlannerComponent } from './components/planner/planner.component'
import { PlannerPageComponent } from './pages/planner-page/planner-page.component'
import { OverviewPageComponent } from './pages/overview-page/overview-page.component'
import { MapOverviewPageComponent } from './pages/map-overview-page/map-overview-page.component'
import { CommitmentOverviewLayoutComponent } from './layouts/commitment-overview-layout/commitment-overview-layout.component'
import { SchedulerComponent } from './components/scheduler/scheduler.component'
import { commitmentEventDataServiceProvider } from './services/commitment-event/commitment-event-data-service'
import { CommitmentDetailComponent } from './pages/commitment-detail/commitment-detail.component'
import { DfSharepointLibModule, SharepointJsomService } from '@df/sharepoint'
import * as fromUser from './reducers/user/user.reducer'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, Store } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { metaReducers, reducers, CustomSerializer } from './reducers'
import { CommitmentLayoutComponent } from './layouts/commitment-layout/commitment-layout.component'
import { RouterStateSerializer } from '@ngrx/router-store'

import * as fromRefiner from './reducers/refiner/refiner.reducer'
import * as fromOverview from './reducers/overview/overview.reducer'
import * as fromMap from './reducers/map/map.reducer'
import * as fromPlanner from './reducers/planner/planner.reducer'
import * as fromApp from './reducers/app/app.reducer'
import * as fromCommitmentDetail from './reducers/commitment-detail/commitment-detail.reducer'

import { AppEffects } from './reducers/app/app.effects'
import { CommitmentDetailEffects } from './reducers/commitment-detail/commitment-detail.effects'
import { RouterEffects } from './reducers/router.effects'
import { RefinerEffects } from './reducers/refiner/refiner.effects'
import { OverviewEffects } from './reducers/overview/overview.effects'
import { MapEffects } from './reducers/map/map.effects'
import { PlannerEffects } from './reducers/planner/planner.effects'

import { SettingsService } from './services/settings.service'

import { CommitmentPackageComponent } from './pages/commitment-packages/commitment-package.component'
import { initApplication } from './app-init'
import { appDataServiceProvider } from './services/app-data/app-data.service.factory'
import { configServiceProvider } from './services/config/config.service.factory';

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
  CommitmentDetailComponent,
  CommitmentPackageComponent
]

@NgModule({
  declarations: [...COMPONENTS, CommitmentDetailComponent],
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
    DfMomentModule,
    DfButtonsModule,
    DfComponentsModule,
    NgSelectModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreModule.forFeature('app', fromApp.reducer),
    StoreModule.forFeature('user', fromUser.reducer),
    StoreModule.forFeature('refiner', fromRefiner.reducer),
    StoreModule.forFeature('overview', fromOverview.reducer),
    StoreModule.forFeature('map', fromMap.reducer),
    StoreModule.forFeature('planner', fromPlanner.reducer),
    StoreModule.forFeature('commitmentDetail', fromCommitmentDetail.reducer),

    EffectsModule.forRoot([RouterEffects]),
    EffectsModule.forFeature([
      AppEffects,
      RefinerEffects,
      OverviewEffects,
      MapEffects,
      PlannerEffects,
      CommitmentDetailEffects
    ])
  ],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store, SettingsService],
      multi: true
    },
    appDataServiceProvider,
    configServiceProvider,
    commitmentEventDataServiceProvider,
    SharepointJsomService,
    DateFormatPipe,
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
    },
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent],
  exports: [CommitmentDetailComponent]
})
export class AppModule {}

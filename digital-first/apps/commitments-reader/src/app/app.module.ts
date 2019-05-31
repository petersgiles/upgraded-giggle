import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ApolloModule } from 'apollo-angular'
import { HttpLinkModule } from 'apollo-angular-link-http'
import {
  MdcSliderModule,
  MdcElevationModule,
  MdcListModule,
  MdcCardModule,
  MdcIconModule
} from '@angular-mdc/web'
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
import { DisplayOrderPageComponent } from './pages/display-order-page/display-order-page.component'
import { OverviewPageComponent } from './pages/overview-page/overview-page.component'
import { MapOverviewPageComponent } from './pages/map-overview-page/map-overview-page.component'
import { CommitmentOverviewLayoutComponent } from './layouts/commitment-overview-layout/commitment-overview-layout.component'
import { SchedulerComponent } from './components/scheduler/scheduler.component'
import { commitmentEventDataServiceProvider } from './services/commitment-event/commitment-event-data-service'
import { CommitmentDetailComponent } from './pages/commitment-detail/commitment-detail.component'
import { DfSharepointLibModule, SharepointJsomService } from '@df/sharepoint'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, Store } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { metaReducers, reducers } from './reducers'
import { CommitmentLayoutComponent } from './layouts/commitment-layout/commitment-layout.component'
import { RouterStateSerializer } from '@ngrx/router-store'

import {
  DfAppCoreModule,
  CustomSerializer,
  RouterEffects,
  AppEffects,
  UserEffects,
  initApplication,
  AppReducer,
  UserReducer,
  AppSettingsService,
  AppUserOperationsService,
  AppErrorHandlerToSeqService
} from '@digital-first/df-app-core'

import * as fromRefiner from './reducers/refiner/refiner.reducer'
import * as fromOverview from './reducers/overview/overview.reducer'
import * as fromMap from './reducers/map/map.reducer'
import * as fromPlanner from './reducers/planner/planner.reducer'

import * as fromCommitmentDetail from './reducers/commitment-detail/commitment-detail.reducer'
import * as fromCommitmentDisplayOrder from './reducers/commitment-display-order/commitment-display-order.reducer'

import { CommitmentDetailEffects } from './reducers/commitment-detail/commitment-detail.effects'
import { RefinerEffects } from './reducers/refiner/refiner.effects'
import { OverviewEffects } from './reducers/overview/overview.effects'
import { MapEffects } from './reducers/map/map.effects'
import { GlobleEffects } from './reducers/app/app.effects'
import { PlannerEffects } from './reducers/planner/planner.effects'
import { CommitmentDisplayOrderEffects } from './reducers/commitment-display-order/commitment-display-order.effects'
import { SettingsService } from './services/settings.service'

import { CommitmentPackageComponent } from './pages/commitment-packages/commitment-package.component'
import { appDataServiceProvider } from './services/app-data/app-data.service.factory'
import { configServiceProvider } from './services/config/config.service.factory'
import { GraphQLModule } from './graphQL/graphQl.module'
import { UserProfileComponent } from './pages/user-profile/user-profile.component'

import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommitmentsReaderOperationsService } from './services/app-data/app-operations'
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
  CommitmentPackageComponent,
  DisplayOrderPageComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    CommitmentDetailComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    ApolloModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbiAzbni3d2FTFOJAHP185j7lZWm95kgc',
      libraries: ['places']
    }),
    HttpClientModule,
    HttpLinkModule,
    GraphQLModule,
    DfAppCoreModule,
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
    MdcListModule,
    MdcCardModule,
    MdcIconModule,
    DfSharepointLibModule,
    DfMomentModule,
    DfButtonsModule,
    DfComponentsModule,
    NgSelectModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreModule.forFeature('app', AppReducer),
    StoreModule.forFeature('user', UserReducer),
    StoreModule.forFeature('refiner', fromRefiner.reducer),
    StoreModule.forFeature('overview', fromOverview.reducer),
    StoreModule.forFeature('map', fromMap.reducer),
    StoreModule.forFeature('planner', fromPlanner.reducer),
    StoreModule.forFeature('commitmentDetail', fromCommitmentDetail.reducer),
    StoreModule.forFeature(
      'commitmentDisplayOrder',
      fromCommitmentDisplayOrder.reducer
    ),

    EffectsModule.forRoot([RouterEffects]),
    EffectsModule.forFeature([
      AppEffects,
      GlobleEffects,
      UserEffects,
      RefinerEffects,
      OverviewEffects,
      MapEffects,
      PlannerEffects,
      CommitmentDetailEffects,
      CommitmentDisplayOrderEffects
    ])
  ],
  providers: [
    { provide: AppSettingsService, useClass: SettingsService },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store, SettingsService],
      multi: true
    },
    {
      provide: AppUserOperationsService,
      useClass: CommitmentsReaderOperationsService
    },
    appDataServiceProvider,
    configServiceProvider,
    commitmentEventDataServiceProvider,
    SharepointJsomService,
    DateFormatPipe,
    SeqService,
    { provide: ErrorHandler, useClass: AppErrorHandlerToSeqService },
    { provide: TitleLayoutService, useClass: AppFullLayoutService },
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

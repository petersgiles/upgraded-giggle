import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { DfLayoutsModule, TitleLayoutService } from '@digital-first/df-layouts'
import { AppFullLayoutService } from './app-full-layout.service'
import { BriefLayoutComponent } from './pages/brief/brief-layout/brief-layout.component'
import { BriefReaderComponent } from './pages/brief/brief-reader/brief-reader.component'
import { NxModule } from '@nrwl/nx'
import {
  DialogAreYouSureComponent,
  DialogsModule,
  PanelModule,
  ButtonModule,
  PipesModule,
  DocumentModule,
  DiscussionModule
} from '@df/components'
import { WINDOW_PROVIDERS } from '@df/utils'

import { DfThemeModule } from '@digital-first/df-theme'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfComponentsModule } from '@digital-first/df-components'
import { DfMomentModule, DateFormatPipe } from '@digital-first/df-moment'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfSharepointLibModule, SharepointJsomService } from '@df/sharepoint'

import { HomeComponent } from './pages/home/home.component'


import { DragDropModule } from '@angular/cdk/drag-drop'

import { DfButtonsModule } from '@digital-first/df-buttons'
import { DfMapModule } from '@digital-first/df-map'

import { StoreModule, Store } from '@ngrx/store'

import { EffectsModule } from '@ngrx/effects'

import {
  DfAppCoreModule,
  CustomSerializer,
  RouterEffects,
  AppEffects,
  initApplication,
  AppReducer,
  UserReducer,
  AppSettingsService,
  AppUserOperationsService,
  AppErrorHandlerToSeqService,
  UserEffects
} from '@digital-first/df-app-core'

import { metaReducers, reducers } from './reducers'
import { environment } from '../environments/environment'
import { RouterStateSerializer } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { configServiceProvider } from './services/config/config.service.factory'
import { appDataServiceProvider } from './services/app-data/app-data.service.factory'
// import { deckDataServiceProvider } from './reducers/deck/deck-data.service.factory'
import { SettingsService } from './services/settings.service'
import { UserProfileComponent } from './pages/user-profile/user-profile.component'

import { UserOperationsService } from './services/app-data/app-operations'

import { BriefDocumentComponent } from './pages/brief/brief-document/brief-document.component'
import { NavigationEffects } from './reducers/navigation/navigation.effects'
import { BriefEffects } from './reducers/brief/brief.effects'
import { DiscussionEffects } from './reducers/discussion/discussion.effects'
import { LookupEffects } from './reducers/lookups/lookup.effects'

import * as fromNavigation from './reducers/navigation/navigation.reducer'
import * as fromDiscussion from './reducers/discussion/discussion.reducer'
import * as fromBrief from './reducers/brief/brief.reducer'
import * as fromLookups from './reducers/lookups/lookup.reducer'

import { briefDataServiceProvider } from './reducers/brief/brief-data.service.factory'
import { navigationDataServiceProvider } from './reducers/navigation/navigation-data.service.factory'
import { discussionDataServiceProvider } from './reducers/discussion/discussion-data.service.factory'
import { lookupDataServiceProvider } from './reducers/lookups/lookup-data.service.factory'

import { GlobalEffects } from './reducers/app/app.effects'

import { NoBriefSelectedComponent } from './pages/brief/no-brief-selected/no-brief-selected.component'
import { BriefDataEditorComponent } from './pages/brief/brief-data-editor/brief-data-editor.component'
import { BriefSubscriptionEditorComponent } from './pages/brief/brief-subscription-editor/brief-subscription-editor.component'

import { ProtectiveMarkingComponent } from './pages/brief/protective-marking/protective-marking.component'
import { BriefStatusComponent } from './pages/brief/brief-status/brief-status.component'
import { BriefDiscussionComponent } from './pages/brief/brief-discussion/brief-discussion.component';
import { BriefProcessingInstructionComponent } from './pages/brief/brief-processing-instruction/brief-processing-instruction.component';
import { BriefRecommendationComponent } from './pages/brief/brief-recommendation/brief-recommendation.component';
import { BriefWarningBannerComponent } from './pages/brief/brief-warning-banner/brief-warning-banner.component'


const COMPONENTS = [
  AppComponent,
  BriefLayoutComponent,
  BriefReaderComponent,
  HomeComponent,
  BriefDocumentComponent,
  UserProfileComponent,
  
  NoBriefSelectedComponent,
  BriefDataEditorComponent,
  BriefSubscriptionEditorComponent,
  
  ProtectiveMarkingComponent,
  BriefStatusComponent,
  BriefDiscussionComponent
]

const ENTRYCOMPONENTS = [DialogAreYouSureComponent]

@NgModule({
  declarations: [...COMPONENTS, BriefProcessingInstructionComponent, BriefRecommendationComponent, BriefWarningBannerComponent],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DfLayoutsModule,
    NxModule.forRoot(),
    PanelModule,
    ButtonModule,
    DocumentModule,
    DiscussionModule,
    PipesModule,
    DfAppCoreModule,
    DfComponentsModule,
    DfButtonsModule,
    DfMapModule,
    DfMomentModule,
     
    DfThemeModule,
    DfPagesModule,
    DfSharepointLibModule,
    DfPipesModule,
    
    DragDropModule,
    DialogsModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreModule.forFeature('app', AppReducer),
    StoreModule.forFeature('user', UserReducer),
    StoreModule.forFeature('navigation', fromNavigation.reducer),
    StoreModule.forFeature('discussion', fromDiscussion.reducer),
    StoreModule.forFeature('brief', fromBrief.reducer),
    StoreModule.forFeature('lookups', fromLookups.reducer),

    EffectsModule.forRoot([RouterEffects]),
    EffectsModule.forFeature([
      GlobalEffects,
      AppEffects,
      UserEffects,
      LookupEffects,
      NavigationEffects,
      BriefEffects,
      DiscussionEffects
    ])
  ],
  providers: [
    { provide: TitleLayoutService, useClass: AppFullLayoutService },
    {
      provide: ErrorHandler,
      useClass: environment.production
        ? AppErrorHandlerToSeqService
        : ErrorHandler
    },
    {
      provide: AppUserOperationsService,
      useClass: UserOperationsService
    },
    { provide: AppSettingsService, useClass: SettingsService },
    WINDOW_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store],
      multi: true
    },
    appDataServiceProvider,
    configServiceProvider,
    briefDataServiceProvider,
    discussionDataServiceProvider,
    lookupDataServiceProvider,
    navigationDataServiceProvider,
    SharepointJsomService,
    DateFormatPipe,

    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

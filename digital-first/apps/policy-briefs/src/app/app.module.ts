import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'
import {
  DialogAreYouSureComponent,
  PanelModule,
  ButtonModule,
  PipesModule,
  DocumentModule,
  DiscussionModule
} from '@df/components'
import { WINDOW_PROVIDERS } from '@df/utils'
import { DfLayoutsModule, TitleLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfComponentsModule } from '@digital-first/df-components'
import { DfMomentModule, DateFormatPipe } from '@digital-first/df-moment'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfDialogsModule } from '@digital-first/df-dialogs'
import { DfSharepointLibModule, SharepointJsomService } from '@df/sharepoint'

import { HomeComponent } from './pages/home/home.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { AppRoutingModule } from './app-routing.module'
import { DragDropModule } from '@angular/cdk/drag-drop'

import { DfDatatableModule } from '@digital-first/df-datatable'
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
import { HttpClientModule } from '@angular/common/http'
import { configServiceProvider } from './services/config/config.service.factory'
import { appDataServiceProvider } from './services/app-data/app-data.service.factory'
// import { deckDataServiceProvider } from './reducers/deck/deck-data.service.factory'
import { SettingsService } from './services/settings.service'
import { UserProfileComponent } from './pages/user-profile/user-profile.component'

import { DeckUserOperationsService } from './services/app-data/app-operations'

import { BriefComponent } from './pages/brief/brief.component'
import { BriefDocumentComponent } from './containers/brief-document/brief-document.component'
import { NavigationEffects } from './reducers/navigation/navigation.effects'
import { BriefEffects } from './reducers/brief/brief.effects'
import { DiscussionEffects } from './reducers/discussion/discussion.effects'

import * as fromNavigation from './reducers/navigation/navigation.reducer'
import * as fromDiscussion from './reducers/discussion/discussion.reducer'
import * as fromBrief from './reducers/brief/brief.reducer'
import { briefDataServiceProvider } from './reducers/brief/brief-data.service.factory'
import { navigationDataServiceProvider } from './reducers/navigation/navigation-data.service.factory'
import { discussionDataServiceProvider } from './reducers/discussion/discussion-data.service.factory'
import { GlobalEffects } from './reducers/app/app.effects';

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  BriefComponent,
  BriefDocumentComponent,
  DialogAreYouSureComponent,
  UserProfileComponent
]

const ENTRYCOMPONENTS = [DialogAreYouSureComponent]

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    PanelModule,
    ButtonModule,
    DocumentModule,
    DiscussionModule,
    PipesModule,
    DfAppCoreModule,
    DfComponentsModule,
    DfDatatableModule,
    DfButtonsModule,
    DfMapModule,
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfPagesModule,
    DfDialogsModule,
    DfSharepointLibModule,
    DfPipesModule,
    AppRoutingModule,
    DragDropModule,

    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreModule.forFeature('app', AppReducer),
    StoreModule.forFeature('user', UserReducer),
    StoreModule.forFeature('navigation', fromNavigation.reducer),
    StoreModule.forFeature('discussion', fromDiscussion.reducer),
    StoreModule.forFeature('brief', fromBrief.reducer),

    EffectsModule.forRoot([RouterEffects]),
    EffectsModule.forFeature([
      GlobalEffects,
      AppEffects,
      UserEffects,
      NavigationEffects,
      BriefEffects,
      DiscussionEffects
    ])
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: AppErrorHandlerToSeqService
    // },
    {
      provide: AppUserOperationsService,
      useClass: DeckUserOperationsService
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
    navigationDataServiceProvider,
    SharepointJsomService,
    DateFormatPipe,
    { provide: TitleLayoutService, useClass: AppFullLayoutService },
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

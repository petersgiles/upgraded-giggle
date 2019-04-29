import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'

import { WINDOW_PROVIDERS } from '@df/utils'
import { DfLayoutsModule, TitleLayoutService } from '@digital-first/df-layouts'

import { HomeComponent } from './pages/home/home.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { AppRoutingModule } from './app-routing.module'
import { DragDropModule } from '@angular/cdk/drag-drop'

import {
  DocumentModule,
  DiscussionModule,
  ButtonModule,
  PanelModule,
  RefinerModule,
  AvatarModule,
  DialogAreYouSureComponent
} from '@df/components'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { NavigationEffects } from './reducers/navigation/navigation.effects'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { initApplication } from './app-init'
import { PolicyBriefsDataService } from './services/policy-briefs-data.service'
import { BriefComponent } from './pages/brief/brief.component'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfThemeModule } from '@digital-first/df-theme';

import { RouterStateSerializer } from '@ngrx/router-store'
import { DfSharepointLibModule, SharepointJsomService } from '@df/sharepoint'

import { metaReducers, reducers, CustomSerializer } from './reducers'
import * as fromNavigation from './reducers/navigation/navigation.reducer'
import * as fromUser from './reducers/user/user.reducer'
import * as fromBrief from './reducers/brief/brief.reducer'
import * as fromDiscussion from './reducers/discussion/discussion.reducer'
import { environment } from '../environments/environment'

import { DiscussionEffects } from './reducers/discussion/discussion.effects'
import { BriefEffects } from './reducers/brief/brief.effects'
import { AppEffects } from './reducers/app.effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { BriefDocumentComponent } from './containers/brief-document/brief-document.component'


const COMPONENTS = [
  AppComponent,
  HomeComponent,
  BriefComponent,
  BriefDocumentComponent,
  DialogAreYouSureComponent
]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NxModule.forRoot(),

    ButtonModule,
    PanelModule,

    RefinerModule,
    AvatarModule,
    DiscussionModule,
    DocumentModule,
    AppRoutingModule,
    DragDropModule,

    DfSharepointLibModule,
    DfLayoutsModule,
    DfPagesModule,
    DfPipesModule,
    DfThemeModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('navigation', fromNavigation.reducer),
    StoreModule.forFeature('user', fromUser.reducer),
    StoreModule.forFeature('discussion', fromDiscussion.reducer),
    StoreModule.forFeature('brief', fromBrief.reducer),

    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([
      NavigationEffects,
      BriefEffects,
      DiscussionEffects
    ])
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [],
      multi: true
    },
    SharepointJsomService,
    PolicyBriefsDataService,
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

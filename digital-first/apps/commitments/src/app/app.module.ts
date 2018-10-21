import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfDiscussionModule, DiscussionComponent } from '@digital-first/df-discussion'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfDialogsModule, DialogAreYouSureComponent, DialogShowErrorComponent, DialogFileLockedComponent, DialogSpinnerOverlayComponent } from '@digital-first/df-dialogs'
import { DfSharepointModule, SharepointJsomService } from '@digital-first/df-sharepoint'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfMomentModule } from '@digital-first/df-moment'

import { AppComponent } from './app.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { HomeComponent } from './containers/home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { CommitmentCardComponent } from './components/commitment-card/commitment-card.component'
import { CommitmentEditFormComponent } from './components/commitment-edit-form/commitment-edit-form.component'
import { CommitmentEditComponent } from './containers/commitment-edit/commitment-edit.component'
import { CommitmentOverviewComponent } from './containers/commitment-overview/commitment-overview.component'

import { SettingsService } from './services/settings.service'
import { SharepointDataService } from './services/sharepoint/sharepoint-data.service'
import { ApolloDataService } from './services/apollo/apollo-data.service'
import { AppDataService } from './services/app-data.service'
import { environment } from '../environments/environment'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { APP_FEATURE_KEY, initialState as appInitialState, appReducer } from './+state/app.reducer'
import { AppEffects } from './+state/app.effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { storeFreeze } from 'ngrx-store-freeze'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  CommitmentCardComponent,
  CommitmentEditFormComponent,
  CommitmentEditComponent,
  CommitmentOverviewComponent
]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
  DiscussionComponent
]

const appDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new SharepointDataService(sharepointlib)
    default:
      return new ApolloDataService(apollo)
  }

}

export let appDataServiceProvider = {
  provide: AppDataService,
  useFactory: appDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule,
    HttpLinkModule,
    NxModule.forRoot(),
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
    DfPagesModule,
    DfDialogsModule,
    DfSharepointModule,
    DfPipesModule,
    AppRoutingModule,
    StoreModule.forRoot(
  { app: appReducer },
  {
    initialState : { app : appInitialState },
    metaReducers : !environment.production ? [storeFreeze] : []
  }
),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    appDataServiceProvider,
    { provide: FullLayoutService, useClass: AppFullLayoutService },
    { provide: 'Window', useValue: window },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.datasource.dataServiceUrl
          })
        }
      },
      deps: [HttpLink]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

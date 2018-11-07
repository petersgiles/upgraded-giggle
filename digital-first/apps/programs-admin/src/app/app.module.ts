import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NgxWigModule } from 'ngx-wig'

import { DfAuthModule, JwtAuthInterceptor } from '@digital-first/df-auth'
import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfDiscussionModule, DiscussionComponent } from '@digital-first/df-discussion'
import { DfPagesModule } from '@digital-first/df-pages'

import {
  DfDialogsModule,
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
  DialogAddContactComponent
} from '@digital-first/df-dialogs'

import { DfSharepointModule, SharepointJsomService } from '@digital-first/df-sharepoint'
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

import { SettingsService } from './services/settings.service'
import { SharepointDataService } from './services/sharepoint/sharepoint-data.service'
import { ApolloDataService } from './services/apollo/apollo-data.service'
import { AppDataService } from './services/app-data.service'
import { environment } from '../environments/environment'
import { StoreModule, Store } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { CustomSerializer, reducers, metaReducers } from './reducers'
import { RouterStateSerializer } from '@ngrx/router-store'

import { StartAppInitialiser } from './reducers/app.actions'

import * as fromRoot from './reducers'

import { AppEffects } from './reducers/app.effects'
import { RouterEffects } from './reducers/router.effects'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
  DialogAddContactComponent,
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

export function initApplication(store: Store<fromRoot.State>): Function {
  return () => new Promise(resolve => {
    store.dispatch(new StartAppInitialiser())

    // tslint:disable-next-line:no-console
    console.log('app initialise started...', store)

    // store.pipe(select(fromRoot.getLoggedIn)).subscribe(isLoggedIn => {
    //   if (isLoggedIn) {

    //     // tslint:disable-next-line:no-console
    //     console.log('user is logged in, start auto token refresh')

    //     store.dispatch(new StartAutoTokenRefresh())
    //   }
    // })

    resolve(true)
  })
}

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
    NgxWigModule,
    NxModule.forRoot(),
    DfAuthModule.forRoot(),
    DfComponentsModule,
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
    DfPagesModule,
    DfDialogsModule,
    DfSharepointModule,
    DfPipesModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([
      RouterEffects,
    ]),
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    appDataServiceProvider,
    { provide: FullLayoutService, useClass: AppFullLayoutService },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {

        const defaultOptions = {
          watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'ignore',
          },
          query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
          },
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
    },
    /**
    * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
    * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
    * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
    */
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

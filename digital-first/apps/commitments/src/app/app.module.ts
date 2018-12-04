import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NxModule } from '@nrwl/nx'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NgxWigModule } from 'ngx-wig'
import { AgmCoreModule } from '@agm/core'
import { NgSelectModule } from '@ng-select/ng-select'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'

import { DfLayoutsModule, FullLayoutService } from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfDiscussionModule, DiscussionComponent } from '@digital-first/df-discussion'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfDialogsModule, DialogAreYouSureComponent, DialogShowErrorComponent, DialogFileLockedComponent, DialogSpinnerOverlayComponent, DialogAddContactComponent } from '@digital-first/df-dialogs'
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
import { CommitmentCardComponent } from './components/commitment-card/commitment-card.component'
import { CommitmentEditFormComponent } from './components/commitment-edit-form/commitment-edit-form.component'

import { CommitmentListComponent } from './components/commitment-list/commitment-list.component'

import { DialogAddCommitmentComponent } from './dialogs/dialog-add-commitment.component'

import { SettingsService } from './services/settings.service'
import { SharepointDataService } from './services/sharepoint/sharepoint-data.service'
import { ApolloDataService } from './services/apollo/apollo-data.service'
import { AppDataService } from './services/app-data.service'
import { DfLoggingModule } from '@digital-first/df-logging'
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
import { CommitmentLookupEffects } from './reducers/commitment-lookup/commitment-lookup.effects'
import { CommitmentEffects } from './reducers/commitment'
import { CommentDiscussionEffects } from './reducers/commitment-discussion/commitment-discussion.effects'
import { ContactEffects } from './reducers/contact/contact.effects'
import { ContactCreateFormComponent } from './components/contact-create-form/contact-create-form.component'
import { MapPointEffects } from './reducers/map-point/map-point.effects'
import { RelatedCommitmentEffects } from './reducers/related-commitment/related-commitment.effects'
import { CommitmentSubscriptionEffects } from './reducers/commitment-subscription/commitment-subscription.effects'
import { CommitmentContactEffects } from './reducers/commitment-contact/commitment-contact.effects'
import { CommitmentActionEffects } from './reducers/commitment-action/commitment-action.effects'

import { CommitmentDiscussionComponent } from './containers/commitment-discussion/commitment-discussion.component'
import { CommitmentDeliveryLocationComponent } from './containers/commitment-delivery-location/commitment-delivery-location.component'
import { CommitmentContactsComponent } from './containers/commitment-contacts/commitment-contacts.component'
import { AboutComponent } from './pages/about/about.component'
import { CommitmentCostingsComponent } from './containers/commitment-costings/commitment-costings.component'

import { CommitmentOverviewComponent } from './pages/commitment-overview/commitment-overview.component'
import { CommitmentEditComponent } from './pages/commitment-edit/commitment-edit.component'
import { ContactCreateComponent } from './pages/contact-create/contact-create.component'
import { CommitmentCreateComponent } from './pages/commitment-create/commitment-create.component'
import { discussionDataServiceProvider } from './reducers/commitment-discussion/commitment-discussion-data.service'
import { lookupDataServiceProvider } from './reducers/commitment-lookup/commitment-lookup-data.service'
import { subscriptionDataServiceProvider } from './reducers/commitment-subscription/commitment-subscription-data.service'
import { commitmentContactsDataServiceProvider } from './reducers/commitment-contact/commitment-contact-data.service'
import { commitmentActionsDataServiceProvider } from './reducers/commitment-action/commitment-action-data.service'
import { CommitmentCostingComponent } from './pages/commitment-costing/commitment-costing.component'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  CommitmentCardComponent,
  CommitmentEditFormComponent,
  CommitmentEditComponent,
  CommitmentOverviewComponent,
  CommitmentListComponent,
  CommitmentCreateComponent,
  ContactCreateComponent,
  ContactCreateFormComponent,
  DialogAddCommitmentComponent,
  CommitmentDiscussionComponent,
  CommitmentCostingComponent,
  CommitmentCostingsComponent,
  CommitmentDeliveryLocationComponent,
  CommitmentContactsComponent,
  AboutComponent
]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
  DialogAddContactComponent,
  DialogAddCommitmentComponent,
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
    store.dispatch(new StartAppInitialiser({ environment: environment }))

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
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbiAzbni3d2FTFOJAHP185j7lZWm95kgc',
      libraries: ['places']
    }),
    ApolloModule,
    HttpLinkModule,
    NgxWigModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    NxModule.forRoot(),
    DfLoggingModule,
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
      CommitmentLookupEffects,
      MapPointEffects,
      CommitmentContactEffects,
      ContactEffects,
      RelatedCommitmentEffects,
      CommentDiscussionEffects,
      CommitmentEffects,
      CommitmentSubscriptionEffects,
      CommitmentActionEffects
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
    appDataServiceProvider,
    commitmentContactsDataServiceProvider,
    commitmentActionsDataServiceProvider,
    discussionDataServiceProvider,
    lookupDataServiceProvider,
    subscriptionDataServiceProvider,
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

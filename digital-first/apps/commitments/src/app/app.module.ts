import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
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
import { CommitmentEditComponent } from './containers/commitment-edit/commitment-edit.component'
import { CommitmentListComponent } from './components/commitment-list/commitment-list.component'
import { CommitmentOverviewComponent } from './containers/commitment-overview/commitment-overview.component'

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
import * as fromAnnouncementType from './reducers/announcement-type/announcement-type.reducer'
import * as fromWhoAnnouncedType from './reducers/who-announced-type/who-announced-type.reducer'
import * as fromCommitment from './reducers/commitment/commitment.reducer'
import * as fromPortfolio from './reducers/portfolio/portfolio.reducer'
import * as fromParty from './reducers/party/party.reducer'
import * as fromComment from './reducers/comment/comment.reducer'
import * as fromContact from './reducers/contact/contact.reducer'
import * as fromLocation from './reducers/location/location.reducer'
import * as fromCommitmentType from './reducers/commitment-type/commitment-type.reducer'
import { AppEffects } from './reducers/app.effects'
import { RouterEffects } from './reducers/router.effects'
import { CommitmentEffects } from './reducers/commitment'
import { AnnouncementTypeEffects } from './reducers/announcement-type/announcement-type.effects'
import { CommentEffects } from './reducers/comment/comment.effects'
import { CommitmentTypeEffects } from './reducers/commitment-type/commitment-type.effects'
import { ContactEffects } from './reducers/contact/contact.effects'
import { LocationEffects } from './reducers/location/location.effects'
import { PartyEffects } from './reducers/party/party.effects'
import { PortfolioEffects } from './reducers/portfolio/portfolio.effects'
import { CommitmentCreateComponent } from './containers/commitment-create/commitment-create.component'
import { WhoAnnouncedTypeEffects } from './reducers/who-announced-type/who-announced-type.effects'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  CommitmentCardComponent,
  CommitmentEditFormComponent,
  CommitmentEditComponent,
  CommitmentOverviewComponent,
  CommitmentListComponent,
  CommitmentCreateComponent
]

const ENTRYCOMPONENTS = [
  DialogAreYouSureComponent,
  DialogShowErrorComponent,
  DialogFileLockedComponent,
  DialogSpinnerOverlayComponent,
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
    NxModule.forRoot(),
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
    StoreModule.forFeature('whoAnnouncedType', fromWhoAnnouncedType.reducer),
    StoreModule.forFeature('announcementType', fromAnnouncementType.reducer),
    StoreModule.forFeature('commitment', fromCommitment.reducer),
    StoreModule.forFeature('portfolio', fromPortfolio.reducer),
    StoreModule.forFeature('party', fromParty.reducer),
    StoreModule.forFeature('comment', fromComment.reducer),
    StoreModule.forFeature('contact', fromContact.reducer),
    StoreModule.forFeature('location', fromLocation.reducer),
    StoreModule.forFeature('commitmentType', fromCommitmentType.reducer),

    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([
      RouterEffects,
      WhoAnnouncedTypeEffects,
      AnnouncementTypeEffects,
      CommentEffects,
      CommitmentEffects,
      CommitmentTypeEffects,
      ContactEffects,
      LocationEffects,
      PartyEffects,
      PortfolioEffects
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

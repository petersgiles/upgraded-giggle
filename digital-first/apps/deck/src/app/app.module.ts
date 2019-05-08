import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'
import { DeckModule, DialogAreYouSureComponent } from '@df/components'
import { WINDOW_PROVIDERS } from '@df/utils'
import {
  DfLayoutsModule,
  TitleLayoutService
} from '@digital-first/df-layouts'
import { DfThemeModule } from '@digital-first/df-theme'
import { DfPipesModule } from '@digital-first/df-pipes'
import { DfLoggingModule } from '@digital-first/df-logging'
import { DfComponentsModule } from '@digital-first/df-components'
import { DfMomentModule } from '@digital-first/df-moment'
import { DfDiscussionModule } from '@digital-first/df-discussion'
import { DfPagesModule } from '@digital-first/df-pages'
import { DfDialogsModule } from '@digital-first/df-dialogs'
import { DfSharepointLibModule } from '@df/sharepoint'

import { HomeComponent } from './pages/home/home.component'
import { AppFullLayoutService } from './app-full-layout.service'
import { AppRoutingModule } from './app-routing.module'
import { DeckDataService } from './services/deck-data.service'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { DfDatatableModule } from '@digital-first/df-datatable'
import { DfButtonsModule } from '@digital-first/df-buttons'
import { DfMapModule } from '@digital-first/df-map'
import { initApplication } from './app-init'
import { StoreModule } from '@ngrx/store'
import * as fromDeck from './reducers/deck/deck.reducer'
import * as fromUser from './reducers/user/user.reducer'
import { EffectsModule } from '@ngrx/effects'
import { DeckEffects } from './reducers/deck/deck.effects'
import { metaReducers, reducers, CustomSerializer } from './reducers'
import { environment } from '../environments/environment'
import { AppEffects } from './reducers/app.effects'
import { RouterStateSerializer } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  DialogAreYouSureComponent
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
    DeckModule,
    DfLoggingModule,
    DfComponentsModule,
    DfDatatableModule,
    DfButtonsModule,
    DfMapModule,
    DfMomentModule,
    DfLayoutsModule,
    DfThemeModule,
    DfDiscussionModule,
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
    StoreModule.forFeature('deck', fromDeck.reducer),
    StoreModule.forFeature('user', fromUser.reducer),

    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([
      DeckEffects
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
    DeckDataService,
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

import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'
import { DeckModule } from '@df/components'
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
import { GraphQLModule } from './graphql.module'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { DfDatatableModule } from '@digital-first/df-datatable'
import { DfButtonsModule } from '@digital-first/df-buttons'
import { DfMapModule } from '@digital-first/df-map'
import { initApplication } from './app-init'
import { DialogEditDeckItemComponent } from './dialogs/dialog-edit-deck-item.component'

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  DialogEditDeckItemComponent
]

const ENTRYCOMPONENTS = [DialogEditDeckItemComponent]

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    GraphQLModule,
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
    DragDropModule
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
    { provide: TitleLayoutService, useClass: AppFullLayoutService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
